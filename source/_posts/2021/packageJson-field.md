---
title: package.json 各字段的作用
author: Sea
toc: true
date: 2021-12-08 10:28:52
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/sc87DK_johannes-voss-417093-carpet-of-flowers-web.jpg
tags: [package.json]
categories: [package.json]
---

package.json 文件可以使你的 npm 包对于其他人来说更容易管理和下载。发布 npm 包也是必须要有该文件的。

<!--more-->

### name

> npm 包的名字，必须是一个小写的单词，可以包含连字符`-`和下划线`_`。**发布时必填**。

### version

> npm 包的版本号，必须是`x.x.x`的形式，并且遵循语义化版本规则。**发布时必填**。

| 阶段     | 规则                           | 例子  |
| -------- | ------------------------------ | ----- |
| 首次发版 | 从 1.0.0 开始                  | 1.0.0 |
| 补丁发布 | 递增第三位数                   | 1.0.8 |
| 次要版本 | 递增第二位数，将第三位置位 0   | 1.2.0 |
| 主要版本 | 递增第一位数，将后俩位数置位 0 | 3.0.0 |

**注**：版本号不存在十进制说法，当代码一直处于同一阶段更新时，版本号可以一直增加、`1.0.35`、`1.12.5`都是可以的。

### description

> npm 包的简短描述，它会显示在 npm 官方搜索的列表中。

```
"description": "This is description"

```

### keywords

> npm 包的关键词，是一个字符串数组，可以帮助其他人在 npm 搜索列表中发现你的包。

```
"keywords": [
  "react",
  "component",
  "ui",
  "sea"
],

```

### homepage

> npm 包项目主页地址，可以是托管平台的地址。

```
"homepage": "https://github.com/MrSeaWave/blogs"

```

### bugs

> npm 包问题反馈的地址，可以是 github 的 issue 或者是邮箱地址。对于那些使用遇到问题的人很有帮助。

```
"bugs": {
  "url": "https://github.com/MrSeaWave/blogs/issues",
  "email": "MrDaemon@outlook.com"
}

```

### license

> 为 npm 包指定许可证，以便其他人知道他们被允许使用方式以及该 npm 包被施加的任何限制。

### author

> npm 包的作者，电子邮件和网站都是可以的，以下俩种方式都可以。

```
 "author": "Sea <MrDaemon@outlook.com> (https://github.com/MrSeaWave)"

"author": {
  "name" : "Sea",
  "email" : "MrDaemon@outlook.com",
  "url" : "https://github.com/MrSeaWave"
}

```

### files

> npm 包作为依赖安装时要包括的文件，格式是文件正则的数组，`["*"]`代表所有文件。也可以使用`npmignore` 来忽略个别文件。 `files`字段优先级最大，不会被`npmignore`和`.gitignore`覆盖。

以下文件总是被包含的，与配置无关

- package.json
- README.md
- CHANGES / CHANGELOG / HISTORY
- LICENCE / LICENSE

以下文件总是被忽略的，与配置无关

- .git
- .DS_Store
- node_modules
- .npmrc
- npm-debug.log
- package-lock.json
- [...](https://docs.npmjs.com/files/package.json.html#files)

### main

> 指定 npm 包的入口文件，例 `"main": "src/index.js"`当`require(name)`的时候实质是引入了改文件。

### bin

> 开发可执行文件时，bin 字段可以帮助你设置链接，不需要手动设置 PATH。

```
"bin" : {
  "myCli" : "./cli.js"
}

```

当像上面这样指定时，下载 npm 包，会自动链接`cli.js`到`use/local/bin/myCli`，可以直接在命令行执行`myCli`实质上执行的是 npm 包的`cli,js`文件，需要在可执行文件头部加上`#!/usr/bin/env node`，否则会在没有 node 的时候执行。当只有一个可执行文件且名字和包名一样，可以直接写成字符串形式。

```
"bin": "./cli.js"

```

### repository

> npm 包托管的地方，对于想贡献代码的人是有帮助的。

```
"repository": {
  "type": "git",
  "url": "https://github.com/MrSeaWave/blogs"
}

```

### scripts

> 可执行的命令。[具体文档](https://docs.npmjs.com/cli/v8/using-npm/scripts)

```
"scripts": {
  "dev": "cross-env NODE_ENV=development node server.js",
  "build": "cross-env NODE_ENV=production node server.js"
}

```

### dependencies

> npm 包所依赖的其他 npm 包，当使用`npm install` 下载该包时，`dependencies`中指定的包都会一并被下载。指定版本范围的规则如下：

- version 严格匹配
- \> version 必须大于该版本
- <= version 必须小于等于该版本
- ^version 兼容版本
- 1.2.x : 1.2.0, 1.2.1 等，不能是 1.3x
- [...](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)

```
"dependencies": {
  "react": "^17.0.2",
  "react-dom": "^17.0.2"
}

```

### devDependencies

> npm 包所依赖的构建和测试相关的 npm 包，放置到`devDependencies`，当使用`npm install` 下载该包时，`devDependencies`中指定的包不会一并被下载。

```
"devDependencies": {
  "eslint": "^8.1.0",
  "jest": "^24.8.0",
  "webpack": "^5.0.0"
}

```

### peerDependencies

> 指定 npm 包与主 npm 包的兼容性，当开发插件时是需要的，例如开发 React 组件时，其组件是依赖于`react`、`react-dom`npm 包的，可以在`peerDependencies`指定需要的版本。

```
"peerDependencies": {
  "react": ">=16.8.0",
  "react-dom": ">=16.8.0"
}

```

**注**：如果`peerDependencies`指定的 npm 包没有下载，npm 版本 1 和 2 会直接下载。 npm3 不会下载，会给出警告。

### engines

> 指定 npm 包可以使用的 Node 版本

```
"engines" : {
  "node" : ">=10.0.0"
}

```

### resolutions

yarn 中带的字段

> `resolutions` 字段统一所有依赖和依赖的依赖的版本，具体[查看](https://blog.csdn.net/qq_21567385/article/details/112644629)

```
{
	"resolutions":{ // ----救火队长
		"coa":"x.xx.x"
	}
}
```

### 参考

- [npm 官方文档-更全](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.npmjs.com%2Ffiles%2Fpackage.json.html)
- [掘金-package.json 各字段的作用](https://juejin.cn/post/6844903975825702926)
