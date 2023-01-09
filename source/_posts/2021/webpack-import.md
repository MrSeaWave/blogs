---
title: webpack import() 动态加载模块踩坑
author: Sea
toc: true
date: 2021-06-23 16:09:42
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/gMY9Re_wenjun-lin-asset.jpg
tags: [Webpack]
categories: [技术]
---

本文是关于 webpack 中使用 import 时的踩坑记录。

<!--more-->

webpack 根据 ES2015 loader 规范实现了用于动态加载的`import()`方法。

这个功能可以实现按需加载我们的代码，并且使用了`promise`式的回调，获取加载的包。

在代码中所有被`import()`的模块，都将打成一个单独的包，放在`chunk`存储的目录下。在浏览器运行到这一行代码时，就会自动请求这个资源，实现异步加载。

demo 如下：

```js
  import('lodash').then((_) => {
    // Do something with lodash (a.k.a '_')...
  });
}
```

可以看到，`import()`的语法十分简单。该函数只接受一个参数，就是引用包的地址，这个地址与 es6 的 import 以及 CommonJS 的 require 语法用到的地址完全一致。可以实现无缝切换。

然而在开发时为了偷懒省事，很喜欢封装部分插件：(这里使用了`react-loadable`来简化组件的懒加载封装)

```js
const LazyLoad = (path) => {
  return Loadable({
    loader: () => import(path),
    loading: Loading,
  });
};

const B = LazyLoad('./b.js');
```

然后开心的在代码中写上`LazyLoad('./pages/xxx')`。果不其然，挂了，收获了报错：

![image-20210623161751500](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/lLDrNU_image-20210623161751500.png)

这是因为 webpack 编译的时候 import 预发，**不支持动态路径!!!**因为 webpack 需要先扫一遍 js 文件，找出里面按需加载的部分，进行按需打包，但不会关心内部的 js 执行上下文，也就是说，在 webpack 扫描的时候，js 中的变量并不会计算出结果，所以 import 不支持动态路径。

如：

```js
import('./app'+path+'/util') => /^\.\/app.*\/util$/
```

> import 参数中的所有变量，都会被替换为【.\*】，而 webpack 就根据这个正则，查找所有符合条件的包，将其作为 package 进行打包。具体可查看[官方](https://webpack.docschina.org/api/module-methods/#dynamic-expressions-in-import)

因此，如果我们直接传入一个变量，webpack 就会把 (整个电脑的包都打包进来) 认为你在逗他，并且抛出一个 WARNING: `Critical dependency: the request of a dependency is an expression。`

所以 import 的正确姿势，应该是`尽可能静态化表达包所处的路径，最小化变量控制的区域`。

如我们要引用一堆页面组件，可以使用`import('./pages/'+ComponentName)`，这样就可以实现引用的封装，同时也避免打包多余的内容。

另外一个影响功能封装的点，是`import()`中的`相对路径`，是`import`语句所在文件的相对路径，所以进一步封装 import 时会出现一些麻烦。

因为`import`语句中的路径会在编译后被处理成`webpack`命令执行目录的相对路径。

所以：

既然 import 不能搞，那只能封装非 import 的部分：

```js
const LazyLoad = (loader) =>
  Loadable({
    loader,
    loading: Loading,
  });

const B = LazyLoad(() => import('./b.js'));
const C = LazyLoad(() => import('./c.js'));
```

## 参考文档

- [webpack](https://webpack.js.org/api/module-methods/#import)
- [脑阔疼的 webpack 按需加载](https://juejin.cn/post/6844903718387875847#heading-27)
- [webpack import() 动态加载模块踩坑](https://segmentfault.com/a/1190000015648036)
