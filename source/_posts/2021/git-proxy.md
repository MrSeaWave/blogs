---
title: git仓库的代理
author: Sea
toc: true
date: 2021-04-02 22:07:37
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/FmwyKJ_cole-eastburn-forestkeyart-2048x1152.jpeg
tags: [git, github, proxy, vpn]
categories: [git]
---

因为种种原因，`github`访问很困难，仓库代码的提交比较受限，因此想到通过挂代理的方式让代码可以正常提交。

<!--more-->

首先第一步，肯定需要`shdowsocks`代理工具。

其次

全局设定：

```bash http
$ git config --global http.proxy http://127.0.0.1:1087
```

```bash https
$ $ git config --global https.proxy https://127.0.0.1:1087
```

or

只针对特定仓库设定：

```bash http
$ git config http.proxy http://127.0.0.1:1087
```

```bash https
$ git config https.proxy https://127.0.0.1:1087
```

> 注：`127.0.0.1:1087`是因为![image-20210402221751889](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/dmbbHo_image-20210402221751889.png)
