---
title: Charles 手机抓包设置
author: Sea
toc: true
date: 2021-09-01 14:48:43
cover: ziyi-shen-0901-5.jpg
tags: [Charles]
categories: [Tools]
---

本文主要讲述的是如何使用 Charles 对手机进行抓包。

<!--more-->

> **如果是使用 Charles 抓包。一定要保证手机和电脑连的是一个网。**

手机抓包设置，需要进行 3 步；

第一步，在 Charles 里设置允许手机联网的权限；你需要把 Charles 设置为允许的状态并且设置允许的端口号，这样手机端才能正常的接入；

第二步，把手机按照 Charles 的 IP 和端口进行配置；

第三步，手机配对成功后，Charles 还会弹窗是否允许；（Charles 虽然开放了端口，但并不知道是那一台手机会配入，此窗口起到提示和安全防护的作用；）

经过上面的三步，Charles 就可以对手机进行抓包了。

## 第一步：设置 Charles 为允许状态，并设置好接入端口

![image-20210901152240968](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/pbKLKH_image-20210901152240968.png)

![image-20210901152452899](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/Ah3eHt_image-20210901152452899.png)

## 第二步：手机通过设置 http 代理服务器，连接到电脑

把手机按照 Charles 的 IP 和端口进行配置，当手机连接 wifi 时，wifi 的 HTTP 代理选择手动那项（安卓类似）

![image-20210901154115603](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/2H3EUS_image-20210901154115603.png)

![image-20210901154215077](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/5j6MHG_image-20210901154215077.png)

## 第三步，手机配对成功后，Charles 弹窗询问是否允许

设置好之后，我们打开 iPhone 上的任意需要网络通讯的程序，就可以看到 Charles 弹出 iPhone 请求连接的确认菜单

![image-20210901153158438](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/ZjWclB_image-20210901153158438.png)

如上图的弹窗，点击允许即可；此时已经配对成功，开始愉快的抓包了。

## charles 连接不上手机的处理方式

1、检查电脑和手机有没有连接的同一个 wifi，必须连接的是一个网

2、更换 charles 和移动端设备的端口，默认是 8888，可以改成其他的试试

3、有可能路由器设置的 ap 间不能相互访问，需要登录路由器，需要登录路由器。进行求改。

4、关闭电脑的防火墙。试试 首先，如果，防火墙关了还是不行，那么请把手机 wifi 断掉后重新连接，这样一般就可以解决问题了。 如果以上方法还是不行的话，那么请将手机 wifi 位置的 ip 地址设置成静态 ip，然后重启 charles 工具。

5、在 charles 上添加手机的 ip 试试

![image-20210901155101084](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/5bp4tB_image-20210901155101084.png)

## 参考链接

- [Charles 手机抓包设置](https://www.axihe.com/tools/charles/ask/proxy-phone.html)
