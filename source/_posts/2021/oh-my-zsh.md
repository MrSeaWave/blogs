---
title: oh-my-zsh
author: Sea
toc: true
date: 2021-08-29 15:20:03
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/vEdGKO_porforever-phuchong-chavapun-05-strolling.jpg
tags: [ZSH, Install]
categories:
  - [技术]
  - [Tools]
---

本文将介绍一款顺手的`shell` ------ `zsh `

> 主要介绍的是 oh my zsh

<!--more-->

为什么是 zsh，其含义是：

> The last shell you’ll ever need!

可以理解为，一旦用上它，就别无所求了。跟 Bash 相比，Zsh 的补全功能强大了许多，可以自动补全命令、参数、文件名、进程、用户名、变量、权限符，等等…… 另外，还支持插件，通过插件又可以扩展出许多功能来。

## Zsh 是什么

- **Zsh** 是一款强大的虚拟终端，既是一个系统的虚拟终端，也可以作为一个脚本语言的交互解析器。

```bash
# 打开终端，在终端上输入:
$ zsh --version

# 这个命令来查看我们的电脑上是否安装了 Zsh
# 端查询版本为： zsh 5.7.1 (x86_64-apple-darwin19.0)
```

- 终端查询版本为： **zsh 5.7.1 (x86_64-apple-darwin19.0)**

```bash
# 查看系统当前 shell
$ cat /etc/shells

# List of acceptable shells for chpass(1).
# Ftpd will not allow users to connect who are not using
# one of these shells.

/bin/bash
/bin/csh
/bin/dash
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

因为 zsh 的默认配置极其复杂繁琐，让人望而却步，因此使用 Oh My Zsh 这个开源项目，让 zsh 配置降到 0 门槛。而且它完全兼容 bash 。所以，我们可以理解为 Oh My Zsh 是一个方便你配置和使用 Zsh 的一个开源工具。

## Oh My Zsh 是什么

- **Oh My Zsh** 是一款社区驱动的命令行工具，正如它的主页上说的，**Oh My Zsh** 是一种生活方式。它基于 **zsh** 命令行，提供了主题配置，插件机制，已经内置的便捷操作。给我们一种全新的方式使用命令行。

- **Oh My Zsh** 是基于 **zsh** 命令行的一个扩展工具集，提供了丰富的扩展功能。

- 安装 **Oh My Zsh** 前提条件：必须已安装 **zsh**

  > 如果是 linux 系统，首先你需要安装 zsh
  >
  > ```
  > sudo yum install zsh
  > 或者
  > sudo apt-get install zsh
  > ```
  >
  > mac 系统下我们无需安装.

以下操作都是基于 **Mac** 系统。

## 安装 Oh My Zsh

**可以通过 curl 、wget、fetch 三种方式来安装，用一条命令即可安装。**

| Method    | Command                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------- |
| **curl**  | `sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"` |
| **wget**  | `sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`   |
| **fetch** | `sh -c "$(fetch -o - https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"` |

安装过程中输出如下：

```bash
xxxx% sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
Cloning Oh My Zsh...
Cloning into '/Users/xxxx/.oh-my-zsh'...
remote: Counting objects: 831, done.
remote: Compressing objects: 100% (700/700), done.
remote: Total 831 (delta 14), reused 775 (delta 10), pack-reused 0
Receiving objects: 100% (831/831), 567.67 KiB | 75.00 KiB/s, done.
Resolving deltas: 100% (14/14), done.
Looking for an existing zsh config...
Found ~/.zshrc. Backing up to ~/.zshrc.pre-oh-my-zsh
Using the Oh My Zsh template file and adding it to ~/.zshrc
             __                                     __
      ____  / /_     ____ ___  __  __   ____  _____/ /_
     / __ \/ __ \   / __ `__ \/ / / /  /_  / / ___/ __ \
    / /_/ / / / /  / / / / / / /_/ /    / /_(__  ) / / /
    \____/_/ /_/  /_/ /_/ /_/\__, /    /___/____/_/ /_/
                            /____/                       ....is now installed!
Please look over the ~/.zshrc file to select plugins, themes, and options.
p.s. Follow us at https://twitter.com/ohmyzsh.
p.p.s. Get stickers and t-shirts at http://shop.planetargon.com.
```

## 卸载 Oh My Zsh

- 终端输入 ：

```bash
$ uninstall_oh_my_zsh
Are you sure you want to remove Oh My Zsh? [y/N]  Y
```

- 终端提示信息：

```bash
Removing ~/.oh-my-zsh
Looking for original zsh config...
Found ~/.zshrc.pre-oh-my-zsh -- Restoring to ~/.zshrc
Found ~/.zshrc -- Renaming to ~/.zshrc.omz-uninstalled-20170820200007
Your original zsh config was restored. Please restart your session.
Thanks for trying out Oh My Zsh. It's been uninstalled.

```

## Zsh 常用设置

跟 Bash 一样，Bash 的配置文件叫做`.bashrc`，Zsh 的配置文件，也放在用户当前目录，叫做`.zshrc`。

### 配置主题

```bash
$ vim ~/.zshrc

# 找到 ZSH_THEME
# robbyrussell 是默认的主题
ZSH_THEME="robbyrussell"

# ZSH_THEME="样式名称"
```

- 保存这个文件文件，重新打开终端。

**查看主题名称**

- **Oh My Zsh** 默认自带了一些默认主题，存放在 `~/.oh-my-zsh/themes` 目录中。我们可以查看这些主题
- 终端输入：

```bash
$ cd ~/.oh-my-zsh/themes && ls
```

- [更多主题设置](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)

- [定制主题](https://zhuanlan.zhihu.com/p/265525597)

- [Oh My Zsh,『 Agnoster 主题配置 』](https://zhuanlan.zhihu.com/p/62419420)

## Zsh 常用方法

### 命令别名

通过在`.zshrc`中配置`alias`，可以方便的为其他的命令设置别名，这是个很不错的功能。

比如跟 git 相关的：

```bash
alias g='git'

alias ga='git add'
alias gaa='git add --all'
alias gapa='git add --patch'

alias gb='git branch'
alias gba='git branch -a'
alias gbda='git branch --merged | command grep -vE "^(\*|\s*master\s*$)" | command xargs -n 1 git branch -d'
alias gbl='git blame -b -w'
alias gbnm='git branch --no-merged'
alias gbr='git branch --remote'
alias gbs='git bisect'
alias gbsb='git bisect bad'
alias gbsg='git bisect good'
alias gbsr='git bisect reset'
alias gbss='git bisect start'

alias gco="git checkout"
alias gc="git commit -m"
alias gd='git diff'
alias gf='git fetch'
alias gs="git status"
alias gsm="git summary"
alias gl="git log"
alias gm="git merge"
alias gpl="git pull"
alias gps="git push"
alias grv='git remote -v'
alias grb='git rebase'
```

比如`push`提交到远程`git`仓库的时候，就不必老老实实的输入 `git push origin master` 了，只需要输入 `gps origin master` 即可。于是 `git pull` 也简化成了 `gpl` , `git commit -m` 也简化成了 `gc`

### 切换目录

在 Zsh 中，可以通过输入 `.` 号来跳转，比如：

- 直接输入`.. `和` …` 可以快速切换到上层和上上层目录
- 直接输入`n+1`个点，可以往上层跳转` n` 层

### 进程 id 补全

Zsh 的补全功能非常不错，除了一般的目录和文件名补全，还可以自动补全进程 ID。比如，我们通常要`kill`掉一个进程，得先用 `ps -aux|grep process_name` 先拿到进程 id，然后再 `kill pid` 来终止掉一个进程。在 Zsh 中可以直接这样：(记得按`Tab`键)

![background](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/j18X56_background.gif)

### 快速跳转

Zsh 支持目录的快速跳转，我们可以使用 `d` 这个命令，列出最近访问过的各个目录，然后选择目录前面的数字进行快速跳转：

![image-20210829164458647](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/VhB2qL_image-20210829164458647.png)

### 目录名简写与补全

如果确切的知道我们要进入某一层目录，但是目录名比较长，没关系，Zsh 帮你搞定！ 比如我们要进入到 `~/workSpace/privateStudy/tem`，我们只需要输入每个目录的首字母就行，然后按`TAB`键补全，Zsh 会帮你搞定剩下的：

![background2](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/EiWmvO_background2.gif)

### 常用命令参数补全

Zsh 在行的，不光是目录名的补全，常用的命令参数，它也能给你提供参考：(记得按`Tab`键)

![background2](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/0MwH5W_background2.gif)

### 重复上一条命令

输入 `r` ，可以很便捷的重复执行上一条命令。

## Zsh 常用插件推荐

Zsh 支持插件，通过插件扩展可以实现许多方便的功能。这里介绍一下我常用的几个 Zsh 插件：

```bash
# vim ~/.zshrc
plugins=(git autojump zsh-autosuggestions)
```

> 所有的 zsh 的插件都是在这里配置的，具体安装方法查看各个插件自己的 install

### zsh-autosuggestions

[命令自动提示插件](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md)，这个是个很有意思也很高效的插件。能记录平时你输入过的命令，下次再输入的时候，它会提前提示你，方便懒人。如果是你需要的命令，直接 `→ ` 搞定，来直接看看效果吧：

![background](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/qLKWTZ_background.gif)

> 配合 item2 的`Solarized dark`主题时推荐`ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=23'`

### autojump

[autojump](https://github.com/wting/autojump)是一个目录直接快速跳转的效率工具，它会自动记录之前访问过的目录，并计算权重。用法也很简单 `j directory_name` 即可。比如我要访问 `~/workSpace/src` ，只需要输入 `j src` 就行了……

![image-20210829162826465](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/v2KjUO_image-20210829162826465.png)

### zsh-syntax-highlighting

[zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md)为`shell zsh`提供语法突出显示。它允许高亮显示在`zsh`提示符下输入到交互式终端的命令。这有助于在运行命令之前检查它们，特别是在捕获语法错误方面。

Before: ![before1-smaller](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/FKrhke_before1-smaller.png)

After: ![after1-smaller](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/A3yQIU_after1-smaller.png)

> ### Tips
>
> - **Oh My Zsh** 的自动更新提示误触关掉了解决办法
>   - 打开终端输入：`upgrade_oh_my_zsh`

### jsontools

[jsontools](https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/jsontools/README.md) 格式化 json 数据的命令行工具

如下数据：

![image-20220210113113326](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/0Ijijm_image-20220210113113326.png)

加上`pp_json`后，输入格式化后的 json 文件：

![image-20220210113201000](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/VFwu1l_image-20220210113201000.png)

更多用法查看[官网](https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/jsontools/README.md)

## 参考链接

- [ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)
- [程序员内功系列--iTerm 与 Zsh 篇](https://xiaozhou.net/learn-the-command-line-iterm-and-zsh-2017-06-23.html)
- [Oh My Zsh, 『 安装 & 配置 』](https://zhuanlan.zhihu.com/p/35283688)
- [oh-my-zsh 配置你的 zsh 提高 shell 逼格终极选择](https://yijiebuyi.com/blog/b9b5e1ebb719f22475c38c4819ab8151.html)
- [How to change zsh-autosuggestions color](https://stackoverflow.com/questions/47310537/how-to-change-zsh-autosuggestions-color)
- [Mac 安装 oh my zsh 插件](https://juejin.cn/post/6878188289958871053)
- [Top 10 Oh My Zsh Plugins For Productive Developers](https://travis.media/top-10-oh-my-zsh-plugins-for-productive-developers/#20210719-json)
