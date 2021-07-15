---
title: apidoc教程
author: Sea
toc: true
date: 2021-07-15 15:06:23
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/OAgON3_michael-maurino-aegis-final.jpeg
tags: [api, doc]
categories: [api]
---

apiDoc - 超简单的文档生成器，本文将讲述如何使用它。

<!--more-->

市面上常用的 API 文档管理方式有 apiDoc、Swagger2、DocClear。

Swagger2 有一个比较明显的缺点：代码侵入，开启注解时会影响原本的系统性能。

同样 DocClear 也有一个比较明显的缺点：DocClear 本身只是一个接口信息管理平台，所有的接口信息需要开发人员在平台内进行录入。

apiDoc 作为 API 文档工具是一款通过源代码中的 API 注释创建文档，支持 Java、JS、PHP、Tython 等语言，没有 Swagger2 那样代码侵入，而是通过 apiDoc 的程序对我们的源代码文件进行扫描，获取文件内的 apiDoc 注释信息来创建 API 文档，进而生成静态的 API 文档页面。接下来就从头到尾给大家讲解一下 apiDoc 如何使用。

## 快速开始

1. 装环境

   ```bash
   npm install apidoc -g
   ```

2. 新建一个项目

   ![image-20210715151417124](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/dLftq8_image-20210715151417124.png)

   `src/file.js`，不用纠结这些注释含义, 后面会详解

   ```js
   // src/file.js

   /**
    * @api {Get} /user/get getUserInfo
    * @apiGroup User
    *
    * @apiParam {String} name 文章名
    * @apiParamExample {json} Request-Example
    * {
    *  "userName": "Eve"
    * }
    *
    * @apiSuccessExample  {json} Response-Example
    * {
    *   "userName": "Eve",
    *   "createTime": "1568901681"
    *   "updateTime": "1568901681"
    * }
    */
   function getUserInfo(username) {
     // 假如这个函数是根据用户名返回用户信息的
   }
   ```

   `apidoc.json`

   ```json
   {
     "name": "apidoc-demo",
     "description": "You write something here to describe your project",
     "title": "The title of this doc"
   }
   ```

3. 执行命令，`-i`是指注释文件存放的地方,` -o`是指文档输出的位置

   ```bash
   $ apidoc -i src/ -o apidoc/
   ```

接下来我们会发现多了一个文件夹`**apidoc**`. 这是自动生成的一个文件夹目录

![image-20210715151930178](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/DvdMAB_image-20210715151930178.png)

双击打开`index.html`

![image-20210715152307370](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/k5XhT0_image-20210715152307370.png)

如 s 上简单三步即可生成一份 API 文档, 算是挺傻瓜式的，接下来将介绍具体字段含义。

## 配置(apidoc.json)详解

每次导出接口文档都必须要让 apidoc 读取到 apidoc.json 文件(如果未添加配置文件，导出报错)，你可以在你项目的根目录下添加 apidoc.json 文件，这个文件主要包含一些项目的描述信息，比如标题、简短的描述、版本等，你也可以加入一些可选的配置项，比如页眉、页脚、模板等。

配置项：

| **参数**        | **描述**                                                                                                                         |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| name            | 工程名称如果 apidoc.json 文件中没有配置该参数，apidoc 会尝试从 pakcage.json 文件中读取                                           |
| version         | 版本如果 apidoc.json 文件中没有配置该参数，apidoc 会尝试从 pakcage.json 文件中读取                                               |
| description     | 工程描述如果 apidoc.json 文件中没有配置该参数，apidoc 会尝试从 pakcage.json 文件中读取                                           |
| title           | 浏览器标题                                                                                                                       |
| url             | api 路径前缀例如:https://api.github.com/v1                                                                                       |
| sampleUrl       | 如果设置了该参数，那么在文档中便可以看到用于测试接口的一个表单(详情可以查看参数@apiSampleReques)                                 |
| header.title    | 页眉导航标题                                                                                                                     |
| header.filename | 页眉文件名(markdown) (如：`header.md`)                                                                                           |
| footer.title    | 页脚导航标题                                                                                                                     |
| footer.filename | 页脚文件名(markdown) (如：`footer.md`)                                                                                           |
| order           | 接口名称或接口组名称的排序列表如果未定义，那么所有名称会自动排序`"order": [ "Error", "Define", "PostTitleAndError", PostError"]` |

[更多详情](https://apidocjs.com/)

## apidoc 注释参数

### @api

【必填字段】否则，apidoc 会忽略该条注释

```api
@api {method} path [title]
```

参数列表:

| 参数   | 必填 | 描述                                       |
| :----- | :--- | :----------------------------------------- |
| method | yes  | 请求类型:`DELETE, GET, POST, PUT, ...更多` |
| path   | yes  | 请求路径                                   |
| title  | no   | 接口标题                                   |

例：

```js
/**
 * @api {get} /user/getUserById/:id 获取用户数据 - 根据id
 */
```

### @apiDefine

定义注释模块(类似于代码中定义一个常量)，对于一些通用可复用的注释模块(例如:接口错误响应模块)，只需要在源代码中定义一次，便可以在其他注释模块中随便引用，最后在文档导出时会自动替换所引用的注释模块，定义之后您可以通过`@apiUse`来引入所定义的注释模块。(注:可以同时使用`@apiVersion`来定义注释模块的版本)

```api
@apiDefine name [title]
                     [description]
```

参数列表:

| 参数        | 必填 | 描述                                                           |
| :---------- | :--- | :------------------------------------------------------------- |
| name        | yes  | 注释模块名称(唯一)，不同@apiVersion 可以定义相同名称的注释模块 |
| title       | no   | 注释模块标题                                                   |
| description | no   | 注释模块详细描述(详细描述另起一行，可包含多行)                 |

```js
/**
 * @apiDefine MyError
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 */

/**
 * @api {get} /user/:id
 * @apiUse MyError
 */
```

```js
/**
 * @apiDefine admin User access only
 * This optional description belong to to the group admin.
 */

/**
 * @api {get} /user/:id
 * @apiPermission admin
 */
```

### @apiDeprecated

标注一个接口已经被弃用

```api
@apiDeprecated [text]
```

参数列表:

| 参数 | 必填 | 描述         |
| :--- | :--- | :----------- |
| text | yes  | 多行文字描述 |

```js
/**
 * @apiDeprecated
 */

/**
 * @apiDeprecated use now (#Group:Name).
 *
 * Example: to set a link to the GetDetails method of your group User
 * write (#User:GetDetails)
 */
```

### @apiDescription

api 接口的详细描述

```api
@apiDescription [text]
```

参数列表:

| 参数 | 必填 | 描述         |
| :--- | :--- | :----------- |
| text | yes  | 多行文字描述 |

```js
/**
 * @apiDescription This is the Description.
 * It is multiline capable.
 *
 * Last line of Description.
 */
```

### @apiError

错误返回参数

```api
@apiError [(group)] [{type}] field [description]
```

参数列表:

| 参数        | 必填 | 描述                                                                                            |
| :---------- | :--- | :---------------------------------------------------------------------------------------------- |
| (group)     | no   | 所有的参数都会通过这个参数进行分组，如果未设置，默认值为 Error 4xx                              |
| {type}      | no   | 返回类型，例如`{Boolean}`， `{Number}`， `{String}`， `{Object}`，`{String[]}`（字符串数组），… |
| field       | yes  | 返回 id                                                                                         |
| description | no   | 参数描述                                                                                        |

```js
/**
 * @api {get} /user/getUserById/:id 获取用户数据 - 根据id
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 */

/**
 * @apiError (错误分组) {Object} xxx xxxxxxxx
 */
```

### @apiErrorExample

接口错误返回示例(格式化输出)

```api
@apiErrorExample [{type}] [title]
                 example
```

参数列表:

| 参数    | 必填 | 描述               |
| :------ | :--- | :----------------- |
| type    | no   | 响应类型           |
| title   | yes  | 示例标题           |
| example | yes  | 示例详情(兼容多行) |

```js
/**
 *@api {get} /user/getUserById/:id 获取用户数据 - 根据id
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
```

### @apiExample

接口方式请求示例

```
@apiExample [{type}] title
            example
```

参数列表:

| 参数    | 必填 | 描述               |
| :------ | :--- | :----------------- |
| type    | no   | 请求内容格式       |
| title   | yes  | 示例标题           |
| example | yes  | 示例详情(兼容多行) |

```js
/**
 * @api {get} /user/getUserById/:id
 * @apiExample {curl} Example usage:
 *     curl -i http://127.0.0.1/user/getUserById/1
 */
```

### @apiGroup

定义接口所属的接口组，虽然接口定义里不需要这个参数，但是您应该在每个接口注释里都添加这个参数，因为导出的接口文档会以接口组的形式导航展示。

```
@apiGroup name
```

参数列表:

| 参数 | 必填 | 描述                            |
| :--- | :--- | :------------------------------ |
| name | yes  | 接口组名称(用于导航,不支持中文) |

```js
/**
 * @api {get} /user/:id
 * @apiGroup User
 */
```

### @apiHeader

描述接口请求头部需要的参数(功能类似`@apiParam`)

```api
@apiHeader [(group)] [{type}] [field=defaultValue] [description]
```

参数列表:

| 参数          | 必填 | 描述                                                               |
| :------------ | :--- | :----------------------------------------------------------------- |
| (group)       | no   | 所有的参数都会以该参数值进行分组(默认 Parameter)                   |
| {type}        | no   | 返回类型(例如:{Boolean}, {Number}, {String}, {Object}, {String[]}) |
| field         | yes  | 参数名称(定义该头部参数为必填)                                     |
| [field]       | yes  | 参数名称(定义该头部参数为可选)                                     |
| =defaultValue | no   | 参数默认值                                                         |
| description   | no   | 参数描述                                                           |

```js
/**
 * @api {get} /user/:id
 * @apiHeader {String} access-key Users unique access-key.
 */
```

### @apiHeaderExample

请求头部参数示例

```
@apiHeaderExample [{type}] [title]
                   example
```

参数列表:

| 参数    | 必填 | 描述                   |
| :------ | :--- | :--------------------- |
| type    | no   | 请求内容格式           |
| title   | no   | 请求示例标题           |
| example | yes  | 请求示例详情(兼容多行) |

```js
/**
 * @api {get} /user/getUserById/:id
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Accept-Encoding": "Accept-Encoding: gzip, deflate"
 *     }
 */
```

### @apiIgnore

如果你需要使用该参数，请把它放到注释块的最前面。如果设置了该参数，那么该注释模块将不会被解析(当有些接口还未完成或未投入使用时，可以使用该字段)

```api
@apiIgnore [hint]
```

参数列表:

| 参数 | 必填 | 描述               |
| :--- | :--- | :----------------- |
| hint | no   | 描接口忽略原因描述 |

```js
/**
 * @apiIgnore Not finished Method
 * @api {get} /user/:id
 */
```

### @apiName

接口名称，每一个接口注释里都应该添加该字段，在导出的接口文档里会已该字段值作为导航子标题，如果两个接口的`@apiVersion`和`@apiName`一样，那么有一个接口的注释将会被覆盖(接口文档里不会展示)

```
@apiName name
```

参数列表:

| 参数 | 必填 | 描述                                             |
| :--- | :--- | :----------------------------------------------- |
| name | yes  | 接口名称(相同接口版本下所有接口名称应该是唯一的) |

```js
/**
 * @api {get} /user/:id
 * @apiName GetUser
 */
```

### @apiParam

接口请求体参数

```
@apiParam [(group)] [{type}] [field=defaultValue] [description]
```

参数列表:

| 参数                 | 必填 | 描述                                                                                                                                                                                                                                     |
| :------------------- | :--- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (group)              | no   | 所有的参数都会以该参数值进行分组(默认 Parameter)                                                                                                                                                                                         |
| {type}               | no   | 返回类型(例如:{Boolean}, {Number}, {String}, {Object}, {String[]})                                                                                                                                                                       |
| {type{size}}         | no   | 返回类型,同时定义参数的范围{string{…5}}意为字符串长度不超过 5{string{2…5}}意为字符串长度介于 25 之间 `{number{100-999}}`意为数值介于 100999 之间                                                                                         |
| {type=allowedValues} | no   | 参数可选值{string=“small”}意为字符串仅允许值为"small"{string=“small”,“huge”}意为字符串允许值为"small"、“huge”{number=1,2,3,99}意为数值允许值为 1、2、3、99{string {…5}=“small”,"huge"意为字符串最大长度为 5 并且值允许为:“small”、“huge” |
| field                | yes  | 参数名称(定义该请求体参数为必填)                                                                                                                                                                                                         |
| [field]              | yes  | 参数名称(定义该请求体参数为可选)                                                                                                                                                                                                         |
| =defaultValue        | no   | 参数默认值                                                                                                                                                                                                                               |
| description          | no   | 参数描述                                                                                                                                                                                                                                 |

```js
/**
 * @api {get} /user/:id
 * @apiParam {Number} id Users unique ID.
 */

/**
 * @api {post} /user/
 * @apiParam {String} [firstname]       Optional Firstname of the User.
 * @apiParam {String} lastname          Mandatory Lastname.
 * @apiParam {String} country="DE"      Mandatory with default value "DE".
 * @apiParam {Number} [age=18]          Optional Age with default 18.
 *
 * @apiParam (Login) {String} pass      Only logged in users can post this.
 *                                      In generated documentation a separate
 *                                      "Login" Block will be generated.
 *
 * @apiParam {Object} [address]         Optional nested address object.
 * @apiParam {String} [address[street]] Optional street and number.
 * @apiParam {String} [address[zip]]    Optional zip code.
 * @apiParam {String} [address[city]]   Optional city.
 * @apiParam {Object} [data]   					data
 * @apiParam {Object} [data.a]   				data.a
 */
```

### @apiParamExample

请求体参数示例

```api
@apiParamExample [{type}] [title]
                   example
```

参数列表:

| 参数    | 必填 | 描述                   |
| :------ | :--- | :--------------------- |
| type    | no   | 请求内容格式           |
| title   | no   | 请求示例标题           |
| example | yes  | 请求示例详情(兼容多行) |

```js
/**
 * @api {get} /user/:id
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id": 4711
 *     }
 */
```

### @apiPermission

允许访问该接口的角色名称

```api
@apiPermission name
```

参数列表:

| 参数 | 必填 | 描述                     |
| :--- | :--- | :----------------------- |
| name | yes  | 允许访问的角色名称(唯一) |

```js
/**
 * @api {get} /user/:id
 * @apiPermission admin
 */
```

### @apiPrivate

定义私有接口，对于定义为私有的接口，可以在生成接口文档的时候，通过在命令行中设置参数 `--private false|true`来决定导出的文档中是否包含私有接口

```api
@apiPrivate
```

```js
/**
 * @api {get} /user/:id
 * @apiPrivate
 */
```

### @apiSampleRequest

设置了该参数后，导出的 html 接口文档中会包含模拟接口请求的 form 表单；如果在配置文件`apidoc.json`中设置了参数`sampleUrl`，那么导出的文档中每一个接口都会包含模拟接口请求的 form 表单，如果既设置了`sampleUrl`参数，同时不希望当前这个接口包含模拟接口请求的 form 表单，可以使用`@apiSampleRequest off`来关闭。

```api
@apiSampleRequest url
```

参数列表:

| 参数 | 必填 | 描述                                                                                                                                              |
| :--- | :--- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| url  | yes  | 模拟接口请求的 url`@apiSampleRequest http://www.example.com`意为覆盖`apidoc.json`中的`sampleUrl`参数，`@apiSampleRequest off`意为关闭接口测试功能 |

例：
发送测试请求到:**http://api.github.com/user/:id**

```js
Configuration parameter sampleUrl: "http://api.github.com"
/**
 * @api {get} /user/:id
 */
```

请求发送到**http://test.github.com/some_path/user/:id。**
它将覆盖 sampleUrl。

```js
Configuration parameter sampleUrl: "http://api.github.com"
/**
 * @api {get} /user/:id
 * @apiSampleRequest http://test.github.com/some_path/
 */
```

请求发送到**http://api.github.com/test/user/:id。**
它扩展了 sampleUrl。

```js
Configuration parameter sampleUrl: "http://api.github.com"
/**
 * @api {get} /user/:id
 * @apiSampleRequest /test
 */
```

禁用此 api 方法的 api 请求。

```js
Configuration parameter sampleUrl: "http://api.github.com"
/**
 * @api {get} /user/:id
 * @apiSampleRequest off
 */
```

请求发送到**http://api.github.com/some_path/user/:id**，因为未设置 sampleUrl，所以仅激活此方法的请求。

```js
Configuration parameter sampleUrl is not set
/**
 * @api {get} /user/:id
 * @apiSampleRequest http://api.github.com/some_path/
 */
```

### @apiSuccess

接口成功返回参数

```api
@apiSuccess [(group)] [{type}] field [description]
```

参数列表:

| 参数          | 必填 | 描述                                                               |
| :------------ | :--- | :----------------------------------------------------------------- |
| (group)       | no   | 所有的参数都会以该参数值进行分组,默认值:Success 200                |
| {type}        | no   | 返回类型(例如:{Boolean}, {Number}, {String}, {Object}, {String[]}) |
| field         | yes  | 返回值(返回成功码)                                                 |
| =defaultValue | no   | 参数默认值                                                         |
| description   | no   | 参数描述                                                           |

```js
/**
 * @api {get} /user/:id
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
```

包含(group):

```js
/**
 * @api {get} /user/:id
 * @apiSuccess (200) {String} firstname Firstname of the User.
 * @apiSuccess (200) {String} lastname  Lastname of the User.
 */
```

返回参数中有对象:

```js
/**
 * @api {get} /user/:id
 * @apiSuccess {Boolean} active        Specify if the account is active.
 * @apiSuccess {Object}  profile       User profile information.
 * @apiSuccess {Number}  profile.age   Users age.
 * @apiSuccess {String}  profile.image Avatar-Image.
 */
```

返回参数中有数组：

```js
/**
 * @api {get} /users
 * @apiSuccess {Object[]} profiles       List of user profiles.
 * @apiSuccess {Number}   profiles.age   Users age.
 * @apiSuccess {String}   profiles.image Avatar-Image.
 */
```

### @apiSuccessExample

返回成功示例

```api
@apiSuccessExample [{type}] [title]
                   example
```

参数列表:

| 参数    | 必填 | 描述                   |
| :------ | :--- | :--------------------- |
| type    | no   | 返回内容格式           |
| title   | no   | 返回示例标题           |
| example | yes  | 返回示例详情(兼容多行) |

```js
/**
 * @api {get} /user/:id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 */
```

### @apiUse

引入注释模块，如果当前模块定义了@apiVersion,那么版本相同或版本最近的注释模块会被引入

```api
@apiUse name
```

参数列表:

| 参数 | 必填 | 描述               |
| :--- | :--- | :----------------- |
| name | yes  | 引入注释模块的名称 |

```js
/**
 * @apiDefine MySuccess
 * @apiSuccess {string} firstname The users firstname.
 * @apiSuccess {number} age The users age.
 */

/**
 * @api {get} /user/:id
 * @apiUse MySuccess
 */
```

### @apiVersion

定义接口/注释模块版本

```
@apiVersion version
```

参数列表:

| 参数    | 必填 | 描述                                              |
| :------ | :--- | :------------------------------------------------ |
| version | yes  | 版本号(支持[semver](https://semver.org/)版本规范) |

```js
/**
 * @api {get} /user/:id
 * @apiVersion 1.6.2
 */
```

> Tips:
>
> 把接口中的通用部分利用`@apiDefine`摘出来，放在一个公共文件``define.js`中，之后可以利用`@apiUse`去调用。
>
> 历史 api 可以存放在`history.js`中

## 生成 API 文档

当然你注释参数写好了之后它也不会帮你自动生成，你需要自己运行以下命令：

```bash
$ apidoc -i [项目完整路径] -o apidoc/
```

参数列表:

| 参数                    | 描述                                                                                                                                                                                           |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-c, --config`          | 指定使用的配置文件. (默认根目录的 apidoc.json apidoc.json ) 例： `apidoc -c path/to/apidoc.json`                                                                                               |
| `-e, --exclude-filters` | 输出文件时排除文件。 (默认: []) 例: `apidoc -e node_modules`                                                                                                                                   |
| `-f, --file-filters`    | RegEx-Filter，选择要解析的文件（可以使用许多`-f`）。默认`.cs` `.dart` `.erl` `.go` `.java` `.js` `.php` `.py` `.rb` `.ts`. 示例（仅解析.js 和.ts 文件）： `apidoc -f ".*\\.js$" -f ".*\\.ts$"` |
| `-i, --input`           | 输入/源目录名。项目文件的位置。例：`apidoc -i myapp/`                                                                                                                                          |
| `-o, --output`          | 输出目录名。放置生成的文档的位置，例：`apidoc -o apidoc/`                                                                                                                                      |
| `-t, --template`        | 使用模板输出文件。您可以创建和使用自己的模板。例：`apidoc -t mytemplate/`                                                                                                                      |
| `-h, --help`            | 查看帮助文档                                                                                                                                                                                   |

## 参考链接

- [apidoc](https://github.com/apidoc/apidoc)
- [apiDoc - 超简单的文档生成器](https://zhuanlan.zhihu.com/p/83487114)
- [apiDoc 教程](https://blog.csdn.net/qq_32352777/article/details/102746237)
