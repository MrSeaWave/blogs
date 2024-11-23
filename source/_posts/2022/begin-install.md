---
title: 从零安装必备软件
author: Sea
toc: true
date: 2022-06-28 14:27:32
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/EGMtcL_joon-ahn-skylines-20.jpeg
tags: [Mac]
categories: [Tools]
---

今日打算重新组装系统，因此需要从零开始安装在 Mac 上的必备的一些软件。

<!--more-->

# 2024

尽可能使用 ==homebrew== 进行软件的 安装 （便于管理与已移除，尤其是字体部分

## 系统设置

- 关闭所有系统快捷键设定
- {% post_link simple-ways-to-set-macos-consecutive-input 如何让 Mac 长按一个按键连续输入 %}

### 关闭系统快捷键

系统设置 ->键盘 ->键盘快捷键
所有的快捷键配置几乎都可以进行关闭

## 开始

### Clash

众所周知的原因，这里不展开介绍

### Chrome

必备浏览器

### Brew

后面安装软件的工具

### 1Password

密码管理工具

```bash
$ brew install --cask 1password
```

### Karbiner-Elements

调整键盘工具，具体配置见 [[Karabiner-Elements 配置]]

```bash
$ brew install --cask karabiner-elements
```

### Kitty

终端工具，具体配置见 [[Kitty 配置]]

```bash
$ brew install --cask kitty
```

### Oh-my-zsh

插件：

```bash
# https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md#homebrew
# 这个插件也可以不用装，AmazonQ 自带行内提示功能
$ brew install zsh-autosuggestions
$ echo "source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh" >>! ~/.zshrc
# https://github.com/wting/autojump
$ brew install autojump
# https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md#oh-my-zsh
$ git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

```

### AmazonQ

命令行提示工具

```bash
$ brew install --cask amazon-q
```

### 字体安装

```bash
$ brew install --cask font-jetbrains-mono
$ brew install --cask font-jetbrains-mono-nerd-font
# [霞鹜文楷](https://github.com/lxgw/LxgwWenKai-Screen)
$ brew install font-lxgw-wenkai
```

细节见 [[用 HomeBrew 安装字体]]

### Node

```bash
$ brew install node
$ brew install n
$ brew install pnpm
$ npm install -g nrm
```

### VS Code

代码编辑工具

### Nvim

代码编辑工具

```bash
$ brew install neovim
```

具体配置见 [[如何配置nvim]]

### fork

git 客戶端

```bash
$ brew install fork
```

### Obsidian

笔记工具

### Alfred

聚焦搜索

```bash
$ brew install alfred
```

### Bardenter

状态栏管理工具

```bash
$ brew install bartender
```

### Squirrer

```bash
$ brew install --cask squirrel
```

细节见 [[squirrel - rime 输入法]]

### iina

视频观影工具

```bash
$ brew install iina
```

### unarchiver

解压缩工具

```bash
$ brew install --cask the-unarchiver
```

### Omnifocus

TODO 清单

```bash
$ brew install --cask omnifocus
```

### 欧陆词典

英文词典

```bash
$ brew install --cask eudic
```

### AltTab

窗口切换

```bash
$ brew install --cask alt-tab
```

### Upic

图床上传工具，需要搭配阿里云等 oss 平台进行使用，如何配置详见 [此篇文章](https://hailangya.com/articles/2021/03/24/upic-github/)

```bash
$ brew install bigwig-club/brew/upic --cask
```

## 软件推荐

- [[Mac 软件推荐]]
- [[终端配置|个人配置]]

## 参考链接

- [folke/dot: ☕️ My Dot Files](https://github.com/folke/dot/tree/master)：Cool

# Before

老版配置如下

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
