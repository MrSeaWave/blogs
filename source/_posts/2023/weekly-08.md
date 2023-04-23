---
title: 第 08 菜谱：React SSR 实现原理：从 renderToString 到 hydrate
author: Sea
toc: true
cover: >-
  https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1674035440710.jpg
tags:
  - Weekly
categories:
  - Weekly
date: 2023-04-23 15:14:40
---

Hi，我是 Sea，欢迎打开新一期的「每周菜谱」，这是第「08」期，发表于 2023-04-23，我们先来看看每周有什么值得推荐的~

<!--more-->

## 每周推荐

### React SSR 实现原理：从 renderToString 到 hydrate

https://mp.weixin.qq.com/s/MA6onW57f5LsntgF5mrSHQ

React SSR 是服务端通过 renderToString 把组件树渲染成 html 字符串，浏览器通过 hydrate 把 dom 关联到 fiber 树，加上交互逻辑和再次渲染。

服务端 renderToString 就是递归拼接字符串的过程，遇到组件会传入参数执行，遇到标签会拼接对应的字符串，最终返回一段 html 给浏览器。

浏览器端 hydrate 是在 reconcile 的 beginWork 阶段，依次判断 dom 是否可以复用到当前 fiber，可以的话就设置到 fiber.stateNode，然后在 completeWork 阶段就可以跳过节点的创建。

### 编程中最难的就是命名？这几招教你快速上手

https://mp.weixin.qq.com/s/q0yZPEcOhsNUqdYaBsLm8g

本文通过案例的讲解强调了命名的重要性及养成良好的命名习惯一些建议。

### What Is `require.resolve` And How Does It Work?

https://dev.to/stephencweiss/what-is-require-resolve-and-how-does-it-work-1ho4

获取当前文件路径

```js
console.log(path.join(__dirname, 'data.txt'));
// 用 require.resolve 代替
console.log(require.resolve('./data.txt'));
```

### React.lazy without a default export

https://dev.to/iamandrewluca/react-lazy-without-default-export-4b65

https://legacy.reactjs.org/docs/code-splitting.html#named-exports

`React.lazy`目前仅支持默认导出。如果您要导入的模块使用命名导出，您可以创建一个中间模块，将其重新导出为默认模块。

![1682235897430_oND3b8](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1682235897430_oND3b8.png)

### 对于质量保障，前端职能该做些什么？

https://mp.weixin.qq.com/s/TpISxLeaYmL3OhDvhNVXZw

对于前端项目交付的质量，各团队往往会建设众多的交付标准，希望以此来约束项目的开发，从而保障最终的交付物质量。

## 技术实践

### 如何检查前端项目中未使用的依赖包？

https://mp.weixin.qq.com/s/Z-sDe2fGuRm2GiKfyOJXJA

随着前端项目中使用的依赖包越来越多，而其中一部分依赖包可能并未被项目所使用，手动查找这些依赖包既耗时又繁琐。那么，有没有工具能够快速地帮助我们识别和清理项目中未使用的依赖包呢？下面就来介绍两个用于检查未使用依赖包的常用工具！

- [depcheck - npm](https://www.npmjs.com/package/depcheck)
- [npm-check - npm](https://www.npmjs.com/package/npm-check)

### 你是如何获取文本宽度的？

https://juejin.cn/post/7091990279565082655

日常开发中，经常会需要获取文本显示宽度来做一些特殊布局， 比如：

- 文本超过多长时候截断展示省略号...
- canvas 布局时候在某段文本之后展示特殊标记等

如何才能准确高效的实现获取文本实际的渲染宽度呢？

### 揭示 useCallback 的问题和隐患并给出解决方案

https://github.com/huyaocode/webKnowledge/issues/12

揭示 useCallback 的问题和隐患，如有需要 useCallback，个人建议直接使用 ahooks 中 [useMemoizedFn](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useMemoizedFn/index.ts)，持久化函数，但变量是使用最新值

### 如何实现多个颜色叠加效果？

https://segmentfault.com/q/1010000000398005

https://stackoverflow.com/questions/12143544/how-to-multiply-two-colors-in-javascript

JS 实现如何颜色叠加

[叠加公式](https://en.wikipedia.org/wiki/Blend_modes#Multiply)

```
Formula: Result Color = (Top Color) * (Bottom Color) /255
```

```js
function multiply(rgb1, rgb2) {
  var result = [],
    i = 0;
  for (; i < rgb1.length; i++) {
    result.push(Math.floor((rgb1[i] * rgb2[i]) / 255));
  }
  return result;
}
```

## 拓展边界

### 别再往眼球上滴眼药水了

https://mp.weixin.qq.com/s/Xkcg9NAUO560zAB74eu7kg

轻松滴眼药水最关键的地方在于：**不要直接瞄准眼球**。**更好的方式是瞄准结膜囊，也就是眼皮与眼球之间的空间**。用手捏住下眼皮，轻轻往下拉，这样下眼睑和眼球之间就会形成一个“小口袋”——只要把眼药水滴在这里就行了。

![img](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1682239818151_DAjltc.jpeg)

### 道家绝活“解龙环”

https://www.bilibili.com/video/BV1Lh411u7BL/?vd_source=340c3fc924b0c4be6baa9bb2af1224a9

道家绝活“解龙环”，松解肩颈只需 10 秒钟

### 如何在 Gitlab 中使用 ChatGPT 进行 CodeReview

https://mp.weixin.qq.com/s/Dyk1cYg63oOs13f9_gf9ug

本篇文章介绍如何在 Gitlab 中使用 ChatGPT 进行 CodeReview:

如想查看如何与 Github 一起使用，可查看

- ChatGPT-CodeReview：https://github.com/anc95/ChatGPT-CodeReview
- codereview.gpt：https://github.com/sturdy-dev/codereview.gpt

### ChatGPT 提示模式：提高代码质量、重构、需求获取和软件设计

https://mp.weixin.qq.com/s/smbsScFbCT3Ci7mGF5uxPA

https://arxiv.org/pdf/2303.07839.pdf

总结了帮助工程师应用 ChatGPT 改进需求获取、快速原型制作、代码质量、重构和系统设计的提示模式的核心思想和 100 个提示要点

## 小结

如果你喜欢每周菜谱，请转发给你的朋友，告诉他们来这里进行订阅~

订阅地址：https://mrseawave.github.io/blogs/

每周菜谱，让你做饭更开心~
