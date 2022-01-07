---
title: G2 多图形图例问题
author: Sea
toc: true
date: 2022-01-07 13:48:34
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/7mlvQj_A_wo_LToatmbwAAAAAAAAAAABkARQnAQ.png
tags: [G2, legend]
categories: [G2]
---

谨以此文记录下如何利用 G2 在同一个坐标系内绘制多图时使用图例问题。如无特殊说明，当前 G2 版本为：`4.1.37`

<!--more-->

数据如下：

```js
const data = [
  {
    time: '9:00-10:00',
    value: 30,
    value2: 30,
  },
  {
    time: '10:00-11:00',
    value: 90,
    value2: 20,
  },
  {
    time: '11:00-12:00',
    value: 50,
    value2: 40,
  },
  {
    time: '12:00-13:00',
    value: 30,
    value2: 50,
  },
];
```

利用上述数据绘制出：

![2022-01-07 13.54.04](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/juQJ7F_2022-01-07%2013.54.04.gif)

## 利用 G2 Geometry 的 color 属性

配置 color 通道映射规则。`field` 参与颜色映射的数据字段，具体查看[官网](https://g2.antv.vision/zh/docs/api/general/geometry#geomcolor)

首先将源数据改为如下

```js
const originData = [
  {
    time: '9:00-10:00',
    value: 30,
    value2: 30,
  },
  {
    time: '10:00-11:00',
    value: 90,
    value2: 20,
  },
  {
    time: '11:00-12:00',
    value: 50,
    value2: 40,
  },
  {
    time: '12:00-13:00',
    value: 30,
    value2: 50,
  },
];

const data1 = [];
const data2 = [];
originData.forEach((item) => {
  const { time, value, value2 } = item;
  data1.push({ time, value, type: '销售额Custom' });
  data2.push({ time, value2, type2: '销售额Line' });
});

const data = [...data1, ...data2];

// data [
//   { time: '9:00-10:00', value: 30, type: '销售额Custom' },
//   { time: '10:00-11:00', value: 90, type: '销售额Custom' },
//   { time: '11:00-12:00', value: 50, type: '销售额Custom' },
//   { time: '12:00-13:00', value: 30, type: '销售额Custom' },
//   { time: '9:00-10:00', value2: 30, type2: '销售额Line' },
//   { time: '10:00-11:00', value2: 20, type2: '销售额Line' },
//   { time: '11:00-12:00', value2: 40, type2: '销售额Line' },
//   { time: '12:00-13:00', value2: 50, type2: '销售额Line' }
// ]
```

完整代码如下：

```js
import { Chart } from '@antv/g2';

const originData = [
  {
    time: '9:00-10:00',
    value: 30,
    value2: 30,
  },
  {
    time: '10:00-11:00',
    value: 90,
    value2: 20,
  },
  {
    time: '11:00-12:00',
    value: 50,
    value2: 40,
  },
  {
    time: '12:00-13:00',
    value: 30,
    value2: 50,
  },
];

const data1 = [];
const data2 = [];
originData.forEach((item) => {
  const { time, value, value2 } = item;
  data1.push({ time, value, type: '销售额Custom' });
  data2.push({ time, value2, type2: '销售额Line' });
});

const data = [...data1, ...data2];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding: 'auto',
});
chart.data(data);
chart.scale('value', {
  alias: '销售额(万)',
  nice: true,
});
chart.scale('value2', {
  alias: '销售额(万)',
  nice: true,
});
chart.axis('time', {
  tickLine: null,
});
chart.axis('value2', {
  // 坐标系网格不展示
  grid: null,
});

chart.tooltip({
  showMarkers: false,
});
// 有图例是因为按照type来画图，为了让图例在同一水平线上
chart.legend('type', {
  position: 'bottom',
  maxWidth: 100,
  offsetY: -30,
  offsetX: 100,
});
chart.legend('type2', {
  position: 'bottom',
  maxWidth: 100,
});

chart.interaction('active-region');
chart.removeInteraction('legend-filter');
chart.interaction('legend-visible-filter');

// color 使用不同的field的颜色
chart.interval().position('time*value').color('type', '#2194ff');
chart.line().position('time*value2').color('type2', '#fdae6b');

chart.tooltip({
  // 合并当前点对应的所有数据并展示
  shared: true,
});

chart.render();
```

## 使用自定义图例

在利用上述方式时，图例在下面位置只能纵向排列，比较难受，因此产生如下方法，使用[自定义图例](https://g2.antv.vision/zh/docs/api/general/legend#legendoptioncustom)

### 点击图例时利用 chart.filter

点击图例后设置数据筛选规则，去过滤数据，相关文档查看[官网](https://g2.antv.vision/zh/docs/api/general/chart/#viewfilter)

首先同样改造数据：

```js
const originData = [
  {
    time: '9:00-10:00',
    value: 30,
    value2: 30,
  },
  {
    time: '10:00-11:00',
    value: 90,
    value2: 20,
  },
  {
    time: '11:00-12:00',
    value: 50,
    value2: 40,
  },
  {
    time: '12:00-13:00',
    value: 30,
    value2: 50,
  },
];

const data1 = [];
const data2 = [];
originData.forEach((item) => {
  const { time, value, value2 } = item;
  data1.push({ time, value, type: '销售额Custom' });
  data2.push({ time, value2, type2: '销售额Line' });
});

const data = [...data1, ...data2];

// data [
//   { time: '9:00-10:00', value: 30, type: '销售额Custom' },
//   { time: '10:00-11:00', value: 90, type: '销售额Custom' },
//   { time: '11:00-12:00', value: 50, type: '销售额Custom' },
//   { time: '12:00-13:00', value: 30, type: '销售额Custom' },
//   { time: '9:00-10:00', value2: 30, type2: '销售额Line' },
//   { time: '10:00-11:00', value2: 20, type2: '销售额Line' },
//   { time: '11:00-12:00', value2: 40, type2: '销售额Line' },
//   { time: '12:00-13:00', value2: 50, type2: '销售额Line' }
// ]
```

完整代码如下：

```js
import { Chart } from '@antv/g2';

const originData = [
  {
    time: '9:00-10:00',
    value: 30,
    value2: 30,
  },
  {
    time: '10:00-11:00',
    value: 90,
    value2: 20,
  },
  {
    time: '11:00-12:00',
    value: 50,
    value2: 40,
  },
  {
    time: '12:00-13:00',
    value: 30,
    value2: 50,
  },
];

const data1 = [];
const data2 = [];
originData.forEach((item) => {
  const { time, value, value2 } = item;
  data1.push({ time, value, type: '销售额Custom' });
  data2.push({ time, value2, type2: '销售额Line' });
});

const data = [...data1, ...data2];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding: 'auto',
});
chart.data(data);
chart.scale('value', {
  alias: '销售额(万)',
  nice: true,
});
chart.scale('value2', {
  alias: '销售额(万)',
  nice: true,
});
chart.axis('time', {
  tickLine: null,
});
chart.axis('value2', {
  // 坐标系网格不展示
  grid: null,
});

chart.tooltip({
  showMarkers: false,
});
// 自定义图例，为了让图例横向
chart.legend({
  custom: true,
  items: [
    {
      value: 'value',
      name: '销售额Custom',
      marker: { symbol: 'square', style: { fill: '#3182bd', r: 5 } },
    },
    {
      value: 'value2',
      name: '销售额line',
      marker: {
        symbol: 'hyphen',
        style: { stroke: '#fdae6b', r: 5, lineWidth: 3 },
      },
    },
  ],
});

// 监听图例点击事件
chart.on('legend-item:click', (ev) => {
  const target = ev.target;
  const delegateObject = target.get('delegateObject');
  // 当前图例的数据
  const item = delegateObject.item;
  console.log('item', item);
  // 遍历所有图例，获取当前点击后依然展示的图例：
  let showLegend = [];
  for (let i = 0; i < delegateObject.legend.get('items').length; i++) {
    if (!delegateObject.legend.get('items')[i].unchecked) {
      showLegend.push(delegateObject.legend.get('items')[i].value);
    }
  }
  showLegend = [...showLegend];
  console.log('showLegend', showLegend);
  console.log('filed item.value', item.value);
  // 针对当前的filed,从原始数据data中过滤出有效数据
  chart.filter(item.value, (value) => {
    if (value === undefined) {
      return true;
    } else {
      return showLegend.includes(item.value);
    }
  });
  // 一下更新chart方法都可以
  // console.log("data", data);
  // chart.changeData(data);
  chart.render(true);
});

chart.interaction('active-region');
// 使用自带的过滤交互，unchecked会被设定为true
// chart.removeInteraction("legend-filter");
// chart.interaction("legend-visible-filter");

chart.interval().position('time*value').color('type', '#2194ff');
chart.line().position('time*value2').color('type2', '#fdae6b');

chart.tooltip({
  // 合并当前点对应的所有数据并展示
  shared: true,
});

chart.render();
```

### 点击图例时利用 chart.changeVisible()

上述都是要先改造数据利用 color，那能否直接使用原生数据呢？

答案是可以的，我们可以利用`chart.changeVisible()`来显示或隐藏图表。具体查看[官网](https://g2.antv.vision/zh/docs/api/general/chart/#chartchangevisible)

完整代码如下：

```js
import { Chart } from '@antv/g2';

const data = [
  {
    time: '9:00-10:00',
    value: 30,
    value2: 30,
  },
  {
    time: '10:00-11:00',
    value: 90,
    value2: 20,
  },
  {
    time: '11:00-12:00',
    value: 50,
    value2: 40,
  },
  {
    time: '12:00-13:00',
    value: 30,
    value2: 50,
  },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding: 'auto',
});
chart.data(data);
chart.scale('value', {
  alias: '销售额(万)',
  nice: true,
});
chart.scale('value2', {
  alias: '销售额(万)',
  nice: true,
});
chart.axis('time', {
  tickLine: null,
});

chart.tooltip({
  showMarkers: false,
});
// 自定义图例
chart.legend({
  custom: true,
  items: [
    {
      value: 'value',
      name: '销售额Custom',
      marker: { symbol: 'square', style: { fill: '#3182bd', r: 5 } },
    },
    {
      value: 'value2',
      name: '销售额line',
      marker: {
        symbol: 'hyphen',
        style: { stroke: '#fdae6b', r: 5, lineWidth: 3 },
      },
    },
  ],
});

chart.on('legend-item:click', (ev) => {
  const target = ev.target;
  const delegateObject = target.get('delegateObject');
  const item = delegateObject.item;
  console.log('item', item);
  console.log('filed item.value', item.value);
  // 获取当前图表
  const currentGeometry = chart.geometries.find((w: any) => {
    return w.getAttribute('position').getFields()[1] === item.value;
  });
  if (currentGeometry) {
    // 更改图展示状态
    currentGeometry.changeVisible(!currentGeometry.visible);
  }
});

chart.interaction('active-region');
// 使用自带的过滤交互，unchecked会被设定为true
// chart.removeInteraction("legend-filter");
// chart.interaction("legend-visible-filter");

chart.interval().position('time*value').color('#2194ff');
chart.line().position('time*value2').color('#fdae6b');

chart.tooltip({
  // 合并当前点对应的所有数据并展示
  shared: true,
});

chart.render();
```

### 全部手控，包括图例的点击状态

在上几个代码中我们可以发现在图例交互时都是使用原生的[legend-filter](https://g2.antv.vision/zh/docs/api/general/interaction#legend-filter)交互，每次点击后`delegateObject.item.unchecked`都已经被修改。在此我们可以自定义交互，靠我们自己去手动修改`unchecked`的状态，依此可以干出很多事（例如最后一个图例时点击无效等

首先我们需要注册下自己的交互：

```js
import { Chart, registerInteraction } from '@antv/g2';

// 白嫖图例点击时的手势
registerInteraction('chart-custom-legend-filter', {
  showEnable: [
    { trigger: 'legend-item:mouseenter', action: 'cursor:pointer' },
    { trigger: 'legend-item:mouseleave', action: 'cursor:default' },
  ],
  start: [
    // { trigger: 'legend-item:click', action: 'list-unchecked:toggle' },
    // { trigger: 'legend-item:click', action: 'data-filter:filter' },
  ],
});
```

完整代码如下：

```js
import { Chart, registerInteraction } from '@antv/g2';

// 白嫖图例点击时的手势
registerInteraction('chart-custom-legend-filter', {
  showEnable: [
    { trigger: 'legend-item:mouseenter', action: 'cursor:pointer' },
    { trigger: 'legend-item:mouseleave', action: 'cursor:default' },
  ],
  start: [
    // { trigger: 'legend-item:click', action: 'list-unchecked:toggle' },
    // { trigger: 'legend-item:click', action: 'data-filter:filter' },
  ],
});

const data = [
  {
    time: '9:00-10:00',
    value: 30,
    value2: 30,
  },
  {
    time: '10:00-11:00',
    value: 90,
    value2: 20,
  },
  {
    time: '11:00-12:00',
    value: 50,
    value2: 40,
  },
  {
    time: '12:00-13:00',
    value: 30,
    value2: 50,
  },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding: 'auto',
});
chart.data(data);
chart.scale('value', {
  alias: '销售额(万)',
  nice: true,
});
chart.scale('value2', {
  alias: '销售额(万)',
  nice: true,
});
chart.axis('time', {
  tickLine: null,
});
chart.axis('value2', {
  // 坐标系网格不展示
  grid: null,
});

chart.tooltip({
  showMarkers: false,
});
// 自定义图例，为了让图例横向
chart.legend({
  custom: true,
  items: [
    {
      value: 'value',
      name: '销售额Custom',
      marker: { symbol: 'square', style: { fill: '#3182bd', r: 5 } },
    },
    {
      value: 'value2',
      name: '销售额line',
      marker: {
        symbol: 'hyphen',
        style: { stroke: '#fdae6b', r: 5, lineWidth: 3 },
      },
    },
  ],
});

chart.on('legend-item:click', (ev) => {
  const target = ev.target;
  const delegateObject = target.get('delegateObject');
  const item = delegateObject.item;
  const originUnchecked = item.unchecked;
  console.log('originUnchecked', originUnchecked);
  console.log('item', item);
  console.log('filed item.value', item.value);
  // 获取当前图表
  const currentGeometry = chart.geometries.find((w: any) => {
    return w.getAttribute('position').getFields()[1] === item.value;
  });
  if (currentGeometry) {
    // 更改图展示状态
    currentGeometry.changeVisible(!currentGeometry.visible);
  }
  // 更改图例状态
  delegateObject.item.unchecked = !originUnchecked;
  // 触发更新流程
  chart.render(true);
});

chart.interaction('active-region');
// 自定义图例，移除默认的分类图例筛选交互，使用自定义图例
chart.removeInteraction('legend-filter');
chart.interaction('chart-custom-legend-filter');

chart.interval().position('time*value').color('#2194ff');
chart.line().position('time*value2').color('#fdae6b');

chart.tooltip({
  // 合并当前点对应的所有数据并展示
  shared: true,
});

chart.render();
```

以下是上述代码运行实际状态：（如果想要看不同文件的绘制，请更换 `package.json` 中的 `main` 对应的值）

<iframe src="https://codesandbox.io/embed/g2-tu-li-zi-ding-yi-ming-zi-f4h38?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="G2 图例自定义名字"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## 参考链接

- [G2 legend](https://g2.antv.vision/zh/docs/api/general/legend)
- [G2 Geometry](https://g2.antv.vision/zh/docs/api/general/geometry)
- [G2 Interaction](https://g2.antv.vision/zh/docs/api/general/interaction)
