---
title: Npm Script
author: Sea
toc: true
date: 2022-01-27 13:38:31
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/XqC8pr_marcin-jakubowski-hellriderhd.jpg
tags: [NPM, Script]
categories: [技术]
---

本文将介绍如何使用 npm 脚本（npm scripts）。

<!--more-->

## 介绍

NPM 脚本是 package.json 中定义的一组内置脚本和自定义脚本。他们的目标是提供一种简单的方法来执行重复的任务，比如：

- 启动项目
- 打包项目
- 执行单元测试，生成测试报告之类
- ……

那如何定义一个 NPM 脚本？需要做的就是设置它的名称，并在 package.json 文件的 script 属性中编写该脚本, 如下：

```json
{
  // ...
  "scripts": {
    "build": "node build.js"
  }
}
```

上面代码是`package.json`文件的一个片段，里面的`scripts`字段是一个对象。它的每一个属性，对应一段脚本。比如，`build`命令对应的脚本是`node build.js`。

命令行下使用`npm run`命令，就可以执行这段脚本。

```bash
$ npm run build
# 等同于执行
$ node build.js
```

这些定义在`package.json`里面的脚本，就称为 npm 脚本。它的优点有很多。

查看当前项目的所有 npm 脚本命令，可以使用不带任何参数的`npm run`命令。

```bash
$ npm run
```

## 原理

npm 脚本的原理非常简单。每当执行`npm run`，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

比较特别的是，`npm run`新建的这个 Shell，会将当前目录的`node_modules/.bin`子目录加入`PATH`变量，执行结束后，再将`PATH`变量恢复原样。

这意味着，**当前目录的`node_modules/.bin`子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径**。

比如：

```json
{
  "scripts": {
    "lint": "./node_modules/.bin/eslint --ext .js"
  }
}
// 此写法与上面效果相同
{
  "scripts": {
    "lint": "eslint  --ext .js"
  }
}
```

由于 npm 脚本的唯一要求就是可以在 Shell 执行，因此它不一定是 Node 脚本，任何可执行文件都可以写在里面。

npm 脚本的退出码，也遵守 Shell 脚本规则。如果退出码不是`0`，npm 就认为这个脚本执行失败。

## 传参

向 npm 脚本传入参数，要使用`--`标明。

例如向上面的`npm run lint`命令传入参数`--cache`，必须写成下面这样。

```
$ npm run lint -- --cache
```

运行如下：

```bash
$ npm run lint -- --cache

> @ lint /Users/sea/workspace/personal/tem/np-pub-test
> eslint  --ext .js "--cache"

```

## 执行顺序

如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。

- 如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用`&&`符号。

```bash
$ npm run lint && npm run build
```

- 如果是并行执行（即同时的平行执行），可以使用`&`符号。

```bash
$ npm run lint & npm run build
```

这两个符号是 Bash 的功能。此外，还可以使用 node 的任务管理模块：[script-runner](https://github.com/paulpflug/script-runner)、[npm-run-all](https://github.com/mysticatea/npm-run-all)、[redrun](https://github.com/coderaiser/redrun)。

## 钩子 pre & post

npm 脚本有`pre`和`post`两个钩子，我们可以为任何脚本创建 `pre` 和 `post` 钩子，NPM 会自动按顺序运行它们。唯一的要求是脚本的名称(后跟`pre`或`post`前缀)与主脚本匹配。例如：

> 需要注意：双重的`pre`和`post`无效，比如`prepretest`和`postposttest`是无效的。

```json
{
  "scripts": {
    "prehello": "echo \" ---------- Run Pre Hello World ---------- \"",
    "hello": "echo \" ---------- Run Hello World ---------- \"",
    "posthello": "echo \" ---------- Run Post Hello World ---------- \""
  }
}
```

如果我们执行 npm run hello，npm 会按以下顺序执行脚本: prehello, hello, posthello。输出如下：

```bash
$ npm run hello

> np-pub-test@1.0.5 prehello /Users/sea/workspace/personal/tem/np-pub-test
> echo " ---------- Run Pre Hello World ---------- "

 ---------- Run Pre Hello World ----------

> np-pub-test@1.0.5 hello /Users/sea/workspace/personal/tem/np-pub-test
> echo " ---------- Run Hello World ---------- "

 ---------- Run Hello World ----------

> np-pub-test@1.0.5 posthello /Users/sea/workspace/personal/tem/np-pub-test
> echo " ---------- Run Post Hello World ---------- "

 ---------- Run Post Hello World ----------
```

npm 默认提供下面这些钩子。

> - prepublish，postpublish
> - preinstall，postinstall
> - preuninstall，postuninstall
> - preversion，postversion
> - pretest，posttest
> - prestop，poststop
> - prestart，poststart
> - prerestart，postrestart

> 注意，从npm@1.1.71开始 `prepublish`这个钩子不仅会在`npm publish`命令之前运行，还会在`npm install`（不带任何参数）命令之前运行，这种行为很容易让用户感到困惑，所以 npm 4 引入了一个新的钩子`prepare`，行为等同于`prepublish`，来替代上述功能，另外一种新钩子`prepublishOnly`作为替代策略，让用户避免以往 npm 版本的混乱行为，`prepublishOnly` 只在`npm publish`前执行，而从 npm 5 开始，`prepublish`将只在`npm publish`命令之前运行，即取代`prepublishOnly`，所以 npm6 即以后的版本会放弃`prepublishOnly`。
>
> - `prepare`: 在两种情况前运行，一是`npm publish`命令前，二是不带参数的`npm install`命令；它会在`prepublish`之后、`prepublishOnly`之前执行
> - `prepublishOnly`: 在`npm publish`命令前执行
>
> 漫长的历史争论：https://github.com/npm/npm/issues/10074

npm 提供一个`npm_lifecycle_event`变量，返回当前正在运行的脚本名称，比如`pretest`、`test`、`posttest`等等。所以，可以利用这个变量，在同一个脚本文件里面，为不同的`npm scripts`命令编写代码。请看下面的例子。

```json
{
  "scripts": {
    "pretest": "node index.js",
    "test": "node index.js",
    "posttest": "node index.js"
  }
}
```

```js
const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'test') {
  console.log(`Running the test task!`);
}

if (TARGET === 'pretest') {
  console.log(`Running the pretest task!`);
}

if (TARGET === 'posttest') {
  console.log(`Running the posttest task!`);
}
```

运行如下：

```bash
$ npm run test

> np-pub-test@1.0.5 pretest /Users/sea/workspace/personal/tem/np-pub-test
> node index.js

Running the pretest task!

> np-pub-test@1.0.5 test /Users/sea/workspace/personal/tem/np-pub-test
> node index.js

Running the test task!

> np-pub-test@1.0.5 posttest /Users/sea/workspace/personal/tem/np-pub-test
> node index.js

Running the posttest task!
```

## 简写形式

四个常用的 npm 脚本有简写形式。

> - `npm start`是`npm run start`
> - `npm stop`是`npm run stop`的简写
> - `npm test`是`npm run test`的简写
> - `npm restart`是`npm run stop && npm run restart && npm run start`的简写

`npm start`、`npm stop`和`npm restart`都比较好理解，而`npm restart`是一个复合命令，实际上会执行三个脚本命令：`stop`、`restart`、`start`。具体的执行顺序如下。

> 1. prerestart
> 2. prestop
> 3. stop
> 4. poststop
> 5. restart
> 6. prestart
> 7. start
> 8. poststart
> 9. postrestart

## 变量

在执行 NPM 脚本时，NPM 提供了一组我们可以使用的环境变量。 我们可以使用

```
npm_config_<val> 或者 npm_package_<val>
```

- 通过`npm_config_`前缀，拿到 npm 的配置变量，即`npm config get xxx`命令返回的值
- 通过`npm_package_`前缀，npm 脚本可以拿到`package.json`里面的字段。
- `env`命令可以列出所有环境变量

例如：

```json
{
  "name": "xxx",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "files": ["index.js"],
  "scripts": {
    "test": "node index.js"
  }
}
```

```js
// index.js
console.log(process.env.npm_package_name); // xxx
console.log(process.env.npm_package_version); // 0.0.1
console.log(process.env.npm_config_node_version); // 14.18.1
console.log(process.env); // env {....}，列出所有环境变量
```

上面代码中，我们通过环境变量`process.env`对象，拿到`package.json`的字段值。如果是 Bash 脚本，可以用`$npm_package_name`和`$npm_package_version`取到这两个值。

`npm_package_`前缀也支持嵌套的`package.json`字段。

```json
{
  "name": "xxx",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "files": ["index.js"],
  "scripts": {
    "test": "node index.js",
    "echo:test": "echo name: $npm_package_name && echo np version: $npm_package_devDependencies_np"
  },
  "devDependencies": {
    "np": "^7.6.0"
  }
}
```

运行如下：

```bash
$ npm run echo:test

> xxx@0.0.1 echo:test /Users/sea/workspace/personal/tem/np-pub-test
> echo name: $npm_package_name && echo np version: $npm_package_devDependencies_np

name: xxx
np version: ^7.6.0
```

最后，`env`命令可以列出所有环境变量。

```json
{
  "scripts": {
    "env": "env"
  }
}
```

## 命名规则

### 前缀

有些开源项目我们可以看到，他的 script 脚本是带有前缀的， 这也是一个好的命名规则， 通过`:dev`，` :prod` 来区分环境， 如下：

```json
{
  "scripts": {
    "build:dev": "...", // 开发环境
    "build:prod": "..." // 生产环境
  }
}
```

更多详情请查看官网 [npm scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts)

## 参考链接

- [scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts)
- [你要知道的 Npm Script 都在这里](https://juejin.cn/post/6962857149856907300)
- [npm scripts 使用指南](https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
- [npm scripts 官方文档（译）](https://segmentfault.com/a/1190000008832423)
