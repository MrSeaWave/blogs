---
title: 使用 np 快速发布 npm 包
author: Sea
toc: true
date: 2022-01-27 10:00:00
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/NTckRw_andrew-lim-aum-image-02-1200px-by-andrew-lim.jpg
tags: [np, publish, npm]
categories: [npm]
---

在之前的文章中 《{% post_link npm-publish 怎么发布 NPM 包 %}》中，已经介绍了如何使用 npm 进行发包，本文将会介绍一款发包工具 [np](https://www.npmjs.com/package/np) ，它是由 [sindresorhus](https://github.com/sindresorhus) 大神所创造的一套 npm published 工具，比 npm 原生的 `npm publish` 多了更多方便的功能！

<!--more-->

## 前言

你了解业内是如何发布 npm 包的吗？

参考一个流行的框架，比如 React。如果你仔细研究，你会注意到一些事情：

首先，React 有一个[Github](https://github.com/facebook/react)仓库；

其次，React 被发布在[NPM](https://www.npmjs.com/package/react)上；

第三，React 遵循 [Semantic versioning（语义化版本）](https://semver.org/)

第四，每一次的更新都有一个`git tag`关联它，这个`tag`也遵循语义化版本。

![image-20220127103245153](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/BmyH43_image-20220127103245153.png)

第五，[release notes](https://github.com/facebook/react/releases) 记录着 React 的每一次更新。

这意味着发布包涉及很多步骤。至少，你需要：

1. 运行测试用例（如果有的话）
2. 根据`Semantic versioning`修改`package.json`更新版本号
3. 根据`Semantic versioning`创建 git tag
4. 发布包到 Github
5. 发布包到 NPM
6. 为每次更新创建 release notes

当我们准备发布包的时候，忘记其中一件事是很常见的。

有一个更简单的方式帮我们完成以上步骤，利用工具 [`np`](https://www.npmjs.com/package/np)。

## np

np 一款 比 npm 原生的 `npm publish` 多了更多方便的功能的工具

![img](https://raw.githubusercontent.com/sindresorhus/np/HEAD/screenshot.gif)

优点：

- 互动界面
- 确保从 master branch 发布 package
- 确保工作工作目录是干净且沒有任何的修改
- 根据 dependency tree 重新安裝依赖确保目前的 project 是最新的
- 自动执行测试

更多请参考 [README](https://github.com/sindresorhus/np/blob/master/readme.md)。

### 安装

```bash
npm install np
```

or 全局安装 **np**，使我们可以在任何地方运行 `np`。

```bash
 npm install --global np
```

在使用 np 前，你需要确定：

1. 你的项目是一个 Git 仓库（repository）
2. 需要添加远端仓库（remote）的地址
3. 你必须至少已经`push`到 remote 一次
4. 你也需要确定你的工作目录是干净的

### 发布

`package.json`如下：

```json
{
  "name": "np-pub-test",
  "version": "1.0.2",
  "description": "",
  "main": "index.js",
  "files": ["index.js"],
  "scripts": {
    "test": "echo \" -------run test---------- \"",
    "release": "np --no-yarn --no-2fa"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/MrSeaWave/np-pub-test.git"
  },
  "author": "Sea <MrDaemon@outlook.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/MrSeaWave/np-pub-test/issues"
  },
  "homepage": "https://github.com/MrSeaWave/np-pub-test#readme",
  "devDependencies": {
    "np": "^7.6.0"
  }
}
```

运行`npm run release`进行发包

根据提示选择版本：

![image-20220127105310537](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/SLKLqA_image-20220127105310537.png)

之后，np 会帮你完成其余的发布工作。

![image-20220127110007432](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/UiOw6C_image-20220127110007432.png)

在流程的最后。np 会启动浏览器窗口，在这写你的 release notes。

![image-20220127110045092](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/28D65r_image-20220127110045092.png)

总之，np 使得 npm 发包过程变得非常简单！

## 问题

### 问题 1

通常我们做一个规范点的`组件包`，都会使用`commitizen`。当然还要结合`.commitlintrc`，来规范和约束我们的`commit message`。

那么问题来了：

- 怎么修改`np`的`commit message`

阅读官方文档后发现，增加`--message`即可

```json
{
  "scripts": {
    "test": "echo \" -------run test---------- \"",
    "release": "np --no-yarn --no-2fa --message \"chore(release): v%s \""
  }
}
```

![image-20220127111114605](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/9DLd29_image-20220127111114605.png)

### 问题 2

因为 np 发布要有干净的工作区。因此

- 如果我们有修改的文件没有提交。如下：

  ![image-20220127111651930](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/YZlV1r_image-20220127111651930.png)

- 或 如果我们有新建的文件未提交，如下：

  ![image-20220127111755048](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/p30dg4_image-20220127111755048.png)

然后我们去发布时，会发现发布失败

![image-20220127111901418](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/kDPkDz_image-20220127111901418.png)

这是因为 np 源码是依照下图判断工作区是否干净

![image-20220127111955073](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/jdOG2c_image-20220127111955073.png)

```bash
$ git status --porcelain
 M index.js
?? doc.md
```

如果改为这个可能会更好，但也未必。：

只监听想要提交到暂存区的数据

![image-20220127112542527](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/PFgjPF_image-20220127112542527.png)

```bash
$ git status --short | grep '^[MARCD]'
M  index.js
```

> 场景：修改 CHANGELOG.md 文件后，和 package.json 一起发布

### 问题 3

发包会默认选择用 yarn，可以在 package.json 中使用`publishConfig.registry`设定发布地址

如下：

```json
{
  "publishConfig": {
    "registry": "https://registry.npmjs.org/"
  }
}
```

也可以关闭 yarn (`--no-yarn`)，使用 npm

```json
{
  "scripts": {
    "test": "echo \" -------run test---------- \"",
    "release": "np --no-yarn --no-2fa --message \"chore(release): v%s \""
  }
}
```

后续待记录。。。

## 参考链接

- [np](https://www.npmjs.com/package/np)
- [怎么发布 NPM 包（业内的做法）](https://zhuanlan.zhihu.com/p/344951970)
- [透過 np 快速發佈你的 package 到 npm.js](https://jiepeng.me/2017/06/21/published-your-package-by-np)
- [你真的懂 npm publish？](https://juejin.cn/post/6844904037377114119)
