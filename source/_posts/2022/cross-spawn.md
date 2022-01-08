---
title: 用 Node 编写跨平台 spawn 语句
author: Sea
toc: true
date: 2022-01-08 16:30:01
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/X4kA0A_alejandro-burdisio-congurbano-manchines-hell-s-chori-s-artstation.jpg
tags: [node, cross, spawn]
categories: [node]
---

本文将会讲述如何跨平台来使用`spawn`语句呢？（可以利用[cross-spawn](https://www.npmjs.com/package/cross-spawn)

<!--more-->

## spawn

当我们想要在`js`文件中想要调用系统上的命令时，可以利用 Node.js 的子进程（`child_process`）模块下的 `spawn` 函数，（与`exec`区别可以查看[issue](https://github.com/MrSeaWave/interview/issues/111)，本文不作介绍），如在 Linux, macOS 等系统上，我们可以执行：

```js
const spawn = require('child_process').spawn;

spawn('npm', {
  stdio: 'inherit',
});
```

来调用 `npm` 命令。

然而，同样的语句在 Windows 上执行则会报错：

```bash
Error: spawn npm ENOENT
    at exports._errnoException (util.js:855:11)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:178:32)
    at onErrorNT (internal/child_process.js:344:16)
    at nextTickCallbackWith2Args (node.js:455:9)
    at process._tickCallback (node.js:369:17)
    at Function.Module.runMain (module.js:432:11)
    at startup (node.js:141:18)
    at node.js:980:3
```

因为在 Windows 上，当我们执行 `npm` 时，实际执行的是 `npm.cmd` 批处理，而在 Windows 上，`.cmd`, `.bat` 批处理是无法脱离 `cmd.exe` 这一解释器而单独运行的。

因此，需要显式地调用 `cmd`

```js
spawn('cmd', ['/c', 'npm'], {
  stdio: 'inherit',
});
```

或者使用在调用 `spawn` 函数时，设置 `shell` 选项为 `true` 以隐式地调用 `cmd` （该选项[添加](https://github.com/nodejs/node/commit/c3bb4b1aa5e907d489619fb43d233c3336bfc03d)自 Node.js v6 版本）

```js
spawn('npm', {
  stdio: 'inherit',
  shell: true,
});
```

另外，虽然在 Linux, macOS 等系统上不需要设置 `shell` 选项，命令也能够正常执行；设置 `shell` 为 `true` 也不会妨碍命令的执行，只是会额外的产生一个本不必要的 shell 进程，影响性能。

因此，如果想要编写跨平台的 spawn 命令，而又不想增加额外的开销的话，可以加个判断：

```js
const process = require('process');
const { spawn } = require('child_process');

spawn('npm', {
  stdio: 'inherit',
  // 仅在当前运行环境为 Windows 时，才使用 shell
  shell: process.platform === 'win32',
});
```

## cross-spawn

利用 [cross-spawn](https://www.npmjs.com/package/cross-spawn) 轻松编写跨平台命令，使用该模块，在调用 `spawn` 函数时，它会自动根据当前的运行平台，来决定是否生成一个 `shell` 来执行所给的命令。

如：

```js
const spawn = require('cross-spawn');

spawn('npm', {
  stdio: 'inherit',
});
```

## 参考链接

- [child_process.spawn](http://nodejs.cn/api/child_process.html#child_processspawncommand-args-options)
- [cross-spawn](https://www.npmjs.com/package/cross-spawn)
- [Node.js 编写跨平台 spawn 语句](https://zzz.buzz/zh/2017/02/11/node-js-cross-platform-spawn/)
