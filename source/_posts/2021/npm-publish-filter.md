---
title: npm publish 过滤部分文件
author: Sea
toc: true
date: 2021-12-10 14:13:38
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/aCqWjl_camille-sule-bg-loulou-frames-00.jpg
tags: [NPM, Publish]
categories: [技术]
---

**npm publish** 的时候会把项目目录里面所有的文件都`publish`到`npm`仓库中， 但是往往有一部分目录和文件不想发布上去，比如项目的源码、编译脚本等等信息。

<!--more-->

## 如何发布用户需要使用的相关文件呢？

### 方法一：使用 **.gitignore** 设置忽略哪些文件

**.gitignore** 设置的忽略文件，在 git 代码管理和 **npm publish** 都会被忽略

### 方法二：使用 **.npmignore** 设置忽略哪些文件

**.npmignore** 的写法跟 **.gitignore** 的规则完全一样。若同时使用了 **.npmignore** 和 **.gitignore**，只有 **.npmignore** 会生效，优先级比较高。

### 方法三：使用 **package.json** 的 **files** 字段选择发布哪些文件

直接在 **package.json** 中 **files** 字段设置发布哪些文件或目录。这个优先级高于 **.npmignore** 和 **.gitignore**。

> **PS：选择哪种方法，根据自己的需求而定。一般情况，使用方法三。**

另：**npm publish** 默认的忽略规则

默认被忽略：

> - `.*.swp`
> - `._*`
> - `.DS_Store`
> - `.git`
> - `.gitignore`
> - `.hg`
> - `.npmignore`
> - `.npmrc`
> - `.lock-wscript`
> - `.svn`
> - `.wafpickle-*`
> - `config.gypi`
> - `CVS`
> - `npm-debug.log`

默认被包含，即便设置忽略也无效

> - `package.json`
> - `README` (and its variants)
> - `CHANGELOG` (and its variants)
> - `LICENSE` / `LICENCE`

## 参考链接

- [npm](https://docs.npmjs.com/cli/v8/using-npm/developers#keeping-files-out-of-your-package)
