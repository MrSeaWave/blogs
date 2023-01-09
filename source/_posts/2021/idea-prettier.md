---
title: 'Prettier: support "overrides" option on code styles import'
author: Sea
toc: true
date: 2021-04-14 14:54:53
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/Fj8B7I_chris-campbell-skeeziks-daughter-of-cernunnos.jpg
tags: [JetBrains, Prettier, WebStorm, Format, WX]
categories: [Tools]
---

在直接调用 WebStorm 自带的 Prettier 去格式化 wxml / wxss / wxs 文件会提示：

> File xxx has unsupported type

<!--more-->

猜想 Prettier 应该提供**任意文件映射为任意已支持的文件类型的格式化配置。**查阅官方文档后：[Setting the parser option](https://prettier.io/docs/en/configuration.html#setting-the-parserdocsenoptionshtmlparser-option)，于是有了下面配置。

```json prettierrc
{
  "prettier": {
    "overrides": [
      {
        "files": "*.wxml",
        "options": {
          "parser": "html"
        }
      },
      {
        "files": "*.wxss",
        "options": {
          "parser": "css"
        }
      },
      {
        "files": "*.wxs",
        "options": {
          "parser": "babel"
        }
      }
    ]
  }
}
```

于是在某个小程序文件中再次尝试调用 WebStorm 自带的 Prettier，发现依然是那个错误提示，重启也无果。。但是 vscode 却可以正常使用了。

又试了下手动在命令行里敲：

```text
npx prettier xx --write
```

成功，于是判断问题出在 webstorm 上。

尝试修复：

1. 全局安装 Prettier，这样方便跨项目复用（可选
2. **Preferences** - **Tools** - **External Tools**
3. 点击当前窗口左下角 **+** 号
4. Name、Description 自己起一个吧
5. Program 里填写：`Prettier 安装位置/bin-prettier.js`
6. Arguments 里填写：`$FilePath$ --write`
7. Working directory 不用管，**ok**、**apply** 双连保存配置

以上步骤完成之后你就可以通过顶部菜单：**Tools** - **External Tools** - **你起的 Tool Name** 来格式化当前的小程序文件了。再说说快捷键的配置步骤：

1. **Preferences** - **Keymap**
2. 当前窗口右上角搜索你创建的 **Tool Name**
3. 在搜索结果里选中它 **Add Keyboard Shortcut** 吧！

## 参考链接

- [WebStorm 微信小程序代码提示 + Prettier 代码格式化](https://zhuanlan.zhihu.com/p/145547081)
- [Prettier: support "overrides" option on code styles import](https://link.zhihu.com/?target=https%3A//youtrack.jetbrains.com/issue/WEB-31337)
