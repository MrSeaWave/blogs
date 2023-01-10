---
title: ssh-key
author: Sea
toc: true
date: 2021-10-26 09:34:11
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/SuHn36_roman-gaydakov-old-mech.jpg
tags: [SSH, Key, GitHub, GitLab]
categories: [技术]
---

本文将介绍的是如何在 mac 上上配置 SSH Key 中的 private key。

<!--more-->

## 在 Mac 上配置 SSH Key 中的 private key

当往`github`的项目上提交代码时，`github`需要知道你电脑上有没有和那些`Deploy keys`中某个`public key`配对的`private key`。接下来就是配置怎样找到这个`private key`

- 生成 1 个 SSH Key:

```
$ ssh-keygen -t rsa -C "youremail@xxx.com"
```

按回车后

```
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/localMac/.ssh/id_rsa): id_rsa_TestSSH_github(取个名字)
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in
id_rsa_TestSSH_github.
Your public key has been saved in
id_rsa_TestSSH_github.pub.
```

最好每次生成时都给`SSH Key`取个名字，这样后面在管理时自己也一目了然。我这里的格式是`id_rsa_项目名_git提供方`，我生成的所有`key`都遵循这个规则命名。建议你也有你自己的一种命名方式，并且保持统一。如果不取名字，默认的是`id_rsa`，如果后面生成时不命名，会把这个覆盖掉。密码可以不设置，免得每次提交时还要输入一次，安全性自己衡量吧。第一次生成`key`时，会在`~`目录下创建一个`.ssh`目录。

```
$ cd ~/.ssh
$ ls
```

- 把`id_rsa_TestSSH_github.pub`添加到`github`对应的项目的`Deploy keys`中。
  ![Git-Add-DeployKeys.png](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/HgP4JX_Git-Add-DeployKeys.png)

- `ssh`服务器默认是去找`id_rsa`，现在需要把这个`key`添加到`ssh-agent`中，这样`ssh`服务器才能认识`id_rsa_TestSSH_github`

```
$ ssh-add -K ~/.ssh/id_rsa_TestSSH_github
```

这里为什么加上了一个-K 参数呢？因为在 Mac 上，当系统重启后会“忘记”这个密钥，所以通过指定-K 把 SSH key 导入到密钥链中

查看添加结果：

```
$ ssh-add -l
```

- 创建本地的配置文件 ~/.ssh/config，编辑如下：

```
Host TestSSH.github.com
	HostName github.com
	User git
	PreferredAuthentications publickey
	IdentityFile ~/.ssh/id_rsa_TestSSH_github
Host YourProjectName.gitlab.com
	HostName gitlab.com
	User git
	PreferredAuthentications publickey
	IdentityFile ~/.ssh/id_rsa_YourProjectName_gitlab
```

Host 的名字可以随意取，我这边按照的规则是项目名.git 服务器来源，接下来会用到这个名字。测试是否配置正确：

```
$ ssh -T git@TestSSH.github.com (就是刚刚你给Host取的名字)
```

敲一下回车，如下出现下面的提示就连接成功了：

```
Hi MrSeaWave/TestSSH! You've successfully authenticated, but GitHub does not provide shell access.
```

一定要注意哦，帐号名称/项目名称，如果这个 key 没有连接成功，它有可能提示的是别的 key 的。

- 修改 github 项目配置，使项目本身能关联到使用的 key。

如果你在之前已经把项目 clone 到本地了，有两种解决方法：
(1) 打开项目目录`/.git/config`，将`[remote “origin”]`中的`url`中的`github.com`修改为`TestSSH.github.com`，就是你在第 4 步中给`Host`取的那个名字。如下：

```
remote "origin"]
	url = git@TestSSH.github.com:MrSeaWave/TestSSH.git
	fetch = +refs/heads/*:refs/remotes/origin/*
```

(2) 也可以在提交时修改

```
$ git remote rm origin
$ git remote add origin git@TestSSH.github.com:MrSeaWave/TestSSH.git
```

如果还没有 clone 到本地，则在 clone 时可以直接将`github.com`改为`TestSSH.github.com`，如下：

```
$ git clone git@TestSSH.github.com:MrSeaWave/TestSSH.git
```

Happy Coding😄
