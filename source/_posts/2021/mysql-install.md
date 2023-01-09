---
title: 如何在MAC上安装Mysql
author: Sea
toc: true
date: 2021-12-31 09:43:49
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/yp69M9_labs.mysql.com_common_logos_mysql-logo.svg_v2.png
tags: [MySQL, Install]
categories:
  - [技术]
  - [Tools]
---

本文将介绍如何在 Mac 上安装 Mysql。

<!--more-->

## 官网安装包下载

所有平台的 MySQL 下载地址为： [MySQL 下载](https://dev.mysql.com/downloads/mysql/) 。 挑选你需要的 _MySQL Community Server_ 版本及对应的平台。

因为我本地是`X86_64`，（通过`$ uname -m`查看）所以这里选择了：

![image-20211231094847694](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/jCgZxF_image-20211231094847694.png)

### **查找以前的版本并下载**

这一步并不算难，秉持着完整记录的想法还是记一下，不需要的可以绕过。

![image-20211231095218913](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/JhJBto_image-20211231095218913.png)

![image-20211231095248920](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/UDMnYQ_image-20211231095248920.png)

### 安装

1. 根据安装包的指示一步步下载就可以了，如果下载 8 以上的版本在这一步的时候注意选择第二项，下载 5 的话记得保存一下系统给的默认密码（下载过程会弹出提示框）

![image-20211231095455375](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/ZempB9_image-20211231095455375.png)

2. 安装成功后，可在系统偏好设置中看到 MySQL，（8 版本是一头小海豚，5 的是一个圆齿轮）

![image-20211231095617308](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/Ir2JMh_image-20211231095617308.png)

3. 打开如下：

![image-20211231095859718](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/ab7wk1_image-20211231095859718.png)

### 环境变量配置

安装成功后，使用 mysql 命令会报：command not found 的错误，是因为还没有配置环境变量。

配置环境变量首先要知道你使用的 Mac OS X 是什么样的 Shell，打开终端，输入：`echo $SHELL`

![shell](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/kYfMeC_shell.jpg)

我这里用的是`zsh`，所以直接在`~/.zshrc`里增加环境变量，在最下方增加

```
# mysql Path
export PATH=${PATH}:/usr/local/mysql/bin
# 快速启动、结束MySQL服务, 可以使用alias命令，可以不加
alias mysqlstart='sudo /usr/local/mysql/support-files/mysql.server start'
alias mysqlstop='sudo /usr/local/mysql/support-files/mysql.server stop'
```

最后保存退出，并在终端输入：`source ~/.zshrc` 回车执行，运行环境变量

![save](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/yh4ye3_save.jpg)

最后在终端输入`mysql -u root -p`启动 MySQL，（安装地址是`/usr/local/mysql`）

![run-mysql](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/e5aE8W_run-mysql.jpg)

## 使用 homebrew 安装 MySQL

可以参考 [homebrew 安装 MySQL](https://juejin.cn/post/6844903831298375693#heading-1)，这里不再阐述。

## 卸载

可以参考 [Mac 下干净彻底地卸载 MySQL](https://www.jianshu.com/p/276c1271ae14)，这里不再阐述。

## 参考链接

- [MySQLZ](https://www.mysql.com/cn/)

- [MySQL 安装](https://www.runoob.com/mysql/mysql-install.html)
- [MySQL 安装（Mac 版）](https://juejin.cn/post/6844903831298375693)
- [小白入门：MySQL 超详细安装教程（mac 版）](https://zhuanlan.zhihu.com/p/129366085)
