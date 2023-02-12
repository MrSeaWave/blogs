---
title: 第 05 菜谱：多学习点 CSS~
author: Sea
toc: true
cover: >-
  https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1674035440710.jpg
tags:
  - Weekly
categories:
  - Weekly
date: 2023-02-12 07:46:31
---

Hi，我是 Sea，欢迎打开新一期的「每周菜谱」，这是第「05」期，发表于 2023-02-12，我们先来看看每周有什么值得推荐的

<!--more-->

## 每周推荐

### ECMAScript Async Context 提案介绍

https://mp.weixin.qq.com/s/WOSMr6VWbmY3cOUoZRqJDg

由阿里巴巴 TC39 代表主导的 [**Async Context 提案**](https://github.com/tc39/proposal-async-context) 刚在 2023 年 2 月初的 TC39 会议中成为了 TC39 Stage 1 提案。提案的目标是定义在 JavaScript 的异步任务中传递数据的方案。

### 面试必问的异步顺序问题，用 Performance 轻松理清

https://mp.weixin.qq.com/s/T8T89IVhDEsHBuawG0KpGA

异步代码的执行顺序是前端面试必问的面试题，它主要考察对 Event Loop、宏微任务以及它们执行顺序的理解。

### 为 iframe 正名，你可能并不需要微前端

https://juejin.cn/post/7185070739064619068

> 任何新技术、新产品都是有一定适用场景的，它可能在当下很流行，但它不一定在任何时候都是最优解。

qiankun 的作者有一篇[《Why Not Iframe》](https://link.juejin.cn?target=https%3A%2F%2Fwww.yuque.com%2Fkuitos%2Fgky7yw%2Fgesexv%3Fspm%3Data.21736010.0.0.25c06df01VID5V) 介绍了 iframe 的优缺点（不过作者还有一篇[《你可能并不需要微前端》](https://link.juejin.cn?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F391248835)给微前端降降火），诚然 iframe 确实存在很多缺点，但是在选择一个方案的时候还是要具体场景具体分析，它可能在当下很流行，但它不一定在任何时候都是最优解：iframe 的这些缺点对我来说是否能够接受？它的缺点是否有其它方法可以弥补？使用它到底是利大于弊还是弊大于利？我们需要在优缺点之间找到一个平衡。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7ba7b4fe292438c9f84f8d095b032a1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### 看完 Svelte 纪录片才知道它为什么在国外比国内火

https://juejin.cn/post/7195401394692554812

`Svelte` 纪录片

### React.js 官网纪录片 2023-The Documentary

https://www.bilibili.com/video/BV1qT411R7M3/

`React`纪录片

## 技术实践

### CSS transition 小技巧！如何保留 hover 的状态？

https://mp.weixin.qq.com/s/F9uVoV0PbYDLJ6dNZvrQqA

如何在不借助 JS，保留住 hover 状态

![图片](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1676159771786_m3stPi.gif)

### 居中 toast 最佳 CSS 实现

https://www.bilibili.com/video/BV19Y411q7kH/

如何用 css，实现 toast，省流：

```css
.toast {
  position：fixed；
  width：fit-content；
  left：1rem；
  right：1rem；
  margin-left：auto；
  margin-right：auto；
}
```

![image-20230212081657553](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1676161018051_DDpcCy.png)

### 还在用 JS 做节流吗？CSS 也可以防止按钮重复点击

https://mp.weixin.qq.com/s/sXXvro-n5RH9eFJ9UPw3qQ

众所周知，函数节流（throttle）是 JS 中一个非常常见的优化手段，可以有效避免函数过于频繁的执行。其实除了 JS 方式， CSS 也可以非常轻易实现这样一个功能，无需任何框架库，一起看看吧

```css
button {
  animation: throttle 2s step-end forwards;
}
button:active {
  animation: none;
}
@keyframes throttle {
  from {
    pointer-events: none;
  }
  to {
    pointer-events: all;
  }
}
```

### vh 存在问题？试试动态视口单位之 dvh、svh、lvh

https://mp.weixin.qq.com/s/wUn0bZ2qJjJ2FCwbWEQvWQ

**vh 在移动端存在问题！**（在移动端，100vh 不总是等于一屏幕的高度\*\*。有的时候，100vh 高度会出现滚动条）根因在于：

1. 很多浏览器，在计算 100vh 的高度的时候，会把地址栏等相关控件的高度计算在内
2. 同时，很多时候，由于会弹出软键盘等操作，在弹出的过程中，`100vh` 的计算值并不会实时发生变化！

因此有了新视口相关单位 lvh、svh、dvh

![image-20230212083410427](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1676162051076_T9MLkV.png)

### 45 个 GIT 经典操作场景，专治不会合代码

https://mp.weixin.qq.com/s/2p4m63JdsCjBpVku-WaZyA

整理了 45 个日常用 git 合代码的经典操作场景，基本覆盖了工作中的需求。

## 拓展边界

### 眼睛干涩发胀别硬熬，快试试这两个方法

https://mp.weixin.qq.com/s/Qb2aCY8Fl3GpO_tki-On7w

虽然里面是广告，但还是有有效的护眼小妙招

1. **热敷 40 ℃，持续十分钟**
2. **按摩眼眶周围，缓解肌肉疲劳**

![图片](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1676160924749_sQ6tni.jpeg)

### 为什么云盘的上传速度那么快？

https://www.zhihu.com/question/512137759

因为网盘（云盘）基本都有秒传模块，这个文件符合秒传规则（云端数据里已经有一摸一样的文件存在了），被秒传了，秒传的原理其实相当简单，就是我们上传文件时，系统去扫描文件的哈希码并保存在数据库中，每个文件（包括其副本）的哈希码都是独一无二的，就是说，如果哈希码相同，我们可以定义为是同一个文件。还有一点需要明确，所以所谓“限速”的网盘，限制的也是下载速度。不管什么平台，上传都是能跑满网速的（上行带宽）

### Rediscovering RSS

https://deqc.xyz/posts/why-i-went-back-to-rss/

![image-20230212090447149](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1676163887787_2aTGFp.png)

## 小结

如果你喜欢每周菜谱，请转发给你的朋友，告诉他们来这里进行订阅~

订阅地址：https://mrseawave.github.io/blogs/

每周菜谱，让你做饭更开心~
