---
title: vs-code“实用插件”
author: Sea
toc: true
date: 2021-03-15 10:21:49
cover: https://code.visualstudio.com/assets/home/home-screenshot-mac-2x.png
tags: [vs-code, plugins, ide, recommend]
categories: [vs-code, plugins]
---

在使用`vs-code`时，整理了一些好用的`vs-code`插件分享。

<!-- more -->

## 基础必备

### Chinese

`vscode`编辑器汉化包，安装后，在 `locale.json` 中添加 `"locale": "zh-cn"`，即可载入中文（简体）语言包。

![image-20210315102958522](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/31fRGg_image-20210315102958522.png)

### Auto Rename Tag

自动重命名成对的`HTML`标记，修改开始标签，结束标签会同步修改。

![Usage](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/JWeqek_usage.gif)

### Auto Close Tag

自动闭合`HTML/XML`标签

![image-20210315103340610](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/gaOWng_image-20210315103340610.png)

![Usage](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/RpaynI_usage-20210315103532176.gif)

### HTML Snippets 

HTML 代码片段，该插件可为你提供 html 标签的代码提示，不用键入尖括号了。

![alt text](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/pq9GwN_VOhBvHb.gif)

### Bracket Pair Colorizer

该插件可以为你把成对的括号做颜色区分，并且提供一根连接线。方便我们审阅代码结构。

![Screenshot](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/6RtIHZ_example.png)

### CSS Peek

css 样式查看器，可快速查看我们的 css 样式，非常方便快捷。

![working](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/UYG7Pl_working.gif)

### Npm Intellisense

可自动完成导入语句中的 npm 模块。

![auto complete](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/q3absD_auto_complete.gif)

### open in browser

快速打开`html`文件到浏览器预览。

![image-20210315104535748](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/6OE8sR_image-20210315104535748.png)

### Debugger for Chrome

调试工具，必装；具体使用查看[官网](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

![image-20210315142046526](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/LpJLYj_image-20210315142046526.png)

### vscode-icons

提供了非常漂亮的目录树图标主题。

![image-20210315104651639](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/MADRmC_image-20210315104651639.png)

### Material Icon Theme

提供了非常漂亮的目录树图标主题。（这款最爱。

![image-20210315104747968](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/E552F2_image-20210315104747968.png)

### Atom One Dark Theme

One Dark Theme based on Atom。

![img](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/pze1nX_preview.png)

### Dracula Official

吸血鬼主题。

![Screenshot](https://raw.githubusercontent.com/dracula/visual-studio-code/master/screenshot.png)

### Path Intellisense

自动提示文件路径，支持各种快速引入文件。

![image-20210315105056840](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/Tm4nxo_image-20210315105056840.png)

### Image preview

鼠标悬浮在链接上可及时预览图片。

![image-20210315105653705](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/9Gzzmm_image-20210315105653705.png)

### Highlight Matching Tag

点击某 Tag 时对应的 Tag 下会有下划线标示，比较实用；

![demo](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/FYBLzm_zIA1XCzK_o.gif)

### Beautify

在代码文件右键鼠标一键格式化 `html,js,css`

![image-20210315105757042](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/J7qnJ2_image-20210315105757042.png)

### JavaScript (ES6) code snippets

ES6 语法智能提示，以及快速输入。

![image-20210315105937136](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/fEZVfu_image-20210315105937136.png)

### Vetur

`VScode`官方钦定 Vue 插件，`Vue`开发者必备。内含语法高亮，智能提示，`emmet`，错误提示，格式化，自动补全，`debugger`等实用功能。

![image-20210315110110462](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/teyTeu_image-20210315110110462.png)

### indent-rainbow

用颜色填充缩进，非常直观，如果有缩进错误还会变成红色。（ 对写 `Nim or Python` 用处极大。

![Example](https://raw.githubusercontent.com/oderwat/vscode-indent-rainbow/master/assets/example.png)

## 代码风格规范

### Prettier - Code formatter

Prettier 是一个“有态度”的代码格式化工具。，`prettier`支持我们大前端目前大部分语言处理，包括`JavaScript` 、`Flow`、 `TypeScript` 、`CSS` 、`SCSS` 、`Less` 、`JSX` 、`Vue` 、`GraphQL` 、`JSON` 、`Markdown`

![image-20210315110513315](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/4M8khr_image-20210315110513315.png)

### ESlint

规范 js 代码书写规则，如果觉得太过严谨，可自定义规则。

![image-20210315111002050](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/HhVbit_image-20210315111002050.png)

### Code Spell Checker

是拼写检查程序，检查不常见的单词，如果单词拼写错误，会给出警告提示。

![Example](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/z0epdb_example.gif)

### koroFileHeader

在`vscode`中用于生成文件头部注释和函数注释的插件，经过多版迭代后，插件：支持所有主流语言，功能强大，灵活方便，文档齐全，食用简单！

![example.gif](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/SictMV_example-20210315111802165.gif)

### Better Align

代码书写的整洁，工整往往是衡量一个程序员素养的标准，这款插件可以让你的代码更排版优雅。

![Select a wide range and align them all](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/IbLHLK_3.gif)

### change-case

通常我们对一个变量的命名可能是驼峰，可能是全大写，又或是下划线，这里可通过这个插件解决变量命名规范的问题。

选中变量配合组合键`[Command+Shift+p]`，输入对应格式即可。

![change-case-preview](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/Y8ndSo_3c5e29b6-7a9c-11e5-9ce4-7eb944889696.gif)

```bash
extension.changeCase.commands：列出所有“更改案例”命令，如果仅选择一个单词，则带有预览
extension.changeCase.camel：更改大小写'camel'：转换为字符串，并用下一个字母大写表示分隔符
extension.changeCase.constant：更改大小写“常量”：转换为大写字母，下划线分隔字符串
extension.changeCase.dot：更改大小写的“点”：转换为小写，句点分隔的字符串
extension.changeCase.kebab：更改大小写“ kebab”：转换为小写字母，用破折号分隔的字符串（参数名的别名）
extension.changeCase.lower：更改大小写为“小写”：转换为小写的字符串
extension.changeCase.lowerFirst：更改大小写“ lowerFirst”：转换为首字母小写的字符串
extension.changeCase.no：转换没有任何大小写的字符串（小写字母，空格分隔）
extension.changeCase.param：更改大小写为'param'：转换为小写字母，用破折号分隔的字符串
extension.changeCase.pascal：更改大小写“ pascal”：转换为以与camelCase相同的方式表示的字符串，但首字母也大写
extension.changeCase.path：更改大小写的“路径”：转换为小写，用斜杠分隔的字符串
extension.changeCase.sentence：更改大小写的“句子”：转换为小写的空格分隔的字符串
extension.changeCase.snake：更改大小写“ snake”：转换为小写字母，下划线分隔字符串
extension.changeCase.swap：更改大小写“交换”：转换为每个大小写相反的字符串
extension.changeCase.title：更改大小写“标题”：转换为以空格分隔的字符串，每个单词的第一个字符均大写
extension.changeCase.upper：更改大小写为大写：转换为大写字符串
extension.changeCase.upperFirst：更改大小写为“ upperFirst”：转换为首字母大写的字符串
```

### Better Comments

丰富注释颜色，让注释也具有生命力，如需自定义样式，需要写入配置代码。

![Annotated code](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/COFMpv_better-comments.PNG)

```
配置代码
"better-comments.tags": [
  {
    "tag": "*",
    "color": "#98C379",
    "strikethrough": false,
    "backgroundColor": "transparent"
  }
]
使用
// * 绿色的高亮注释
```

### TODO Tree

我们经常会在代码中使用`TODO`来标记我们的代码，提高可读性，`TODO Tree`这款插件提供了可视化窗口来查看和管理我们的`TODO Tree`

![image-20210315113352399](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/oiH3mn_image-20210315113352399.png)

## 其他插件（开发神器

### GitLens

`GitLens`可以帮助你更好地理解代码。快速查看更改行或代码块的对象，功能强大，功能丰富且高度可定制，可以满足你的需求

![image-20210315113520966](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/DIc7fz_image-20210315113520966.png)

### GitHistory

`GitHistory`可查看和搜索 git 日志以及图形和详细信息，同时还支持分支比较，分支管理等操作，非常方便。

![image-20210315113620629](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/HCdSPi_image-20210315113620629.png)

### Partial Diff

文件比较是一个很常见的场景，如果光凭我们肉眼分别的话，累人不说还容易出错。` Partial Diff`的出现就正好解决了这个问题。

![Compare two text selections](https://raw.githubusercontent.com/ryu1kn/vscode-partial-diff/master/images/public.gif)

### Markdown All in One

这款神器可以让我们在`vscode`里面快乐的书写`Markdown`，功能强大。提供了丰富的快捷键，可边写边看，轻松转化为`html`或`pdf`文件，十分好用，强烈推荐。

![image-20210315114206125](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/Epd21U_image-20210315114206125.png)

### vscode-drawio

这款神器可以让我们在`vscode`里面快乐的画流程图。新建 `.drawio` 后缀文件并拖入 vscode 中。

![image-20210315133629366](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/Ksri81_image-20210315133629366.png)

![img](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/QHlPev_demo.gif)

### Polacode-2020

这款神器可以将我们的代码转化成一张逼格满满的图片，在写文章或者代码分享的时候。抛出一张这样的图片，可比随手截图体面多了。

![usage](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/3Nk4aO_usage-20210315133953616.gif)

### carbon-now-sh

也是一款将代码转换成图片的插件，不过它会打开[carbon.now.sh](https://carbon.now.sh/)网站

![image-20210315134249172](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/vj7Z0B_image-20210315134249172.png)

### REST Client

这款神器可以让我们在`vscode`里面进行接口调试，提供丰富的 api 配置方式，让我们不用离开编辑器也可以随时调用接口调试。

新建一个`.http`文件，写下基本的测试代码，点击` Send Request`即可在右边窗口查看接口返回结果，非常 nice。

![rest-client](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/SZwzMz_usage-20210315134522075.gif)

### Browser Preview

可以让我们在`vscode`里面打开浏览器，一边编码一边查看。

![img](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/uESBfL_demo-20210315134714600.gif)

### JavaScript Booster

这款神器可以在我们代码写的不规范或者有待调整的地方，在光标聚焦后，会有一个小灯泡，只需跟随灯泡 💡，会提示对应的不合理原因和改进方案，极大的提高了我们的代码优雅度。

当在`JavaScript`（或`TypeScript / Flow`）中编辑代码时，此`VS Code`扩展提供了各种代码操作（快速修复）。只需注意左侧的灯泡 💡，然后按一下它即可了解如何在光标下转换代码。

![Features](https://github.com/xsburg/vscode-javascript-booster/raw/master/resources/recording-v14.0.0.gif)

### Settings Sync

让我们的`vscode`配置同步到云端，当我们跟换电脑或者再次安装`vscode`的时候，只需要登录账号即可同步配置了，而不用再次从头开始。（针对老版本的`vscode`）

![image-20210315135403897](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/UYQLr4_image-20210315135403897.png)

预览版`vscode`自带配置同步功能，可以通过 Microsoft 账户或 GitHub 账户进行多机器同步。具体可参考[官网](https://code.visualstudio.com/docs/editor/settings-sync)

![image-20210315135851862](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/elzUx9_oL1x10_image-20210315135851862.png)

![Turn on Sync command](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/NwCrtQ_turn-on-sync.png)

### Vim

如果你是`vim`重度用户，那么这款插件必不可少。

![image-20210315142401435](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/jiVbOD_image-20210315142401435.png)

### Live Share

可以使您能够与他人实时进行协作式编辑和调试，无论您使用的是哪种编程语言或正在构建的应用程序类型。具体使用细节可查看[官网](https://visualstudio.microsoft.com/zh-hans/services/live-share/)

![image-20210315140031883](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/4Flc5Y_image-20210315140031883.png)

### Remote Development

远程开发必备扩展安装（划时代的产品）。会为你安装包括 Remote-SSH 等全部远程开发使用的扩展。具体搭建可参考[VS Code Remote 环境搭建](https://juejin.cn/post/6844904000639205384)

![image-20210315141033118](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/MwRzCx_image-20210315141033118.png)
