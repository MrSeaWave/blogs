---
title: 第 02 菜谱：菜谱开动了！
author: Sea
toc: true
cover: >-
  https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1674035440710.jpg
tags:
  - Weekly
categories:
  - Weekly
date: 2023-01-16 12:24:57
---

Hi，我是 Sea，欢迎打开新一期的「每周菜谱」，这是第「02」期，发表于 2023-01-16，今天开始每周菜谱的第一期内容，我们先来看看每周有什么值得推荐的

<!--more-->

## 每周推荐

### 2022 年前端大事记

https://mp.weixin.qq.com/s/HfgifbdzBSOZkDb0ru0XsA

`Web`、网络等前端需要关注的领域中发生的一些大事

### JavaScript 将新增两个原始数据类型

https://github.com/tc39/proposal-record-tuple

`JavaScript` 即将推出两个新的数据类型：`Record` 和 `Tuple` ，该提案目前已经到达 `Stage: 2`。

`Record` 和 `Tuple` 在用法上和对象、数据保持一致只不过他们是只读的：

```js
// Record, 一个非常不可变的类对象结构
const myRecord = #{
  name: 'ConardLi',
  age: 23,
};

myRecord.name = 'xxx'; // TypeError "Cannot assign to read only property 'name' of object '[object Object]'"

// Tuple, 一个非常不可变的类数组结构
const myTuple = #['1', '2', '3'];

myTuple[0] = '4'; // TypeError "Cannot assign to read only property '0' of object '[object Tuple]'"
```

另外还有一个很重要的点，当我们去比较 `Record` 和 `Tuple` 的值时，只会对比它们的值，而不再对比引用。

```js
console.log(#{ a: 1, b: 2 } === #{ b: 2, a: 1 });

// true
```

### Change Array by copy 提案进入 `stage3`

https://github.com/tc39/proposal-change-array-by-copy

该提案为数组新增了四个非破坏性（不改变原数组）方法：

- `toSorted()`：`.sort()` 的非破坏性版本；
- `toReversed()`：`.reverse()` 的非破坏性版本；
- `with()`：对数组的某个元素赋值操作的非破坏性版本；
- `toSpliced()`：`.splice()` 的非破坏性版本。

### Chrome 支持 Priority Hints，可控制网页资源加载优先级

https://mp.weixin.qq.com/s/CJQ1NB1V8vi1Y8mmw2InYw

`Chrome 101` 正式发布了 `Priority Hints`，用于指定页面资源的加载优先级，即 `fetchpriority` 属性，帮助浏览器根据优先级优化加载顺序，从而优化页面加载体验。

当浏览器开始解析网页，并开始下载图片、`Script` 以及 `CSS` 等资源的时候，浏览器会为每个资源分配一个代表资源下载优先级的 `fetch priority` 标志，而默认的资源下载顺序就取决于这个优先级标志。

### 低代码多分支协同开发的建设与实践

https://mp.weixin.qq.com/s/DmwxL67htHfTUP1U966N-Q

随着低代码的普及，在低代码平台上构建企业级应用逐渐成为生产趋势。同时，随着低代码技术的提升，越来越多的复杂应用在低代码平台中完成。在其研发生命周期中，低代码开发者就会面临多人协作、并行开发、维护多版本的场景。而现有的低代码平台普遍缺乏这一能力或支持较弱，导致对协同开发的成本较高，限制了迭代的效率。

### 对于“前端状态”相关问题，如何思考比较全面

https://mp.weixin.qq.com/s/y7JzwBcbOobjWQdYEQ7KqA

不管是 `ClassComponent` 还是 `FunctionComponent`、`Options API` 还是 `Composition API`，他们的本质都是 **「状态与 UI 的松散耦合单元」**。

当组件数量增多，逻辑变复杂时，一种常见的解耦方式是 —— 将可复用的逻辑从组件中抽离出来，放到单独的 `Model` 层。`UI` 直接调用 `Model` 层的方法。

对 `Model` 层的管理，也就是所谓的 「状态管理」。

### Pull Requests 的艺术

https://blog.openacid.com/culture/pr/

https://hackernoon.com/the-art-of-pull-requests-6f0f099850f9

提 PR 的一些艺术，保持 PR 够小，提过 PR 后及时通知，不要太严肃，不要太害怕。

### 我的信息流 2023.1

https://mp.weixin.qq.com/s/AJ4IBgYJ-Mq9OSICG0hRCA

极力推荐，云谦大佬介绍的自己获取信息的方法

## 技术实践

### 虚拟列表，我真的会了

https://juejin.cn/post/7085941958228574215

提供了如何实现虚拟列表的思路

### 二十张图片彻底讲明白 Webpack 设计理念

https://juejin.cn/post/7170852747749621791

从思想和架构两方面深度剖析了 Webpack 的设计理念。最后在代码实现阶段，通过百来行代码手写了 Webpack 的整体流程，尽管它只能对文件进行打包，还缺少很多功能，但麻雀虽小，却也五脏俱全。

### 一文弄懂 React ref

https://juejin.cn/post/7175174485534834749

通过本篇文章的学习，你将收获 React ref 的基本和进阶用法，并且能够明白 React 内部是如何处理 ref 的，并通过一个小 Demo + 提问的方式带你更加深刻地理解 ref 的底层原理

### miniReact_v17

https://github.com/changcheng1/miniReact_v17

精简版 React 实现，包含逐行注释

## 资源分享

### Awesome Mac

https://github.com/jaywcjlove/awesome-mac

收集各种类别非常好用的 Mac 应用程序、软件以及工具。

![image-20230116162859092](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/Fxwuiv_image-20230116162859092.png)

### Carbon

https://carbon.now.sh/

代码图片生成

![image-20230116162757436](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/VbXLnM_image-20230116162757436.png)

### tinypng

https://tinypng.com/

图片压缩

![image-20230116162724054](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/Xtj5Uk_image-20230116162724054.png)

### CodeTour

https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour

VSCode 插件，`CodeTour` 可以在多人协同开发时，给项目添加 `新手指引` 方便快速熟悉上手新项目，也可以用于 `code review`，现在更可以用来[记录源码](https://juejin.cn/post/6939576820492664845)，该工具由 [Microsoft 开源团队](https://github.com/microsoft) 提供，github 仓库地址 [microsoft/codetour](https://github.com/microsoft/codetour)

![CodeTour](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/Yvt8DT_76165260-c6c00500-6112-11ea-9cda-0a6cb9b72e8f.gif)

### DownloadFullInstaller

https://github.com/scriptingosx/DownloadFullInstaller

macOS application written in SwiftUI that downloads installer pkgs for the Install macOS Big Sur application.

## 小结

如果你喜欢每周菜谱，请转发给你的朋友，告诉他们来这里进行订阅~

订阅地址：https://mrseawave.github.io/blogs/

每周菜谱，让你做饭更开心~
