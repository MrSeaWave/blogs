---
title: koa 静态资源处理
author: Sea
toc: true
date: 2021-07-15 09:57:01
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/HeqXUk_christophe-young-90.jpg
tags: [Koa, Static]
categories: [技术]
---

本文将介绍 koa 静态资源处理。

<!--more-->

如今有静态资源（`dist/index.html`）：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
    />
  </head>
  <body>
    <div id="root-slave-container">Hello World</div>
  </body>
</html>
```

和`dist/index.js`

```js
console.log('Hello World');
```

## koa-static

如果网站提供静态资源（图片、字体、样式表、脚本......），为它们一个个写路由就很麻烦，也没必要。[`koa-static`](https://www.npmjs.com/package/koa-static)模块封装了这部分的请求，起到了静态文件托管的作用。

示例代码如下：

```js
import Koa from 'koa';
import path from 'path';
import koaStatic from 'koa-static';

const app = new Koa();
app.use(koaStatic(path.resolve(__dirname, '../dist')));

app.listen(3000);
```

运行上述代码后访问`http://localhost:3000`，在浏览器上即可看到这个网址内容，默认加载`index.html`文件。

![image-20210715110325735](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/7X1b2J_image-20210715110325735.png)

访问`http://localhost:3000/index.js`

![image-20210715111451719](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/Ht0CpG_image-20210715111451719.png)

> Koa 会在静态资源目录下查找文件，所以不会把静态目录作为 URL 的一部分。

### 虚拟静态目录

如果要给静态资源文件创建一个虚拟的文件前缀(实际上文件系统中并不存在) ，可以使用`koa-mount`中间件指定一个虚拟的静态目录。

> [koa-mount](https://www.npmjs.com/package/koa-mount) 是一个将中间件挂载到指定路径的 Koa 中间件。它可以挂载任意 Koa 中间件.

语法如下：

```js
import koaMount from 'koa-mount';

app.use(koaMount('/koa-static', koaStatic(path.resolve(__dirname, '../dist'))));
```

访问`http://localhost:3000/koa-static`即可看到文件内容，

![image-20210715110717212](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/9YZp0K_image-20210715110717212.png)

访问`http://localhost:3000/koa-static/index.js`

![image-20210715111612551](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/SZFnFd_image-20210715111612551.png)

> 小 Tip：在部署打包好的 react 项目时，前端使用的是 HTML5 的 history，页面一刷新就 404 了，所以后端配置[koa-history-api-fallback](https://www.npmjs.com/package/koa-history-api-fallback)中间件来支持：（中间件实现的功能是如果 当 URL 匹配不到任何静态资源，返回指定的页面（中间件默认返回的是 index.html，配置参考[文档](https://www.npmjs.com/package/koa-history-api-fallback)）
>
> ```js
> import historyApiFallback from 'koa-history-api-fallback';
>
> // 加载路由信息
> app.use(router.routes());
> app.use(router.allowedMethods());
>
> app.use(historyApiFallback());
> app.use(koaStatic(path.resolve(__dirname, '../public')));
> ```
>
> historyApiFallback 一定要放在所有接口路由后面，否则所有接口都是返回 index.html 了。
> historyApiFallback 一定要在静态资源前面，否则资源找不到

## koa-static-cache

这个中间件的目的也是帮助我们托管静态资源文件。按照配置的路径在浏览器的 URL 地址中输入带`prefix`前缀的路径就能访问到 static 目录下的文件。和`koa-static`区别是：

![image-20210715112107970](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/kdLhPv_image-20210715112107970.png)

示例代码：

```js
import koaStaticCache from 'koa-static-cache';

app.use(
  koaStaticCache(path.resolve(__dirname, '../dist'), {
    prefix: '/koa-static', // 如果当前请求的url是以 /koa-static 开始，则作为静态资源请求
  })
);
```

当我们访问`http://localhost:3000/koa-static/index.html`，这个时候中间件就会将我们的请求代理到`dist`文件夹下的`index.html`，读取文件，自动识别 MIME 类型，然后进行响应。

![image-20210715112741146](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/KoBJcf_image-20210715112741146.png)

访问`http://localhost:3000/koa-static/index.js`

![image-20210715114541451](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/srkx12_image-20210715114541451.png)

## 参考链接

- [koa-static](https://www.npmjs.com/package/koa-static)
- [koa-mount](https://www.npmjs.com/package/koa-mount)
- [Koa : what is the difference between koa-route and koa-mount. When should I use each?](https://stackoverflow.com/questions/29892691/koa-what-is-the-difference-between-koa-route-and-koa-mount-when-should-i-use)
- [koa-static-cache](https://www.npmjs.com/package/koa-static-cache)
- [koa-history-api-fallback](https://www.npmjs.com/package/koa-history-api-fallback)

- [react+koa 实现登陆、聊天、留言板功能后台](https://blog.csdn.net/qq_37860930/article/details/90019812)
