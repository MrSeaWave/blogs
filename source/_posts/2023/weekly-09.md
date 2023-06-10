---
title: 第 09 菜谱：Service Worker 使用 Workbox 预缓存实践
author: Sea
toc: true
cover: >-
  https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1674035440710.jpg
tags:
  - Weekly
categories:
  - Weekly
date: 2023-06-10 08:42:09
---

Hi，我是 Sea，欢迎打开新一期的「每周菜谱」，这是第「09」期，发表于 2023-06-10，我们先来看看每周有什么值得推荐的~

<!--more-->

## 每周推荐

### ES2023 即将发布，快来看看有哪些更新

https://mp.weixin.qq.com/s?__biz=MzA4NjI1OTM5OQ==&mid=2455887416&idx=1&sn=1ef4e5eb95f61d6e4c00a93430bfc6dd&scene=21#wechat_redirect

### CSS 原生支持三角函数

https://mp.weixin.qq.com/s?__biz=Mzg2MDU4MzU3Nw==&mid=2247495701&idx=1&sn=8779fa1de1a196bc28c78fadb375d336&scene=21#wechat_redirect

```css
.box {
  /* 设置元素的宽度为 sin(30deg) 的值 */
  width: calc(sin(30deg) * 100px);

  /* 设置元素的高度为 cos(45deg) 的值 */
  height: calc(cos(45deg) * 100%);

  /* 设置元素的透明度为 tan(60deg) 的值 */
  opacity: calc(tan(60deg));
}
```

### 为什么都用 PM2 来跑 Node 应用？

https://mp.weixin.qq.com/s/GyKx5tcvVjUCNgbe9Jl05w

在服务器上，我们不会直接跑 node，而会用 pm2 来跑。

为什么要用 pm2 呢？它解决了什么问题？

### 探索主流前端框架的响应式原理

https://mp.weixin.qq.com/s/Fe_SbQE1fWU_j2vSgSSttA

在前端框架中，一般有三种处理响应式的方法：

- Values: 通过比较当前值和之前的值来检测数据变化。Angular 使用表达式进行比较，React 使用虚拟 DOM 进行比较，Svelte 使用编译器进行脏数据标记。
- Observables：在 Angular 中使用 RxJS，在 Svelte 中使用 Stores 来处理响应式数据。
- Signals：在 Vue、Qwik 和 Solid 框架中使用 Signals。它与 Vue 相连的是组件，Qwik 与 DOM 连接，Solid 使用 DOM 作为更细粒度的方法。

每种方法都有其特点和适用场景，开发者需要根据具体情况选择合适的方法来处理响应式数据。

### 现代图片性能优化及体验优化指南

https://mp.weixin.qq.com/s?__biz=Mzg2MDU4MzU3Nw==&mid=2247495418&idx=1&sn=379e7ad612de120e4d327e42aa4b9064&scene=21#wechat_redirect

图片资源，在我们的业务中可谓是占据了非常大头的一环，尤其是其对带宽的消耗是十分巨大的。

对图片的性能优化及体验优化在今天就显得尤为重要。本文，就将从各个方面阐述，在各种新特性满头飞的今天，我们可以如何尽可能的对我们的图片资源，进行性能优化及体验优化。

## 技术实践

### Service Worker 使用 Workbox 预缓存实践

https://juejin.cn/post/7083656336705060871

SW ： 服务器与浏览器之间的中间人，如果网站中注册了**Service Worker**那么它可以拦截当前网站所有的请求，进行判断（需要编写相应的判断程序），如果需要向服务器发起请求的就转给服务器，如果可以直接使用缓存的就直接返回缓存不再转给服务器,我们在**Service Worker** 中可以做拦截客户端的请求、向客户端发送消息、向服务器发起请求等相关关操作，其中最重要且广泛的的作用就是离线资源缓存

其中 Service Worker 调试 可查看此篇[文章](https://lavas-project.github.io/pwa-book/chapter04/4-service-worker-debug.html)

### 如何设计一个支持并发的前端缓存接口？

https://mp.weixin.qq.com/s/OdjqLxhG26X4of0cPAWMtA

缓存池不过就是一个`map`，存储接口数据的地方，将接口的路径和参数拼到一块作为`key`，数据作为`value`存起来，本文主要是实践

### console 样式增强库

https://juejin.cn/post/7216182763237916729

```js
// 只有一个 %c 时
console.info(
  '%c this is me ',
  'background-color: #2196f3; padding: 6px 12px; border-radius: 2px; font-size: 14px; color: #fff; text-transform: uppercase; font-weight: 600;',
  window
);

// 两个 %c 时
console.info(
  '%c this is first %c this is second ',
  'background-color: #2196f3; padding: 6px 12px; border-radius: 2px; font-size: 14px; color: #fff; text-transform: uppercase; font-weight: 600;',
  'background-color: #00BCD4; padding: 6px 12px; border-radius: 2px; font-size: 14px; color: #fff; text-transform: uppercase; font-weight: 600;',
  window
);
```

### async/await 异常捕获你还在用 try-catch

https://juejin.cn/post/7224391827654180922

不知道大家项目里面是怎么处理 async/await 的异常，我在我们项目里翻了一下，发现大量使用 try-catch 来处理 async/await 异常，首先说明一下， try-catch 处理并没有什么问题，我只是觉得这么写代码会有点乱，感觉代码逻辑像是断层了一样，不易理解；

其次是代码冗余问题，单个 try-catch 就占了好几行代码，如果每个请求的地方都添加 try-catch，就会显得代码很臃肿。 而对于这种大量相同的冗余代码，完全可以用一种通用的函数来替代。

![image](https://github.com/MrSeaWave/blogs/assets/21967852/e4df266a-38d8-4390-9d03-50a9ae419cc0)

## 拓展边界

### 去过很多地方，看过很多美景，旅行的意义在哪里？

https://www.bilibili.com/video/BV1Fk4y1j79c/

### joshuto

https://github.com/kamiyaa/joshuto

https://www.bilibili.com/video/BV1Zo4y1G7QZ/?vd_source=340c3fc924b0c4be6baa9bb2af1224a9

它是 ranger 的 Rust 替代品，终端下的 vim-inspired 文件管理器。

### lazygit

https://github.com/jesseduffield/lazygit

用最高效的工具，学会 Git 最强的功能 —— 命令行神器 Lazygit

## 小结

如果你喜欢每周菜谱，请转发给你的朋友，告诉他们来这里进行订阅~

订阅地址：https://mrseawave.github.io/blogs/

每周菜谱，让你做饭更开心~
