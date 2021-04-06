---
title: 终端如何挂代理
author: Sea
toc: true
date: 2021-04-02 21:48:21
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/ENW7rf_liang-mark-rebort2222.jpg
tags: [proxy, terminal, vpn]
categories: [vpn]
---

本文将介绍终端是如何挂代理的。

<!--more-->

## 前提

首先你需要类似于`shadowsocksX-NG-R8`的代理软件，本文以`shadowsocksX-NG-R8`为例

![shadowsocksX-NG-R8](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/9rb9fj_image-20210402215036375.png)

## 正文

打开`shdowsocks`为代理模式。

以`zsh`作为说明

```bash .zshrc
$ vim ~/.zshrc
```

第一种：

添加如下代理配置:

```bash edit
# where need proxy
proxy () {
  export http_proxy="socks5://127.0.0.1:1086"
  export https_proxy="socks5://127.0.0.1:1086"
  echo "Socks Proxy on"
}

# where need noproxy
noproxy () {
  unset http_proxy
  unset https_proxy
  echo "Socks Proxy off"
}
```

第二种：

```bash edit
# proxy list
alias proxy='export all_proxy=socks5://127.0.0.1:1086'
alias noproxy='unset all_proxy'
```

> 注：两种方式皆可，`127.0.0.1:1086`取自`高级设置`![image-20210402220028581](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/UJcpYu_image-20210402220028581.png)

`:wq`保存退出

```bash .zshrc
$ source ~/.zshrc
```

验证是否`proxy`成功:

```
$ curl cip.cc
IP	: 101.81.77.200
地址	: 中国  上海
运营商	: 电信

数据二	: 上海市 | 电信

数据三	:

URL	: http://www.cip.cc/101.81.77.200
```

执行`proxy`:

```bash
$ proxy
```

```bash
$ curl cip.cc
IP	: 42.200.244.149
地址	: 中国  香港  pccw.com

数据二	: 香港 | 电讯盈科商用网络

数据三	: 中国香港 | 电讯盈科

URL	: http://www.cip.cc/42.200.244.149
```

如果`cip.cc`不能用，可以换个类似的站点查询

如果不需要走代理，执行：

```bash
$ noproxy
$ curl cip.cc
IP	: 101.81.77.200
```

## 参考链接

- [Mac OSX 终端走 shadowsocks 代理 #18 ](https://github.com/mrdulin/blog/issues/18)
