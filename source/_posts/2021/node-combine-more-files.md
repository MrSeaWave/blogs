---
title: Nodejs 中基于 Stream 的多文件合并实现
author: Sea
toc: true
date: 2021-12-30 09:31:23
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/nhPVsc_min-yum-pastel.jpg
tags: [node, stream, combine]
categories: [node]
---

最近在做关于[node 端的上传文件](https://github.com/LackZero/rocket-upload-server)时，碰到一个问题，如何将多个文件合并至一个文件呢？（前端上传的切割文件在服务端进行合并）

<!--more-->

## 单文件合并的 Stream 操作

将`'./test1.txt'`写入`'./test2.txt'`中，

创建一个可读流 readable 一个可写流 writeable，通过管道 pipe 将可写流绑定到可读流，一个简单的 Stream 操作就完成了，运行代码就会发现，`'./test1.txt'`已经写入至`'./test2.txt'`

```js
const fs = require('fs');

// 创建文件流
const readable = fs.createReadStream('./test1.txt');
// 创建写入流
const writeable = fs.createWriteStream('./test2.txt');
// 数据写入文件
readable.pipe(writeable);
```

其中[`pipe`](http://nodejs.cn/api/stream.html#readablepipedestination-options) 这个方法有两个参数：

```
readable.pipe(destination[, options])
```

- destination：写入数据的目标，是一个可写流对象，也就是一个数据写入的目标对象，例如，上面我们创建的 writeable 就是一个可写流对象

- options：
  - end：当读取结束时结束写入。 **默认值:** `true`。

**默认情况下我们是不需要手动调用写入流 writeable 的 end 方法进行关闭**。

如果我们设置 `pipe 中 end 为 false` 时， 写入的目标流将会一直处于打开状态， 此时就需要监听可读流的 end 事件，结束之后手动调用可写流的 end 事件。

```js
// 数据写入文件
// readable.pipe(writeable);

readable.pipe(writeable, {
  end: false,
});
readable.on('end', () => {
  // 关闭流之前立即写入最后一个额外的数据块
  writeable.end('写入结束');
});
```

> 注意：**如果可读流期间发生什么错误，则写入的目标流将不会关闭**，例如：process.stderr 和 process.stdout 可写流在 Nodejs 进程退出前将永远不会关闭，所以**需要监听错误事件，手动关闭可写流，防止内存泄漏**。

## 多个文件通过 Stream 操作合并为一个文件

利用**可读流的 pipe 中 end 为 false ，保持写入流一直处于打开状态。一开始可写流处于打开状态，直到所有的可读流结束，我们再将可写流给关闭。**

代码如下：

```js
const { createReadStream, readdirSync, createWriteStream } = require('fs');
const path = require('path');

/**
 * @desc 多个文件通过Stream合并为一个文件
 * 设置可读流的 end 为 false 可保持写入流一直处于打开状态，不自动关闭
 * 直到所有的可读流结束，再将可写流给关闭。
 * @param {object[]} fileList
 * @param {string} fileList.filePath 待合并的文件路径
 * @param {WriteStream} fileWriteStream 可写入文件的流
 * @returns {*}
 */
function streamMergeRecursive(fileList, fileWriteStream) {
  if (!fileList.length) {
    console.log('-------- WriteStream 合并完成 --------');
    // 最后关闭可写流，防止内存泄漏
    // 关闭流之前立即写入最后一个额外的数据块(Stream 合并完成)。
    fileWriteStream.end('---Stream 合并完成---');
    return;
  }
  const data = fileList.shift();
  const { filePath: chunkFilePath } = data;
  console.log('-------- 开始合并 --------\n', chunkFilePath);
  // 获取当前的可读流
  const currentReadStream = createReadStream(chunkFilePath);
  // 监听currentReadStream的on('data'),将读取到的内容调用fileWriteStream.write方法
  // end:true 读取结束时终止写入流,设置 end 为 false 写入的目标流(fileWriteStream)将会一直处于打开状态，不自动关闭
  currentReadStream.pipe(fileWriteStream, { end: false });
  // 监听可读流的 end 事件，结束之后递归合并下一个文件 或者 手动调用可写流的 end 事件
  currentReadStream.on('end', () => {
    console.log('-------- 结束合并 --------\n', chunkFilePath);
    streamMergeRecursive(fileList, fileWriteStream);
  });

  // 监听错误事件，关闭可写流，防止内存泄漏
  currentReadStream.on('error', (error) => {
    console.error('-------- WriteStream 合并失败 --------\n', error);
    fileWriteStream.close();
  });
}

/**
 * @desc 合并文件入口
 * @param {string} sourceFiles 源文件目录
 * @param {string} targetFile 目标文件
 */
function streamMergeMain(sourceFiles, targetFile) {
  // 获取源文件目录(sourceFiles)下的所有文件
  const chunkFilesDir = path.resolve(__dirname, sourceFiles);
  const list = readdirSync(chunkFilesDir);
  const fileList = list.map((name) => ({
    name,
    filePath: path.resolve(chunkFilesDir, name),
  }));

  // 创建一个可写流
  const fileWriteStream = createWriteStream(path.resolve(__dirname, targetFile));

  streamMergeRecursive(fileList, fileWriteStream);
}

streamMergeMain('./chunkFiles', './targetFile.png');
```

![image-20211230102050007](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/5Pj5bf_image-20211230102050007.png)

运行代码后生成指定文件`targetFile.png`

![image-20211230102152714](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/ZpJiA1_image-20211230102152714.png)

## 参考链接

- [createReadStream](http://nodejs.cn/api/fs.html#fscreatereadstreampath-options)
- [createWriteStream](http://nodejs.cn/api/fs.html#fscreatewritestreampath-options)
- [readable.pipe(destination[, options])](http://nodejs.cn/api/stream.html#class-streamreadable)
- [使用 koa-body 实现文件上传下载](https://blog.csdn.net/meifannao789456/article/details/88662840)
- [Node.js Stream 流的使用及实现总结](https://juejin.cn/post/6844903615232999431#heading-10)
- [Nodejs 中基于 Stream 的多文件合并实现](https://zhuanlan.zhihu.com/p/131627741)
