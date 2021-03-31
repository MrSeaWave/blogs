---
title: vscode插件project-manager使用
author: Sea
toc: true
date: 2021-03-31 17:57:26
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/KwlX2Q_vscode-project-manager-logo-readme.png
tags: [vs-code, plugins]
categories: [vs-code, plugins]
---

在项目开发的时候，我们经常需要同时操作多个项目，经常需要切换项目。

<!--more-->

以前的方式

- 在工具栏中点击文件，打开，选择本地项目的目录 / 新建窗口
- 如果有最近打开的项目，点击打开最近的文件

![image-20210331180013295](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/IaL21v_image-20210331180013295.png)

这两种方式对于需要经常切换项目时，比较耗时

为解决这个问题，VSCode 提供了 [`Project Manager`](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager) 插件管理，开发时常用的项目。

![image-20210331180101765](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/RJxlEz_image-20210331180101765.png)

## Project Manager 管理项目

可用命令

- `Project Manager: Save Project` 将当前文件夹另存为新项目
- `Project Manager: Edit Project` 手动编辑项目（projects.json）
- `Project Manager: List Projects to Open` 列出所有已保存/检测到的项目并选择一个
- `Project Manager: List Projects to Open in New Window` 列出所有已保存/检测到的项目，然后选择一个在新窗口中打开
- `Project Manager: Refresh Projects` 刷新缓存的项目

### 保存项目

`command+ shift + p` 打开配置文件，输入 `Project Manager: Save Projects`

您可以随时将当前项目保存在管理器中。你只需要输入一个名字。它甚至会自动为你建议一个名字:)

![image-20210331180302535](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/FMIY85_image-20210331180302535.png)

按 Enter 键后，右下角弹出保存成功提示。

![plugin-project-manager-2.png](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/ZpgqC0_201901281548670347135325.png)

### 编辑项目

为了更轻松地自定义项目列表，您可以 `projects.json` 直接在 Code 中编辑文件。只需执行 `Project Manager: Edit Projects和projects.json` 文件被打开。这很简单，我就手动添加了一个 `blogs` 项目：

![image-20210331180928886](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/0Xo7Aj_image-20210331180928886.png)

确保 JSON 文件格式正确。否则，项目管理器将无法打开它，并且会出现类似这样的错误消息。在这种情况下，您应该使用 `Open File` 按钮来修复它。

![plugin-project-manager-3.png](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/8HsfRy_201901281548670366723058.png)

### 刷新项目

`command+ shift + p` 打开配置，输入 `Project Manager: Refresh Projects` 刷新项目

### 项目列表

刷新之后，左侧导航栏，多出一个文件夹图标，用于管理项目，点击其中一个，自动切换项目。

![image-20210331181017639](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/sWXi0v_image-20210331181017639.png)

### 可用设置

设置插件的可配置项，在 `首选项 - 设置 - 拓展 - Project Manager Configuration` 位置

举例：您可以选择项目的排序方式

```json
"projectManager.sortList": "Name"
```

- `Saved`：您保存项目的顺序
- `Name`：您为项目键入的名称
- `Path`：项目的完整路径
- `Recent`：最近使用的项目

![image-20210331181144284](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/o9b1dF_image-20210331181144284.png)
