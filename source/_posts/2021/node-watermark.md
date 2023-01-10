---
title: node 端生成水印图片
author: Sea
toc: true
date: 2021-07-13 10:13:32
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/tSFpeW_kontorn-boonyanate-screenshot006.jpg
tags: [Node, Image, Watermark]
categories: [技术]
---

在项目中通常会出现给图片增加水印的需求，本文将介绍如何在使用 node 时处理图片，增加水印功能。

<!--more-->

> 文字和图片不能直接合并，需要将文字先转换成图形，然后再将图形进行合并，大致步骤如下：
>
> 1. 利用[`text-to-svg`](https://www.npmjs.com/package/text-to-svg)，将文字转成 SVG 图形；
> 2. 利用[`sharp`](https://www.npmjs.com/package/sharp)，将 SVG 图形与背景图片合并；

## 生成水印图片

将文字转换为 SVG 图形，需要借助 Node 的模块`text-to-svg`，该模块能够将文字按照指定字体生成 SVG 图形

代码如下：

```js
/**
 * @desc 将水印文字转换成 svg，再转换成buffer
 * @param {string} text 水印文字
 * @param {number} fontSize 字体大小
 * @param {string} color 字体颜色
 * @return {Buffer}
 */
function text2SVG({ text, fontSize = 72, color = 'rgba(204,204,204,0.45)' }) {
  // 加载字体文件
  const text2SVG = Text2SVG.loadSync(path.resolve(__dirname, '../../assets/PingFang-SC-Regular.ttf'));
  const options = {
    fontSize,
    anchor: 'top', // 坐标中的对象锚点
    attributes: { fill: color }, // 文字颜色
  };
  const textSVG = text2SVG.getSVG(text, options);
  return Buffer.from(textSVG);
}
```

这时候生成的水印图片是平行文字：

![image-20210713102456900](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/RabNGs_image-20210713102456900.png)

我们需要旋转 45 度后的图片：

![image-20210713102642050](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/YFDrAZ_image-20210713102642050.png)

代码如下：

```js
/**
 * @desc 水印图片旋转45度倾斜
 * @param {string} text 水印文字
 * @return {Promise<Buffer|*>}
 */
async function rotateWatermarkBuffer(text) {
  // `  ${text}  ` 增加下文字间距
  const textBuffer = text2SVG({ text: `  ${text}  ` });
  return sharp(textBuffer)
    .rotate(45, { background: { r: 255, g: 255, b: 255, alpha: 0 } }) // 旋转45度，并且透明色
    .toBuffer();
}
```

## 合并图形

用于合并图片的库有很多，比如`gm、jimp、mapnik、sharp`等，其中`sharp`是基于`libvips`库来实现的，性能是最高的，所以采用了 sharp 来合并图形。

```js
/**
 * @desc 入口文件
 * @param  {string|Buffer} img 图片本地路径或图片 Buffer 数据
 * @param {string} text 水印文字
 * @param {string} filepath 保存合成水印后的文件路径
 * @return {Promise<Object>}
 */
async function init({ img, text, filepath }) {
  const textBuffer = await rotateWatermarkBuffer(text);
  const imgInfo = await sharp(img)
    // 重复（tile）合并图像
    .composite([{ input: textBuffer, tile: true }])
    .toFile(filepath);
  return imgInfo;
}
```

最终代码如下：

```js
const path = require('path');
const sharp = require('sharp');
const Text2SVG = require('text-to-svg');

async function nodeGenWatermark({ img, text, filepath }) {
  /**
   * @desc 将水印文字转换成 svg，再转换成buffer
   * @param {string} text 水印文字
   * @param {number} fontSize 字体大小
   * @param {string} color 字体颜色
   * @return {Buffer}
   */
  function text2SVG({ text, fontSize = 72, color = 'rgba(204,204,204,0.45)' }) {
    const fontPath = path.resolve(__dirname, '../../assets/PingFang-SC-Regular.ttf');
    // 加载字体文件
    const text2SVG = Text2SVG.loadSync(fontPath);
    const options = {
      fontSize,
      anchor: 'top', // 坐标中的对象锚点
      attributes: { fill: color }, // 文字颜色
    };
    const textSVG = text2SVG.getSVG(text, options);
    return Buffer.from(textSVG);
  }

  /**
   * @desc 水印图片旋转45度倾斜
   * @param {string} text 水印文字
   * @return {Promise<Buffer|*>}
   */
  async function rotateWatermarkBuffer(text) {
    // `  ${text}  ` 增加下文字间距
    const textBuffer = text2SVG({ text: `  ${text}  ` });
    return sharp(textBuffer)
      .rotate(45, { background: { r: 255, g: 255, b: 255, alpha: 0 } }) // 旋转45度，并且透明色
      .toBuffer();
  }

  /**
   * @desc 入口文件
   * @param  {string|Buffer} img 图片本地路径或图片 Buffer 数据
   * @param {string} text 水印文字
   * @param {string} filepath 保存合成水印后的文件路径
   * @return {Promise<Object>}
   */
  async function init({ img, text, filepath }) {
    const textBuffer = await rotateWatermarkBuffer(text);
    const imgInfo = await sharp(img)
      // 重复（tile）合并图像
      .composite([{ input: textBuffer, tile: true }])
      .toFile(filepath);
    return imgInfo;
  }

  await init({ img, text, filepath });
}

nodeGenWatermark({
  img: path.resolve(__dirname, '../../assets/chrome.png'),
  text: '水印',
  filepath: path.resolve(__dirname, '../../assets/output.png'),
});
```

至此，我们就实现了一个简单的给图片加水印的功能，让我们看看生成效果：

![output](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/BJTifX_output.png)

## 参考链接

- [sharp](https://www.npmjs.com/package/sharp)
- [text-to-svg](https://www.npmjs.com/package/text-to-svg)
- [sharp 使用文档](https://www.iqi360.com/p/sharp-cn/docs/5f8b012a5a726a40e3f0f02e)
- [node 文字生成图片](https://juejin.cn/post/6844904013079543822)

- [Node.js 服务端图片处理利器——sharp 进阶操作指南](https://segmentfault.com/a/1190000015066797)
