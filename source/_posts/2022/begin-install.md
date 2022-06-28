---
title: 从零安装必备软件
author: Sea
toc: true
date: 2022-06-28 14:27:32
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/EGMtcL_joon-ahn-skylines-20.jpeg
tags: [Mac, app]
categories: [Mac]
---

今日打算重新组装系统，因此需要从零开始安装在 Mac 上的必备的一些软件。

<!--more-->

## Iterm

从官网下载 [iterm2](https://iterm2.com/)

> 参考 [learn-the-command-line-iterm-and-zsh](https://xiaozhou.net/learn-the-command-line-iterm-and-zsh-2017-06-23.html)

### 设定主题

- iTerm2 Solarized 配色: https://github.com/altercation/solarized
- iTerm2 配色合集网站: http://iterm2colorschemes.com/
- iTerm2 配色合集 GitHub 地址：https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/schemes

> 目前 Solarized 已集成进 Iterm2，可不必下载。

![image-20220628143815413](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/f7PUYA_image-20220628143815413.png)

### 设定字体 **Powerline 字体**

为了终端下能正确的显示 fancy 字符，需要安装 powerline 字体，这样，这些 fancy 字符不至于显示为乱码。 GitHub 上已经有制作好的 Powerline 字体，可以下载了直接安装到系统：

> Powerline 字体下载: https://github.com/powerline/fonts

安装好之后，就可以选择一款你喜欢的 Powerline 字体了：Preferences -> Profiles -> Text -> Font -> Change Font

### 导入配置文件

配置文件：https://github.com/MrSeaWave/dotfiles/blob/main/iterm2.json

## Oh my zsh

https://ohmyz.sh/

```bash
$ sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 配置导入

https://github.com/MrSeaWave/dotfiles/blob/main/zshrc

更多使用参考 {% post_link oh-my-zsh oh-my-zsh入门 %}

## Homebrew

https://brew.sh/

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

> 如果遇到 `Warning: /opt/homebrew/bin is not in your PATH.` 报错，参考[stackoverflow.com](https://stackoverflow.com/questions/65487249/getting-a-warning-when-installing-homebrew-on-macos-big-sur-m1-chip)进行解决。
>
> 将下面一句写入 ~/.zshrc or ~/.bashrc
>
> `export PATH=/opt/homebrew/bin:$PATH`

## Git

https://git-scm.com/downloads

### 如何将命令行中的 git 提示语言改为英文

https://blog.csdn.net/michael_wgy_/article/details/105858848

```shell
$ vim ~/.zshrc
```

添加如下内容：

```
alias git='LANG=en_GB git'
```

更新配置：

```shell
$ source ~/.zshrc
```

## Node

https://nodejs.org/zh-cn/download/

## n

https://github.com/tj/n

```bash
$ npm install -g n
```

## nrm

https://github.com/Pana/nrm

```bash
$ npm install -g nrm
```

## Pnpm

https://www.pnpm.cn/installation

```bash
$ npm install -g pnpm
```

## yarn

https://yarnpkg.com/getting-started/install

**Node.js >=16.10**

Corepack is included by default with all Node.js installs, but is currently opt-in. To enable it, run the following command:

```bash
corepack enable
```

**Node.js <16.10**

Corepack isn't included with Node.js in versions before the 16.10; to address that, run:

```bash
npm i -g corepack
```

## live-server

https://www.npmjs.com/package/live-server

```bash
$ npm install -g live-server
```

## gitlab ssh-key

{% post_link ssh-key ssh-key使用 %}

## fig

https://fig.io/

## xnip

https://xnipapp.com/

## Paste

https://pasteapp.io/

## Alfred

https://www.alfredapp.com/

## Bardenter

https://www.macbartender.com/

## LICEcap

https://www.cockos.com/licecap/

## Upic

https://github.com/gee1k/uPic

{% post_link upic-github uPic 图床配置教程 - Github %}

## Unarchiver

https://theunarchiver.com/

## Postman

https://www.postman.com/

## Sourcetree

https://www.sourcetreeapp.com/

## 更多

参考 {% post_link mac-apps Mac 上的 APP 推荐 %}
