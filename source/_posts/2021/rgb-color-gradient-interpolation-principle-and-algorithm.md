---
title: RGB颜色插值渐变原理
author: Sea
toc: true
date: 2021-06-11 16:18:10
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/C1EAax_baptiste-boutie-floating-house-high.jpg
tags: [RGB, CSS, Color]
categories: [技术]
---

本文将要讲述 RGB 颜色插值渐变原理及其实现。

<!--more-->

其实 RGB 颜色变换的原理就是线性插值。

例如将颜色`RGB(0,0,0)`变换为`RGB(255,255,255)`，其中要输出 100 次结果，则增加量就是`(255-0)/100`，将`RGB`分开计算也是一样。

同理，`RGB(100,200,150)`变换为`RGB(255,0,255)`，增加量的计算如下:

```js
R = (255 - 100) / 100 = 1.55;
G = (0 - 200) / 100 = -2;
B = (255 - 150) / 100 = 1.05;
```

这 100 个片段是有关增加量的递归结果，将片段连续播放，就形成了动画。

下面是一个用`HTML5+JavaScript`实现的 RGB 颜色插值渐变动画，在线[DEMO](https://codepen.io/mrseawave/pen/zYZmxpj)

代码如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>RGB Color Interpolation Gradient</title>
    <style>
      body > * {
        margin: 0 auto;
        width: 300px;
      }
      div {
        height: 300px;
        background-color: rgb(0, 0, 0);
      }
      input {
        display: block;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <div></div>
    <p>R(<span>0</span>):<input type="range" id="red" min="0" max="255" value="0" /></p>
    <p>G(<span>0</span>):<input type="range" id="green" min="0" max="255" value="0" /></p>
    <p>B(<span>0</span>):<input type="range" id="blue" min="0" max="255" value="0" /></p>
    <p>To RGB:<input type="text" value="255,255,255" /><button>Animation</button></p>
    <script>
      NodeList.prototype.forEach = Array.prototype.forEach;
      let rgb = [0, 0, 0];

      let div = document.querySelector('div');
      let inputs = document.querySelectorAll("input[type='range']");
      let toRGB = document.querySelector("input[type='text']");
      let button = document.querySelector('button');

      let red = inputs[0];
      let green = inputs[1];
      let blue = inputs[2];

      let lock = false;

      function change(i) {
        let span = inputs[i].parentElement.querySelector('span');

        return function (e) {
          let value;
          if (e) {
            value = parseInt(e.target.value);
            span.innerHTML = value;
            rgb[i] = value;
          } else {
            value = parseInt(inputs[i].value);
            span.innerHTML = value;
          }
          div.style.backgroundColor =
            'rgb(' + Math.round(rgb[0]) + ',' + Math.round(rgb[1]) + ',' + Math.round(rgb[2]) + ')';
        };
      }

      let redChange = change(0);
      let greenChange = change(1);
      let blueChange = change(2);

      red.addEventListener('change', redChange);
      green.addEventListener('change', greenChange);
      blue.addEventListener('change', blueChange);

      button.addEventListener('click', function () {
        if (lock) {
          return;
        }

        let finalValue = toRGB.value;
        let patternRGB =
          /^(([0-9])|([1-9]\d)|(1[0-9]{2})|(2[0-4][0-9])|(25[0-5]))[,](([0-9])|([1-9]\d)|(1[0-9]{2})|(2[0-4][0-9])|(25[0-5]))[,](([0-9])|([1-9]\d)|(1[0-9]{2})|(2[0-4][0-9])|(25[0-5]))$/;

        if (!patternRGB.test(finalValue)) {
          alert('Format is not correct, you should enter a value like 255,255,255');
          return;
        }

        finalValue = finalValue.split(',');
        let rf = finalValue[0];
        let gf = finalValue[1];
        let bf = finalValue[2];

        lock = true;
        red.disabled = true;
        green.disabled = true;
        blue.disabled = true;

        rgb[0] = Math.round(rgb[0]);
        rgb[1] = Math.round(rgb[1]);
        rgb[2] = Math.round(rgb[2]);

        let r = rgb[0];
        let g = rgb[1];
        let b = rgb[2];
        let ri = (rf - r) / 100;
        let gi = (gf - g) / 100;
        let bi = (bf - b) / 100;
        setTimeout(function (i) {
          i = i || 1;
          rgb[0] += ri;
          rgb[1] += gi;
          rgb[2] += bi;
          red.value = rgb[0];
          green.value = rgb[1];
          blue.value = rgb[2];
          redChange();
          greenChange();
          blueChange();
          if (i < 100) {
            let f = arguments.callee;
            setTimeout(function () {
              f(i + 1);
            }, 50);
          } else {
            lock = false;
            red.disabled = false;
            green.disabled = false;
            blue.disabled = false;
          }
        }, 0);
      });
    </script>
  </body>
</html>
```
