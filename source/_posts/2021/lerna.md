---
title: lerna
author: Sea
toc: true
date: 2021-06-07 14:42:42
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/ujISC8_felicia-chen-hellmtn1.jpg
tags: [lerna, monorepo]
categories: [lerna]
---

# lerna-demo

Lerna 是一个工具，它优化了使用 git 和 npm 管理多包存储库的工作流。

本文通过一个示例讲述了如何基于 Lerna 管理多个 package，并和其它工具整合，打造高效、完美的工作流，最终形成一个最佳实践。

<!--more-->

## 工作的两种模式

- **`fixed`是默认模式，在这模式下所有包都使用`lerna.json`里的`version`字段值。**

- **`independent`模式是每个包使用独立的版本号**

### Fixed/Locked mode (default)

`vue,babel` 都是用这种，在 publish 的时候,会在 `lerna.json` 文件里面`"version": "0.1.0"`依据这个号，进行增加，只选择一次，其他有改动的包自动更新版本号。

### Independent mode

`lerna init --independent` 初始化项目。

`lerna.json` 文件里面`"version": "independent"`,

每次 publish 时，您都将得到一个提示符，提示每个已更改的包，以指定是补丁、次要更改、主要更改还是自定义更改。

![图片](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/Ny4pMd_F9bXF4.png)

## 项目构建

### init

```bash
$ mkdir lerna-demo && cd $_
$ npx lerna init
```

生成以下文件

```bash
lerna-demo/
  packages/
  package.json
  lerna.json
```

### 增加 packages

创新一些新的 pkg

```bash
$ cd packages
$ mkdir pkg-a pkg-b pkg-c

$ cd pkg-a
$ npm init --y
$ cd pkg-b
$ npm init --y


或者使用
$ lerna create pkg-d --y

```

项目结构如下

```bash
$ tree
.
├── README.md
├── lerna.json
├── package.json
└── packages
    ├── pkg-a
    │   └── package.json
    ├── pkg-b
    │   └── package.json
    ├── pkg-c
    │   └── package.json
    └── pkg-d
        ├── README.md
        ├── __tests__
        │   └── pkg-d.test.js
        ├── lib
        │   └── pkg-d.js
        └── package.json

7 directories, 10 files
```

## 依赖管理

> `yarn`是`lerna`的最佳搭档。

`lerna`默认使用`npm`作为安装依赖包工具，但也可以选择其他工具。把 npm 替换成 yarn 只需在 lerna 的配置文件添加两行代码即可，配置完以后立刻顺畅百倍。

```json
// lerna.json
{
  "packages": ["packages/*"], // 配置package目录
  "version": "independent",
  "npmClient": "yarn",
  "useWorkspaces": true // 使用yarn workspaces
}
```

配置 package.json 使用`yarn workspaces`

```json
{
  "name": "root",
  "private": true, // root禁止发布
  "devDependencies": {
    "lerna": "^4.0.0"
  },
  "workspaces": [
    // 配置package目录
    "packages/*"
  ]
}
```

### 安装依赖

只要在项目主目录下执行

```bash
$ yarn install
```

yarn 会自动读取 workspace 配置，就能自动安装、处理、软链接各个子包的依赖，统一放在根目录下。也可以使用 lerna 的安装命令

```bash
$ lerna bootstrap
```

但可能不如 yarn 的包管理机制好用，可以看这篇文章[《Lerna 的依赖管理及 hoisting 浅析》](https://yrq110.me/post/tool/how-lerna-manage-package-dependencies/)

### 增删依赖

```bash
$ lerna add chalk                 # 为所有 package 增加 chalk 模块
$ lerna add semver --scope pkg-a  # 为 pkg-a  增加 semver 模块
$ lerna add pkg-a  --scope pkg-b  # 增加内部模块之间的依赖
```

or

```bash
$ yarn workspaces run add chalk # 为所有 package 增加 chalk 模块
$ yarn workspace pkg-a add semver # 为 pkg-a  增加 semver 模块
$ yarn workspace pkg-b add pkg-a@1.0.0 # 这里必须加上版本号，否则报错,将pkg-a作为pkg-b的依赖
```

更多请查看[`lerna add`](https://github.com/lerna/lerna/tree/main/commands/add#readme)

对应的 yarn 的更多命令：

主项目添加依赖

```bash
$ yarn add [packageName] -W -D
```

> -W 是指定在项目根目录执行命令

删除公共依赖

```bash
$ yarn remove -W -D [packageName]
```

给所有子项目增删依赖

```bash
$ yarn workspaces run add [packageName]
$ yarn workspaces run remove [packageName]
```

给某个项目增删依赖

```bash
$ yarn workspace [packageNameA] add [packageNameB] // packageNameA是指定安装依赖的包名，packageNameB是公共的包名或者项目内的包名
```

```bash
$ yarn workspace [packageName] remove [packageName]
```

当项目依赖凌乱的时候，可以使用命令清理依赖

```bash
$ lerna clean
```

其余还有一些命令如下，更多命令参考[lerna](https://github.com/lerna/lerna#readme)

```
lerna ls // 列出仓库中包信息
lerna changed // 查看项目变动
lerna exec // 执行命令
```

```bash
lerna run < script > -- [..args] # 运行所有包里面的有这个script的命令
$ lerna run --scope my-component test
```

```bash
yarn workspaces info // 查看项目内信息
```

## 构建

使用`lerna run`命令构建项目

```bash
$ lerna run build // 会执行子包中build命令构建
```

## 发布

```bash
$ lerna publish              # 发布自上一个版本以来发生了变化的包
$ lerna publish from-git     # 发布当前提交中标记的包
$ lerna publish from-package # 发布注册表中没有最新版本的包
```

在运行时，该命令做了下面几件事中的一个：

- 发布自上一个版本以来更新的包(背后调用了 lerna version)。
  - 这是 lerna 2.x 版本遗留下来的。
- 发布在当前提交中标记的包(from-git)。
- 发布在最新提交时注册表中没有版本的包(from-package)。
- 发布在前一次提交中更新的包(及其依赖项)的“金丝雀(canary)”版。

> 注意
> Lerna 永远不会发布标记为 private 的包（package.json 中的”private“: true）

在所有的发布过程中，都有[生命周期](https://github.com/lerna/lerna/tree/main/commands/publish#lifecycle-scripts)在根目录和每个包中运行(除非使用了`--ignore-scripts`)。

请查看[每个包的配置](https://github.com/lerna/lerna/tree/main/commands/publish#per-package-configuration)以了解发布作用域限定的包、自定义注册表和自定义标记的详细信息。

### 不支持只发布某个 package

lerna 官方不支持仅发布某个 package，见 [issues/1691](https://github.com/lerna/lerna/issues/1691)，如果需要，只能自己手动的进入 package 进行发布，这样 lerna 自带的各种功能就需要手动完成且可能和 lerna 的功能相互冲突

由于 lerna 会自动的监测 git 提交记录里是否包含指定 package 的文件修改记录，来确定版本更新，这要求设置好合理的 ignore 规则（否则会造成频繁的，无意义的某个版本更新），好处是其可以自动的帮助 package 之间更新版本

例如如果`pkg-b` 依赖了 `pkg-a`，如果 `pkg-a` 发生了版本变动，会自动的将 `pkg-b` 的对 `pkg-a` 版本依赖更新为 `pkg-a` 的最新版本。 如果 `pkg-b` 发生了版本变动，对 `pkg-a` 并不会造成影响。

### 版本迭代

lerna 通过 version 命令来为各个模块进行版本迭代。基本命令如下：

```bash
$ lerna version [major | minor | patch | premajor | preminor | prepatch | prerelease]
```

如果不选择此次迭代类型，则会进入交互式的提示流程来确定此次迭代类型

例如：

```bash
$ lerna version 1.0.1 # 按照指定版本进行迭代
$ lerna version patch # 根据 semver 迭代版本号最后一位
$ lerna version       # 进入交互流程选择迭代类型
```

#### 自动生成 CHANGELOG

当您使用这个参数运行时，`lerna version`将使用[传统的提交规范](https://www.conventionalcommits.org/en/)来[确定版本](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-recommended-bump)并生成 [CHANGELOG.md 文件](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)

```bash
$ lerna version --conventional-commits
```

**自动确立了版本更新**

> 经测试 version_bump 是依赖于文件检测和 subject 结合，并不依赖于 scope，scope 的作用是用来生成 changelog 的吧，即如果是修改了 pkg-b 的文件，但是 commit 记录写的是 fix(pkg-a)，lerna 是会生成 pkg-b 的版本更新，并不会去更新 pkg-a 的版本

#### 手动选择发布版本

如果 git commit message 发现不太靠谱，且无法修改的话，那么需要手动的确认新版本，version 默认是手动选择版本

```bash
$ lerna version
```

> version 成功后会自动的推送到主分支

> lerna version 自动生成的提交格式为“ publish xxx",并不符合 conventional-commit 规范，因此需要加以修改，我们通过 message 参数可以修改自动生成的提交记录

```json
// lerna.json
{
  "packages": ["packages/*"],
  "version": "independent",
  "npmClient": "yarn",
  "useWorkspaces": true,
  "command": {
    "publish": {
      "message": "chore: publish"
    }
  }
}
```

之后可以用`lerna publish`发布新包

```shell
$ lerna publish from-git // 显式发布在当前提交中标记的包
```

## 例子

项目例子可参考[eg](https://github.com/MrSeaWave/lerna-demo)

## 参考链接

- [lerna](https://github.com/lerna/lerna#readme)
- [lerna 中文](http://www.febeacon.com/lerna-docs-zh-cn/routes/commands/publish.html)
- [基于 Lerna 管理 packages 的 Monorepo 项目最佳实践](https://segmentfault.com/a/1190000020047120)
- [基于 lerna 和 yarn workspace 的 monorepo 工作流](https://zhuanlan.zhihu.com/p/71385053)
- [Lerna 中文教程详解](https://segmentfault.com/a/1190000019350611)
- [大前端项目代码重用，也许 lerna 是最好的选择](https://segmentfault.com/a/1190000023160081)
- [使用 Lerna、Yarn 管理 Monorepo 项目](https://segmentfault.com/a/1190000039795228)
