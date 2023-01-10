---
title: 前端页面添加水印
author: Sea
toc: true
date: 2021-07-09 10:31:32
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/xATenx_long-zhang-sirius-longzhang.jpg
tags: [JS, Html, Watermark]
categories: [技术]
---

为防止信息泄露，给网页加水印是一种常见的方法。本篇文章将介绍一种添加明水印的方法。

<!--more-->

> 给页面指定标签添加水印背景，原理是 canvas 画图，canvas.toDataURL()转成 base64 数据，动态添加到标签的 background。

特点：

- 不影响现有代码
- 可以任意给网页的不同部分添加水印
- 纯前端 js 实现
- 可简单防止用户通过浏览器开发者工具隐藏水印

## 生成水印

### 生成水印单个图片

水印的特点是，包含一段标识信息，同时需要覆盖足够的区域，很自然想到可以用 background，指定`image`，并让它在`x,y` 2 个方向上重复展示。

用[canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)把信息画成图之后，调用`toDataURL()`方法就可以得到一个 url，该 url 实际包含了 Base64 过的图像信息，可以直接用在`background`上

代码示例如下：

```js
// 创建水印背景图片
function createImageUrl(options) {
  const canvas = document.createElement('canvas');
  const text = options.text;
  canvas.width = options.width;
  canvas.height = options.height;

  const ctx = canvas.getContext('2d');
  ctx.shadowOffsetX = 2; // X轴阴影距离，负值表示往上，正值表示往下
  ctx.shadowOffsetY = 2; // Y轴阴影距离，负值表示往左，正值表示往右
  ctx.shadowBlur = 2; // 阴影的模糊程度
  // ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';    //阴影颜色
  ctx.font = options.font;
  ctx.fillStyle = options.fontColor;
  ctx.rotate(options.rotateDegree);
  ctx.translate(options.translateX, options.translateY);
  ctx.textAlign = 'left';
  // 在 (x, y)位置填充实体文本
  ctx.fillText(text, 35, 32);
  return canvas.toDataURL('image/png');
}
```

### 设置背景

将上面得到的图片放在某个`div`的`background`上，这里需要注意的是：

- `position: fixed`: 这样可以保证不管内容如何滚动，水印都能显示；
- `pointer-events: none`: 阻止水印影响页面内容
- 动态计算出水印的位置

代码示例如下：

```js
// 将背景填充至指定水印位置处
function createContainer(options, forceCreate) {
  const oldDiv = document.getElementById(options.id);
  if (!forceCreate && oldDiv) return container;

  const url = createImageUrl(options);
  const div = oldDiv || document.createElement('div');
  div.id = options.id;

  // 水印容器的父元素，默认document.body
  let parentEl = options.preventTamper ? document.body : options.parentEl || document.body;

  if (typeof parentEl === 'string') {
    if (parentEl.startsWith('#')) parentEl = parentEl.substring(1);
    parentEl = document.getElementById(parentEl);
  }
  // 返回元素的大小及其相对于视口的位置。
  const rect = parentEl.getBoundingClientRect();
  // 默认：按照父元素的偏移位置
  options.style.left = (options.left || rect.left) + 'px';
  options.style.top = (options.top || rect.top) + 'px';

  div.style.cssText = getStyleText(options);
  div.setAttribute('class', '');
  div.style.background = 'url(' + url + ') repeat top left';

  !oldDiv && parentEl.appendChild(div);

  return div;
}
```

## 防止客户端篡改

截止到上面为止，水印可以正常显示了，但这样只能防止小白用户，稍微有点技术的用户就知道，可以用浏览器的开发者工具来动态更改`dom`，比如`display: none`；就可以隐藏水印；所以还需要加一点机制防止用户进行篡改；当然，从本质上来说是没有绝对的办法在客户端去防用户的，所以这里只是增加了用户篡改的难度。

### 1. 不间断比较 div 的值

监测水印 div 的变化，一旦发生变化，则重新生成水印。

记录刚生成的 div 的`innerHTML`，每隔几秒就取一次新的值，通过比较两者的`md5`，如果发生变化则重新生成。但这个方法有几个缺点：

- 滞后性，修改不能马上被监测后；而如果间隔时间过短，则可能影响性能；
- 生成`md5`也有不小的开销，特别是打开多个页面的时候；

所以这种方法不可行。

### 2. MutationObserver

使用浏览器提供的一种监测元素变化的 API：[MutationObserver](https://developer.mozilla.org/en/docs/Web/API/MutationObserver)

代码示例如下：

```js
// 监听元素
function observe(options, observeBody) {
  observeWatermark(options);
  observeBody && observeBodyElement(options);
}

// 监听水印
function observeWatermark(options) {
  const target = container;

  const childCallBack = () => {
    // 关闭上个观察，重新创建元素，重新观察
    observer.disconnect();
    container = createContainer(options, true);
    observer.observe(target, observeConfig);
  };

  observer = new MutationObserver(childCallBack);
  // 开始观察目标节点
  observer.observe(target, observeConfig);
}

// 监听body元素，如果水印element被删除，则重新创建&&重新监听
function observeBodyElement(options) {
  const callback = (mutations) => {
    mutations.forEach((m) => {
      if (m.type === 'childList' && m.removedNodes.length > 0) {
        let watermarkNodeRemoved = false;
        for (const n of m.removedNodes) {
          if (n.id === options.id) {
            watermarkNodeRemoved = true;
          }
        }

        if (watermarkNodeRemoved) {
          container = createContainer(options);
          observe(options, false);
        }
      }
    });
  };
  const pObserver = new MutationObserver(callback);
  pObserver.observe(document.body, { childList: true, subtree: true });
}
```

> MutationObserver 只能监测到诸如属性改变、增删子结点等，对于自己本身被删除，是没有办法的；这里通过同时监测父结点，看 div 是否被删除来解决这个问题的。

最终代码如下：

```js
// 默认配置
const defaultOption = {
  id: 'watermark-id',
  // parentEl: '',
  // 防止别人外界破坏
  preventTamper: false,
  // 水印单个图片配置
  width: 110,
  height: 80,
  text: 'watermark',
  font: '20px Times New Roman',
  fontColor: 'rgba(204,204,204,0.45)',
  // 顺时针旋转的弧度
  rotateDegree: (30 * Math.PI) / 180,
  // 平移变换
  translateX: 0,
  translateY: 0,
  // 水印容器的样式
  style: {
    'pointer-events': 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'fixed',
    'z-index': 1000,
  },
};

// 观察配置
const observeConfig = {
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true,
};

let container;
let observer;

// 创建水印背景图片
function createImageUrl(options) {
  const canvas = document.createElement('canvas');
  const text = options.text;
  canvas.width = options.width;
  canvas.height = options.height;

  const ctx = canvas.getContext('2d');
  ctx.shadowOffsetX = 2; // X轴阴影距离，负值表示往上，正值表示往下
  ctx.shadowOffsetY = 2; // Y轴阴影距离，负值表示往左，正值表示往右
  ctx.shadowBlur = 2; // 阴影的模糊程度
  // ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';    //阴影颜色
  ctx.font = options.font;
  ctx.fillStyle = options.fontColor;
  ctx.rotate(options.rotateDegree);
  ctx.translate(options.translateX, options.translateY);
  ctx.textAlign = 'left';
  // 在 (x, y)位置填充实体文本
  ctx.fillText(text, 35, 32);
  return canvas.toDataURL('image/png');
}

// 将背景填充至指定水印位置处
function createContainer(options, forceCreate) {
  const oldDiv = document.getElementById(options.id);
  if (!forceCreate && oldDiv) return container;

  const url = createImageUrl(options);
  const div = oldDiv || document.createElement('div');
  div.id = options.id;

  // 水印容器的父元素，默认document.body
  let parentEl = options.preventTamper ? document.body : options.parentEl || document.body;

  if (typeof parentEl === 'string') {
    if (parentEl.startsWith('#')) parentEl = parentEl.substring(1);
    parentEl = document.getElementById(parentEl);
  }
  // 返回元素的大小及其相对于视口的位置。
  const rect = parentEl.getBoundingClientRect();
  // 默认：按照父元素的偏移位置
  options.style.left = (options.left || rect.left) + 'px';
  options.style.top = (options.top || rect.top) + 'px';

  div.style.cssText = getStyleText(options);
  div.setAttribute('class', '');
  div.style.background = 'url(' + url + ') repeat top left';

  !oldDiv && parentEl.appendChild(div);

  return div;
}

// 获取配置中的style
function getStyleText(options) {
  let ret = '';
  const style = options.style;
  Object.keys(style).forEach((k) => {
    ret += k + ': ' + style[k] + ';';
  });
  return ret;
}

// 监听元素
function observe(options, observeBody) {
  observeWatermark(options);
  observeBody && observeBodyElement(options);
}

// 监听水印
function observeWatermark(options) {
  const target = container;

  const childCallBack = () => {
    // 关闭上个观察，重新创建元素，重新观察
    observer.disconnect();
    container = createContainer(options, true);
    observer.observe(target, observeConfig);
  };

  observer = new MutationObserver(childCallBack);
  // 开始观察目标节点
  observer.observe(target, observeConfig);
}

// 监听body元素，如果水印element被删除，则重新创建&&重新监听
function observeBodyElement(options) {
  const callback = (mutations) => {
    mutations.forEach((m) => {
      if (m.type === 'childList' && m.removedNodes.length > 0) {
        let watermarkNodeRemoved = false;
        for (const n of m.removedNodes) {
          if (n.id === options.id) {
            watermarkNodeRemoved = true;
          }
        }

        if (watermarkNodeRemoved) {
          container = createContainer(options);
          observe(options, false);
        }
      }
    });
  };
  const pObserver = new MutationObserver(callback);
  pObserver.observe(document.body, { childList: true, subtree: true });
}

// 入口函数
function init(options) {
  options = !options ? defaultOption : { ...defaultOption, ...options };
  container = createContainer(options);
  options.preventTamper && observe(options, true);
}

init({ preventTamper: true });
```

最终效果如下：

<iframe width="100%" height="300" src="//jsfiddle.net/FishWoo/Lrdcx8nm/25/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## 参考链接

- [前端页面动态添加水印](https://segmentfault.com/a/1190000038214932)

- [给网页加水印](https://leozcx.github.io/add-water-mark/)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)

- [MutationObserver](https://developer.mozilla.org/en/docs/Web/API/MutationObserver)
