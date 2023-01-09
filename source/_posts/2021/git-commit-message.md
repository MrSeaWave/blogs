---
title: Git提交信息规范
author: Sea
toc: true
date: 2021-03-31 14:42:43
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/Ba67IE_min-yum-cloud-tree.jpg
tags: [Git, Lint]
categories: [技术]
---

Git 每次提交代码，都要写 Commit message（提交说明）

<!--more-->

```
$ git commit -m "hello world"
```

上面代码的-m 参数，就是用来指定 `commit mesage` 的。

如果一行不够，可以只执行`git commit`，就会跳出文本编辑器，让你写多行.

```
$ git commit
```

## Commit message 的格式

每次提交，Commit message 都包括三个部分：Header，Body 和 Footer。

```
<Header>

<Body>

<Footer>
```

其中，Header 是必需的，Body 和 Footer 可以省略。

### Header

Header 部分只有一行，包括三个字段：type（必需）、scope（可选）、subject（必需）。

```
<type>: <subject>
```

#### type

type 用于说明 commit 的类别，只允许使用下面 7 个标识。

- feat：新功能（feature）
- fix：修补 bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

#### subject

subject 是 commit 目的的简短描述，不超过 50 个字符。

- 以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes
- 第一个字母小写
- 结尾不加句号（.）

### Body

Body 部分是对本次 commit 的详细描述，可以分成多行。下面是一个范例。

```
More detailed explanatory text, if necessary.  Wrap it to
about 72 characters or so.

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
```

有两个注意点。

- 使用第一人称现在时，比如使用 change 而不是 changed 或 changes。
- 应该说明代码变动的动机，以及与以前行为的对比。

### Footer

Footer 部分只用于两种情况：

- 关联 Issue
- 关闭 Issue

#### 关联 Issue

本次提交如果和摸个 issue 有关系则需要写上这个，格式如下：

```
Issue #1, #2, #3
```

#### 关闭 Issue

如果当前提交信息解决了某个 issue，那么可以在 Footer 部分关闭这个 issue，关闭的格式如下：

```
Close #1, #2, #3
```

### Revert

还有一种特殊情况，如果当前 commit 用于撤销以前的 commit，则必须以`revert:`开头，后面跟着被撤销 Commit 的 Header。

```

revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

Body 部分的格式是固定的，必须写成 `This reverts commit &lt;hash>.`，其中的`hash`是被撤销 commit 的 SHA 标识符。

如果当前 commit 与被撤销的 commit，在同一个发布（release）里面，那么它们都不会出现在 Change log 里面。如果两者在不同的发布，那么当前 commit，会出现在 Change log 的`Reverts`小标题下面。

## 例子

```
feat: 添加了分享功能

给每篇博文添加了分享功能

- 添加分享到微博功能
- 添加分享到微信功能
- 添加分享到朋友圈功能

Issue #1, #2
Close #1
```

## 使用软件进行 commit 规范化

- `JS`: [commit-demo](https://github.com/MrSeaWave/commit-standard-demo)

## 参考文档

- [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
- [我的提交信息规范](https://yanhaijing.com/git/2016/02/17/my-commit-message/)
