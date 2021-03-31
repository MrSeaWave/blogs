---
title: 工程化配置 git commit 规范
author: Sea
toc: true
date: 2021-03-31 14:59:41
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/ChQ1JY_rudy-siswanto-starnheim-unleashed-artstation.jpg
tags: [git, commit, cli, lint]
categories: [git, commit]
---

如果你团队的 `git commit` 信息紊乱，太过糟糕，觉得有必要统一规范 `commit`格式，又或者你是一个强迫症患者，有必要让 `commit` 信息整整齐齐的展示。那么，你可以往下瞅瞅。

<!--more-->

> 本文使用的插件版本
>
> ```json pkg
> {
>   "@commitlint/cli": "^12.0.1",
>   "@commitlint/config-conventional": "^12.0.1",
>   "husky": "4.3.8",
>   "standard-version": "^9.1.1"
> }
> ```

## git commit 规范格式

现在比较大众化的 commit 格式无非有两种：

```bash git
$ <commit-type>[(commit-scope)]: <commit-message>
$ <commit-icon>: <commit-message>
```

- `<commit-type>` 常见为：

  - chore：构建配置相关。
  - docs：文档相关。
  - feat：添加新功能。
  - fix：修复 bug。
  - pref：性能相关。
  - refactor：代码重构，一般如果不是其他类型的 commit，都可以归为重构。
  - revert：分支回溯。
  - style：样式相关。
  - test：测试相关。

- `[(commit-scope)]` 可选，表示范围，例如：`refactor(cli)`，表示关于 cli 部分的代码重构。

- `<commit-message>` 提交记录的信息，有些规范可能会要求首字母大写。

- `<commit-icon>` 用图标来替代 `<commit-type>` 所表示的功能。

具体规范信息格式在[这里](https://mrseawave.github.io/blogs/articles/git-commit-message/)查看（这里不做过多阐述）

## 用于 commit 规范的工具

- [commitizen](https://github.com/commitizen/cz-cli)
- [commitlint](https://github.com/conventional-changelog/commitlint)
- [gitmoji](https://github.com/carloscuesta/gitmoji-cli)

本文主要讲述第二种(`commitlint`)使用方法，如想使用更多请查看[demo](https://github.com/MrSeaWave/commit-standard-demo)

## commitlint 使用

```bash yarn
$ yarn add @commitlint/config-conventional @commitlint/cli --D
```

在专门的 `commitlint` 配置文件 `commitlint.config.js` 中配置如下：

```js  commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

类似于 `eslint`，`commitlint` 还支持类似于 `.commitlintrc.js`、`.commitlintrc.json`、`.commitlintrc.yml` 名称的配置文件，又或者在 `package.json` 中添加 `commitlint` 字段。

然后安装 [husky](https://github.com/typicode/husky)，这是为了添加 git hooks，使得 `git commit` 也能够符合 commit 规范。

```bash yarn
$ yarn add husky --dev
```

在 `package.json` 中配置 `husky` 钩子：

(`v1.0.1`版本以后为`HUSKY_GIT_PARAMS`，`v0.14.3`为`GIT_PARAMS`)

```json package.json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS"
    }
  }
}
```

上面的操作如果都成功的话，那么你使用 `git commit` 命令时，就必须老老实实的使用符合 `commitlint` 规范的信息了

## standard-version 使用

```bash yarn
$ yarn add standard-version -D
```

[`standard-version`](https://www.npmjs.com/package/standard-version)是帮助项目自动生成`ChangeLog`、升版本、打`tag`的工具，它基于[semver](https://semver.org/)和[Conventional Commits](https://conventionalcommits.org/)规范。（PS：配合`git commit`规范化食用更加。

当执行`server-version`命令后，它会自动完成以下操作：

1. 取得当前版本（比如`package.json`里面的`version`字段），升版本：`1.0.0 => 1.1.0` 或者 `1.0.0 => 2.0.0`等（如何升级可以由参数控制）
2. 基于`commits`生成`ChangeLog`文件
3. 提交一个`commit`，包含`ChangeLog`和版本变更的文件
4. 打`tag`

以上功能都是可配置跳过的，对应：`bump`、`changelog`、`commit`、`tag`。比如在配置文件中按照如下配置，就可以跳过打`tag`操作：

```json
{
  "skip": {
    "tag": true
  }
}
```

为`standard-version`添加配置有两种方式：

![image-20210331153823802](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/PMmDM6_image-20210331153823802.png)

目前使用的配置文件如下，其它配置参考[官方文档](https://www.npmjs.com/package/standard-version)：

```js .versionrc.js
// https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.1.0/README.md
module.exports = {
  // 跳过一些操作 bump、changelog、commit、tag
  skip: {
    // 不跳过打tag操作
    tag: false,
  },
  //types为Conventional Commits标准中定义，目前支持
  //https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional
  types: [
    { type: 'feat', section: '新特性' },
    { type: 'fix', section: 'Bug修复' },
    { type: 'docs', section: '文档' },
    { type: 'chore', section: '配置项', hidden: true },
    { type: 'style', section: '格式', hidden: true },
    { type: 'refactor', section: '重构', hidden: true },
    { type: 'perf', section: '性能', hidden: true },
    { type: 'test', section: '测试', hidden: true },
    { type: 'build', section: '构建', hidden: true },
    { type: 'ci', section: 'CI', hidden: true },
    { type: 'revert', section: '回滚', hidden: true },
  ],
  //compare 链接 推荐自行修改为仓库地址 如
  compareUrlFormat: '{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}',
  //hash链接 推荐自行修改为仓库地址 如 https://github.com/MrSeaWave/commit-standard-demo/commit/{{hash}}
  commitUrlFormat: '{{host}}/{{owner}}/{{repository}}/commit/{{hash}}',
  //issue链接
  issueUrlFormat: '{{host}}/{{owner}}/{{repository}}/issues/{{id}}',
  //server-version自动commit的模板
  releaseCommitMessageFormat: 'build: v{{currentTag}}版本发布',
  //需要server-version更新版本号的文件
  bumpFiles: [
    {
      filename: 'MY_VERSION_TRACKER.txt',
      // The `plain-text` updater assumes the file contents represents the version.
      type: 'plain-text',
    },
    {
      filename: 'package.json',
      // The `json` updater assumes the version is available under a `version` key in the provided JSON document.
      type: 'json',
    },
  ],
};
```

package.json 配置:

```json package.json
"scripts": {
		...,
    "release": "standard-version",
    "release:major": "standard-version --release-as major",
    "release:minor": "standard-version --release-as minor",
    "release:patch": "standard-version --release-as patch",
    "release:prerelease": "standard-version --prerelease"
  }
```

PS: `standard-version` 有很多其他的特性，这里不过多涉及， 有兴趣的可以自行尝试。也可以查看此[demo](https://github.com/MrSeaWave/commit-standard-demo)

## 参考链接

- [Git 的学与记：工程化配置 commit 规范](https://juejin.cn/post/6844903710112350221)

- [代码风格自动化](https://www.yuque.com/yunplane/axviq0/fu5lp0?language=en-us)
