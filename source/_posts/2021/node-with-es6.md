---
title: 在nodejs中使用ES6
author: Sea
toc: true
date: 2021-08-29 14:37:03
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/DUut73_adrian-bush-21-06-16.jpg
tags: [babel, es6, js, node]
categories: [babel]
---

本文将介绍如何在 nodejs 中使用 ES6 的功能。

<!--more-->

在学习 JavaScript 语言，你会发现它有两种格式的模块。

一种是 ES6 模块，简称 ESM；另一种是 Node.js 专用的 CommonJS 模块，简称 CJS。这两种模块不兼容。

> Node.js 是服务器端开发的 Javascript 标准平台。Node.js 模块处理的默认标准是[CommonJS。](https://stackoverflow.com/questions/40294870/module-exports-vs-export-default-in-node-js-and-es6)，使用[module.exports （导出） 和 require （导入）](https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/)。对于 ES6 环境中的 Node.js，我们需要一个编译器将 ES6 转换为[CommonJS](https://medium.com/@cgcrutch18/commonjs-what-why-and-how-64ed9f31aa46)

![bg2020082004](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/0bB8EF_bg2020082004.jpeg)

## 两种模块的差异

ES6 模块和 CommonJS 模块有很大的差异。

语法上面，CommonJS 模块使用`require()`加载和`module.exports`输出，ES6 模块使用`import`和`export`。

用法上面，`require()`是同步加载，后面的代码必须等待这个命令执行完，才会执行。`import`命令则是异步加载，或者更准确地说，ES6 模块有一个独立的静态解析阶段，依赖关系的分析是在那个阶段完成的，最底层的模块第一个执行。

## Node.js 的区分

Node.js 要求 ES6 模块采用`.mjs`后缀文件名。也就是说，只要脚本文件里面使用`import`或者`export`命令，那么就必须采用`.mjs`后缀名。Node.js 遇到`.mjs`文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定`"use strict"`。

如果不希望将后缀名改成`.mjs`，可以在项目的`package.json`文件中，指定`type`字段为`module`。

```json
{
  "type": "module"
}
```

一旦设置了以后，该目录里面的 JS 脚本，就被解释用 ES6 模块。

```shell
# 解释成 ES6 模块
$ node my-app.js
```

如果这时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成`.cjs`。如果没有`type`字段，或者`type`字段为`commonjs`，则`.js`脚本会被解释成 CommonJS 模块。

总结为一句话：`.mjs`文件总是以 ES6 模块加载，`.cjs`文件总是以 CommonJS 模块加载，`.js`文件的加载取决于`package.json`里面`type`字段的设置。

> 注意，ES6 模块与 CommonJS 模块尽量不要混用。`require`命令不能加载`.mjs`文件，会报错，只有`import`命令才可以加载`.mjs`文件。反过来，`.mjs`文件里面也不能使用`require`命令，必须使用`import`。

## CommonJS 模块加载 ES6 模块

CommonJS 的`require()`命令不能加载 ES6 模块，会报错，只能使用`import()`这个方法加载。

```javascript
(async () => {
  await import('./es6-pkg.mjs');
})();
```

上面代码可以在 CommonJS 模块中运行。

`require()`不支持 ES6 模块的一个原因是，它是同步加载，而 ES6 模块内部可以使用顶层`await`命令，导致无法被同步加载。

## ES6 模块加载 CommonJS 模块

ES6 模块的`import`命令可以加载 CommonJS 模块，但是只能整体加载，不能只加载单一的输出项。

```js
// 正确
import packageMain from 'commonjs-package';

// 报错
import { method } from 'commonjs-package';
```

这是因为 ES6 模块需要支持静态代码分析，而 CommonJS 模块的输出接口是`module.exports`，是一个对象，无法被静态分析，所以只能整体加载。

加载单一的输出项，可以写成下面这样。

```js
import packageMain from 'commonjs-package';
const { method } = packageMain;
```

## FAQ

当你的项目在配置 `package.json` 的 `type`为 `model` 后，且使用了 babel 可能会报错：

```
Error while loading config - You appear to be using a native ECMAScript module configuration file, which is only supported when running Babel asynchronously
```

这是因为可能你的 babel 配置为 Javascript 文件扩展名 (`babel.config.js`)。

> 注： babel js 文件扩展支持`.js`，`.mjs`，`.cjs`
>
> - `babel.config.js` and `.babelrc.js` behave like the `.mjs` equivalents when your `package.json` file contains the [`"type": "module"`](https://nodejs.org/api/esm.html#esm_code_package_json_code_code_type_code_field) option, otherwise they are exactly the same as the `.cjs` files.

因此对于你当前的项目。正确的文件扩展名是 `.cjs`

```javascript
// babel.config.cjs
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```

## 参考链接

- [Enabling ES6 Features (Import and Export Default) In Node.js with Babel](https://thankgodukachukwu.medium.com/using-es6-features-import-and-export-default-in-node-js-and-babel-b5ba102bd9c9)

- [Node.js 如何处理 ES6 模块](https://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html)

- [babel-config](https://babeljs.io/docs/en/config-files)
