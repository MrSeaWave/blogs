---
title: 优化puppeteer
author: Sea
toc: true
date: 2021-07-05 10:05:31
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/pkrgHH_bruce-yu-wewew.jpg
tags: [puppeteer, optimize]
categories: [puppeteer]
---

本文将讲述如何优化`puppeteer`

<!--more-->

## 什么是 puppeteer

> Puppeteer 是一个 Node 库，它提供了高级 API 来通过 DevTools 协议控制 Chromium 或 Chrome。

通过[Puppeteer](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)我们可以编写脚本模拟浏览器的相关行为，实现以下功能：

- 网页截图并保存为图片或 pdf 。
- 模拟表单提交，键盘输入，按钮点击，滑块移动等 dom 操作。
- 实现 UI 的自动化测试。
- 作为抓包工区对网页性能进行调试和分析。
- 编写定制化爬虫，解决传统 HTTP 抓取 SPA 页面难以处理异步请求的问题。

## 为什么要优化

随着最近项目进度的复杂，项目在使用 Puppeteer 时遇到一些问题，这些问题包括：**经常卡住，运行慢、卡，浏览器关不掉，CPU 和 内存 经常是满载运行的，特别是 CPU ，经常是 99% 的使用率。**

Chromium 消耗最多的资源是 CPU，一是渲染需要大量计算，二是 Dom 的解析与渲染在不同的进程，进程间切换会给 CPU 造成压力（进程多了之后特别明显）。

其次消耗最多的是内存，Chromium 是以多进程的方式运行，一个页面会生成一个进程，一个进程占用 30M 左右的内存，大致估算 1000 个请求占用 30G 内存，在并发高的时候内存瓶颈最先显现。

优化最终会落在内存和 CPU 上（所有软件的优化最终都要落到这里），通常来说因为并发造成的瓶颈需要优化内存，计算速度慢的问题要优化 CPU。

## 优化点

### 优化 Chromium 启动项

1. 如果将 Dom 解析和渲染放到同一进程，肯定能提升时间（进程上下文切换的时间）。对应的配置是 `single-process`
2. 部分功能 disable 掉，比如 [GPU](https://cloud.tencent.com/product/gpu?from=10680)、Sandbox、插件等，减少内存的使用和相关计算。

代码如下：

```js
const browser = await puppeteer.launch({
  headless: true, // 以 无头模式（隐藏浏览器界面）运行浏览器
  args: [
    '--disable-gpu', // GPU硬件加速
    '--disable-dev-shm-usage', // 创建临时文件共享内存
    '--disable-setuid-sandbox', // uid沙盒
    '--no-first-run', // 没有设置首页。在启动的时候，就会打开一个空白页面。
    '--no-sandbox', // 沙盒模式
    '--no-zygote',
    '--single-process', // 单进程运行
  ],
});
```

### 复用 browser

每次请求都启动 Chromium，再打开 tab 页，请求结束后再关闭 tab 页与浏览器。

流程大致如下：

**请求到达 -> 启动 Chromium -> 打开 tab 页 -> 运行代码 -> 关闭 tab 页 -> 关闭 Chromium -> 返回数据**

真正运行代码的只是 tab 页面，理论上启动一个 Chromium 程序能运行成千上万的 tab 页，可不可以复用 Chromium 只打开一个 tab 页然后关闭呢？

当然是可以的。

> Puppeteer 提供了 `puppeteer.connect()` 方法，可以连接到当前打开的浏览器。而且`puppeteer.connect`比`puppeteer.launch`启动一个浏览器实例要快很多（[参考](https://stackoverflow.com/questions/52431775/whats-the-performance-difference-of-puppeteer-launch-versus-puppeteer-connect))

流程如下：

**请求到达 -> 连接 Chromium -> 打开 tab 页 -> 运行代码 -> 关闭 tab 页 -> 返回数据**

代码如下：

```js
// 使用缓存wsEndpoint
const wsEndpoint = this.wsEndpoint;
let browser;
try {
  browser = !wsEndpoint
    ? await puppeteer.launch(config)
    : await puppeteer.connect({
        browserWSEndpoint: this.wsEndpoint,
      });
} catch (err) {
  browser = await puppeteer.launch(config);
} finally {
  // 缓存wsEndpoint
  this.wsEndpoint = browser.wsEndpoint();
}
```

在进一步优化是在程序启动时，初始化一定数量的无头浏览器，并保存 `WSEndpoint `列表，当收到请求时，通过随机数做简单的[负载均衡](https://cloud.tencent.com/product/clb?from=10680)（利用多核特性）。

代码如下：

```js
const config = {
  headless: true,
  args: [
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-setuid-sandbox',
    '--no-first-run',
    '--no-sandbox',
    '--no-zygote',
    '--single-process',
  ],
};
const MAX_WSE = 4; // 启动几个浏览器
const WSE_LIST = []; // 存储browserWSEndpoint列表
init();

// 初始化
function init() {
  (async () => {
    for (let i = 0; i < MAX_WSE; i++) {
      const browser = await puppeteer.launch(config);
      WSE_LIST[i] = await browser.wsEndpoint();
    }
  })();
}

// 使用场景
app.get('/', function (req, res) {
  const tmp = Math.floor(Math.random() * MAX_WSE);
  (async () => {
    const browserWSEndpoint = WSE_LIST[tmp];
    const browser = await puppeteer.connect({ browserWSEndpoint });
    const page = await browser.newPage();
    await page.goto('http://example.com');
    await page.screenshot({ path: 'example.png' });
    await page.close();
    res.send('Hello World!');
  })();
});
```

最终代码如下：

```js
/**
 * @desc Puppeteer 实例
 * 请求到达 -> 连接 Chromium -> 打开 tab 页 -> 运行代码 -> 关闭 tab 页 -> 返回数据
 * */
import puppeteer from 'puppeteer';

class PuppeteerHelper {
  constructor() {
    this.instance = null;
    // 启动4个浏览器
    this.MAX_WSE = 4;
    // 存储browser.WSEndpoint列表
    this.WSE_LIST = [];
    // puppeteer 配置
    this.p_config = {
      headless: true, // 以 无头模式（隐藏浏览器界面）运行浏览器
      args: [
        '--disable-gpu', // GPU硬件加速
        '--disable-dev-shm-usage', // 创建临时文件共享内存
        '--disable-setuid-sandbox', // uid沙盒
        '--no-first-run', // 没有设置首页。在启动的时候，就会打开一个空白页面。
        '--no-sandbox', // 沙盒模式
        '--no-zygote',
        '--single-process', // 单进程运行
      ],
    };

    // 初始化
    this._init();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new PuppeteerHelper();
    }
    return this.instance;
  }

  // 初始化
  /**
   * @desc 初始化
   * 使用puppeteer.connect比puppeteer.launch启动一个浏览器实例要快很多
   * https://stackoverflow.com/questions/52431775/whats-the-performance-difference-of-puppeteer-launch-versus-puppeteer-connect
   * 当开启多个browser实例时，可以通过缓存wsEndpoint来达到复用的目的
   * */
  _init() {
    (async () => {
      console.log('【PuppeteerHelper】puppeteer config:', this.p_config);
      for (let i = 0; i < this.MAX_WSE; i++) {
        // 先通过 puppeteer.launch() 创建一个浏览器实例 Browser 对象
        const browser = await puppeteer.launch(this.p_config);
        // 存储浏览器 websocket 的地址
        this.WSE_LIST[i] = await browser.wsEndpoint();
      }
      console.log('【PuppeteerHelper】WSE_LIST：', this.WSE_LIST);
    })();
  }

  /**
   * @desc 提供浏览器实例
   * */
  async _currentBrowser() {
    // 通过随机数做简单的负载均衡,确定使用的第几台浏览器
    const tmp = Math.floor(Math.random() * this.MAX_WSE);
    const browserWSEndpoint = this.WSE_LIST[tmp];
    console.log('【PuppeteerHelper】当前使用浏览器编号：%s ，wsEndpoint：%s', tmp, browserWSEndpoint);

    let browser;
    try {
      // 使用节点来重新建立连接
      browser = await puppeteer.connect({ browserWSEndpoint });
    } catch (err) {
      // 连接失败重新创建新的浏览器实例
      browser = await puppeteer.launch(this.p_config);
      this.WSE_LIST[tmp] = browser.wsEndpoint();
      console.log(
        '【PuppeteerHelper】当前使用浏览器编号：%s 连接失败，创建新实例，新的wsEndpoint：%s',
        tmp,
        this.WSE_LIST[tmp]
      );
      console.log('【PuppeteerHelper】WSE_LIST：', this.WSE_LIST);
    }
    return browser;
  }

  /**
   * @desc 截图
   * @param {string} url 网址链接
   * @param {number} width 可视区域宽度，截图设定fullPage,可滚动，因此此设定可能对截图无意义
   * @param {number} height 可视区域高度，截图设定fullPage,可滚动，因此此设定暂时对截图无意义
   * */
  async screenshot({ url, width = 800, height = 600 }) {
    // 获得可以使用的一台浏览器
    const browser = await this._currentBrowser();
    // 然后通过 Browser 对象创建页面 Page 对象
    const page = await browser.newPage();
    // 设置可视区域大小,默认的页面大小为800x600分辨率
    await page.setViewport({ width, height });
    // 然后 page.goto() 跳转到指定的页面
    await page.goto(url, {
      // 不再有网络连接时触发（至少500毫秒后）,认为页面跳转完成
      waitUtil: 'networkidle0',
    });
    // 在浏览器环境中执行函数, 获取页面的宽度和高度
    const documentSize = await page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.body.clientHeight,
      };
    });
    // 调用 page.screenshot() 对页面进行截图
    const picture = await page.screenshot({
      // 截图保存路径
      path: './example.png',
      fullPage: true,
      // clip: {
      //   x: 0,
      //   y: 0,
      //   height: documentSize.height,
      //   width: documentSize.width
      // }
    });

    // 关闭当前页面,减少内存的占用。
    await page.close();

    return picture;
  }
}

export default PuppeteerHelper.getInstance();
```

使用 tab 方式渲染后请求速度提升了 200ms 左右，一个 tab 进程使用内存降到 20M 以内，带来的收益也非常可观。

不过这里要注意，官方并不建议这样做，**因为一个 tab 页阻塞或者内存泄露会导致整个浏览器阻塞并 Crash**。万全的解决办法是定期重启程序，**当请求 1000 次或者内存超过限制后重启对应的进程**。

### 过滤请求

当我们使用`puppeteer`对页面异步渲染的`dom结构`进行解析时，往往需要等待页面完成渲染完成之后，才能使用脚本进行操作。但页面渲染过程中也包含了许多静态资源如：图片/音频/视频/样式文件等。此时我们可以通过`page.setRequestInterception`方法，对网页请求进行过滤，拦截静态资源的请求，加快页面渲染速度。

代码如下：

```js
// 开启请求拦截功能
await page.setRequestInterception(true);

page.on('request', (req) => {
  // 根据请求类型过滤
  const resourceType = req.resourceType();
  if (resourceType === 'image') {
    req.abort();
  } else {
    req.continue();
  }
});
```

推荐拦截的请求类型：

```js
const blockedResourceTypes = ['image', 'media', 'font', 'texttrack', 'object', 'beacon', 'csp_report', 'imageset'];

const skippedResources = [
  'quantserve',
  'adzerk',
  'doubleclick',
  'adition',
  'exelator',
  'sharethrough',
  'cdn.api.twitter',
  'google-analytics',
  'googletagmanager',
  'google',
  'fontawesome',
  'facebook',
  'analytics',
  'optimizely',
  'clicktale',
  'mixpanel',
  'zedo',
  'clicksor',
  'tiqcdn',
];
```

### 代理请求

除了过滤请求之外，我们也可用代理网页渲染过程中发出的请求。在某些爬虫项目达到不被发爬的目的，

代码如下：

```js
page.on('request', async (req) => {
  // 代理请求
  const response = await fetch({
    url: req.url(),
    method: req.method(),
    headers: req.headers(),
    body: req.postData(),
    agent: new HttpProxyAgent(getProxyIp()),
  });
  // 响应请求
  req.respond({
    status: response.statusCode,
    contentType: response.headers['content-type'],
    headers: response.headers || req.headers(),
    body: response.body,
  });
});
```

## 参考链接

- [Puppeteer](https://zhaoqize.github.io/puppeteer-api-zh_CN/#/)

- [Puppeteer 自动化的性能优化与执行速度提升](https://cloud.tencent.com/developer/article/1673764)
- [puppeteer 优化小技巧](https://juejin.cn/post/6844903984101064717)
