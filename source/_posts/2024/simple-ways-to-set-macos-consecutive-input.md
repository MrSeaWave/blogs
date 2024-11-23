---
title: 如何让Mac长按一个按键连续输入
author: Sea
toc: true
date: 2024-11-23 09:00:36
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/EGMtcL_joon-ahn-skylines-20.jpeg
tags: [Mac]
categories: [Tools]
---

## 前言

Mac 在使用系统自带英文输入法的情况下，**长按一个元音字母，系统会自动弹出元音音标提示框**。

<!--more-->

苹果「Apple」设计此功能的初衷当然是为了提高输入便利性，优化用户输入体验。但是，这会对开发人员的日常工作（Coding）带来困扰，因为，我们不能**长按连续输入字符**了。

`macOS` 系统长按元音字母弹出提示框。

![1691546548089_0WeFEV](https://sea-notes.oss-cn-shanghai.aliyuncs.com/uPic/2023/1691546548089_0WeFEV.png)

## Mac 长按连续输入的简单设置方法

实际上，苹果「Apple」已经在**用户系统配置项「Mac OS X User Defaults System」**里预留出了长按连续输入的设置选项。我们可以方便地**使用 `defaluts` 命令行工具关闭 `ApplePressAndHoldEnabled` 功能**，设置完成后，**注销或重启使其生效**即可。

```bash
$ defaults write -g ApplePressAndHoldEnabled -bool false
# or
$ defaults write NSGlobalDomain ApplePressAndHoldEnabled -boolean false
```

> `defaults` 全局 `-g` 设置长按连续输入

甚至，我们还可以做到仅针对某个应用程序单独设置：

```bash
$ defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false
```

> `defaults` 针对应用程序设置长按连续输入

我们也可以通过命令来查看当前系统 `ApplePressAndHoldEnabled` 配置的启用情况。

```bash
$ defaults read | grep ApplePressAndHoldEnabled
```

> 检查 `ApplePressAndHoldEnabled` 启用情况

## 提高使用 Vim 光标移动速度

记得设定键重复率

系统偏好设置 -> 键盘 -> 按键重复 & 重复前延迟都调到最大。

![1691204053173_asid35](https://sea-notes.oss-cn-shanghai.aliyuncs.com/uPic/2023/1691204053173_asid35.png)

也可以使用 [[Karabiner-Elements 配置|Karrabiner-Elements]]

![1691547105585_yiUiLR](https://sea-notes.oss-cn-shanghai.aliyuncs.com/uPic/2023/1691547105585_yiUiLR.png)

## 参考链接

- [VSCodeVim/Vim: :star: Vim for Visual Studio Code](https://github.com/VSCodeVim/Vim#mac)
- [macOS 长按连续输入的简单设置方法 - zihengCat](https://zihengcat.github.io/2018/08/02/simple-ways-to-set-macos-consecutive-input/)
- [macos - 如何在 Vim for VsCode 上进行按键重复工作？ - 堆栈溢出](https://stackoverflow.com/questions/69034645/how-to-make-key-repeat-work-on-vim-for-vscode)
- [如何更改 Mac OS X 英文输入法的长按结果为连续输入（Press And Hold Enabled）？ - 知乎](https://www.zhihu.com/question/20589636)
- [intellij idea - How can I disable `ApplePressAndHoldEnabled` for a specific application (repeat keys instead of showing an accent menu)? - Stack Overflow](https://stackoverflow.com/questions/33152551/how-can-i-disable-applepressandholdenabled-for-a-specific-application-repeat/70911250#70911250)
- [为什么 Mac 下使用 Vim 光标移动速度很慢？ - 知乎](https://www.zhihu.com/question/20849024)
