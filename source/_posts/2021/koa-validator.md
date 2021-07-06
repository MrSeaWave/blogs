---
title: koa后端数据校验
author: Sea
toc: true
date: 2021-07-06 13:30:24
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/YwmESN_bu-zhou-313131310.jpg
tags: [koa, validator, JSON-Schema]
categories: [koa, validator]
---

对每个接口的传入参数进行校验，是一个 Web 后端项目的必备功能，本文将介绍 koa 中如何使用[`joi`](https://github.com/sideway/joi)进行数据格式检验。

<!--more-->

## 安装 Joi

```bash
$ yarn add Joi
```

接下来将以对`register`的`user`进行后端数据校验为例

## 创建数据校验中间件

`middlewares/validator.js`

```js
/**
 * @desc 数据校验中间件
 * @param {function} validateFunc validators 里的校验器函数
 */
function validatorMiddleware(validateFunc) {
  return async function validator(ctx, next) {
    const { error } = validateFunc(ctx.request.body);
    if (error) {
      console.log('校验器【 %s 】，数据校验失败', validateFunc.name);
      console.error(error);
      // 使用joi时的自定义错误||joi提供的错误展示
      ctx.body = error.message || error.details[0].message;
      return;
    }
    await next();
  };
}

export default validatorMiddleware;
```

## 创建 User 校验规则，并校验

`src/validators/user.js`

```js
/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
export function userValidator(data) {
  const schema = Joi.object({
    userName: Joi.string()
      .min(2)
      .max(255)
      .pattern(/^[a-zA-Z][a-zA-Z0-9_]+$/)
      .required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .error(new Error('密码格式不对，请重新设定')),
    repeat_password: Joi.ref('password'),
  });
  return schema.validate(data);
}
```

## 注册接口使用数据校验中间件，传入 userValidator 校验 User

`src/routes/user.js`

```js
import Router from '@koa/router';
import validatorMiddleware from '../middlewares/validator';
import { handleUserRegister } from '../controllers/user';
import { userValidator } from '../validators/user';

const router = new Router({ prefix: '/user' });

router.post('/register', validatorMiddleware(userValidator), handleUserRegister);

export default router;
```

## 更多校验方法

- [ajv](https://github.com/ajv-validator/ajv)：基于**JSON Schema**的数据校验库

> **JSON Schema：** JSON Schema 并不是某个库，只是一种标准，简单的来说就是通过 json 格式来描述数据，而 ajv 就是对 JSON Schema 的具体实现之一.

- [class-validator](https://github.com/typestack/class-validator)：采用注解的方式进行校验，底层使用的是老牌的校验包[validator.js](https://github.com/chriso/validator.js)，配合`ts`语法进行使用。
- [routing-controllers](https://www.npmjs.com/package/routing-controllers#example-of-usage) ：使用`ts`构建的一个帮助很方便处理`router`的框架

## 参考链接

- [Koa+TypeScript 从 0 到 1 实现简易 CMS 框架（三）：用户模型、参数校验与用户注册接口](https://juejin.cn/post/6844904073485877262)
- [使用 class-validator 替换 Joi 包的方法](https://juejin.cn/post/6844903808259080206)
- [koa 后端数据校验-ajv](https://blog.csdn.net/qq_45453266/article/details/108794495)
- [项目重构记录](https://juejin.cn/post/6844903703724425223#heading-2)
