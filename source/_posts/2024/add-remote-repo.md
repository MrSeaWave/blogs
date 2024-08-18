---
title: 如何为一个项目添加多个远程仓库
author: Sea
toc: true
date: 2024-08-18 16:51:30
cover: https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2024/1711175145828_hEVpjZ.jpg
tags: [Git]
categories: ['技术']
---

在我们的 git 项目中，操作远程仓库信息的命令为

<!-- more -->

```bash
$ git remote  # 查看当前所有的远程仓库的名称
$ git remote -v # 查看远程仓库的名称和远程仓库的网址
```

## Step 1

添加一个远程仓库

```bash
$ git remote set-url --add origin https://url
```

上面命令就是给远程仓库 `origin`  再新增一个远程仓库的地址

## Step 2

一次提交到所有远程仓库

```bash
$ git push --all
```

## 参考链接

- [git remote 操作——一个项目多个远程仓库\_迹忆客](https://www.jiyik.com/tm/xwzj/opersys_498.html)
- [git - Git 怎么添加多个远程仓库呢？ - SegmentFault 思否](https://segmentfault.com/q/1010000008366409)
