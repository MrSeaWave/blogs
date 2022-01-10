---
title: 阅读 install-pkg 源码
author: Sea
toc: true
date: 2022-01-08 17:00:28
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/pLHqhA_inhyuk-lee-1.jpg
tags: [ install-pkg, analysis ]
categories: [ analysis ]

---

本文是在看到 [《Vue团队核心成员开发的39行小工具 install-pkg 安装包，值得一学！》](https://github.com/lxchuan12/install-pkg-analysis) 文章后，对 [@antfu/install-pkg](https://github.com/antfu/install-pkg#readme) 进行的一次源码阅读。

<!--more-->

## install-pkg 介绍

> Install package programmatically. Detect package managers automatically (`npm`, `yarn` and `pnpm`).

自动检测包管理器（npm、yarn 和 pnpm）来编程式安装包依赖。

```bash
npm i @antfu/install-pkg
```

```ts
import { installPackage } from '@antfu/install-pkg'

await installPackage('vite', { silent: true })
```

## 源码

### 入口文件 `src/index.ts`

导出所有

```ts
export * from './detect'
export * from './install'
```

### install.ts installPackage 安装包

支持指定包管理器，支持安装多个依赖，支持额外的参数。

```ts
import execa from 'execa'
import { detectPackageManager } from '.'

export interface InstallPackageOptions {
  cwd?: string
  dev?: boolean
  silent?: boolean
  packageManager?: string
  preferOffline?: boolean
  additionalArgs?: string[]
}

export async function installPackage(names: string | string[], options: InstallPackageOptions = {}) {
  // 包管理器
  const agent = options.packageManager || await detectPackageManager(options.cwd) || 'npm'
  if (!Array.isArray(names))
    names = [names]

  // 额外的依赖
  const args = options.additionalArgs || []

  if (options.preferOffline)
    args.unshift('--prefer-offline')

  return execa(
    agent,
    [
      agent === 'yarn'
        ? 'add'
        : 'install',
      options.dev ? '-D' : '',
      ...args,
      ...names,
    ].filter(Boolean),
    {
      stdio: options.silent ? 'ignore' : 'inherit',
      cwd: options.cwd,
    },
  )
}
```

上述代码最终执行类似如下脚本：

```shell
yarn add -D react react-dom
```

### detect.ts detectPackageManager 包探测器

根据当前的锁文件(yarn.lock or package-lock.json or pnpm-lock.yaml )判断是哪个包管理器

```ts
import path from 'path'
import findUp from 'find-up'

export type PackageManager = 'pnpm' | 'yarn' | 'npm'

const LOCKS: Record<string, PackageManager> = {
  'pnpm-lock.yaml': 'pnpm',
  'yarn.lock': 'yarn',
  'package-lock.json': 'npm',
}

// process.cwd()是 返回当前工作目录。如：调用node命令执行脚本时的目录。
export async function detectPackageManager(cwd = process.cwd()) {
  // 通过findUp 获取当前目录lock文件
  const result = await findUp(Object.keys(LOCKS), { cwd })
  const agent = (result ? LOCKS[path.basename(result)] : null)
  return agent
}

```

其中需要注意的一些node相关的知识：

- `process.cwd()`: 返回当前工作目录。如：调用node命令执行脚本时的目录。

- `__dirname`: 返回源代码所在的目录。

- `path.basename()`: 返回 path 的最后一部分

  ```js
  path.basename('/foo/bar/baz/asdf/quux.html');
  // 返回: 'quux.html'
  
  path.basename('/foo/bar/baz/asdf/quux.html', '.html');
  // 返回: 'quux'
  ```

其中[findUp](https://github.com/sindresorhus/find-up#readme)为查找文件路径：

```
/
└── Users
    └── sindresorhus
        ├── unicorn.png
        └── foo
            └── bar
                ├── baz
                └── example.js
```

```js
import path from 'node:path';
import {findUp, pathExists} from 'find-up';

console.log(await findUp('unicorn.png'));
//=> '/Users/sindresorhus/unicorn.png'

console.log(await findUp(['rainbow.png', 'unicorn.png']));
//=> '/Users/sindresorhus/unicorn.png'

console.log(await findUp(async directory => {
	const hasUnicorns = await pathExists(path.join(directory, 'unicorn.png'));
	return hasUnicorns && directory;
}, {type: 'directory'}));
//=> '/Users/sindresorhus'
```

所以在有`yarn.lock`文件的项目中，`detectPackageManager` 函数最终返回agent的是`yarn`。

至此，`install-pkg`的源码已经看完，可以总结原理为：

> 通过lock文件自动检测，确定使用哪一个包管理器（npm、yarn、pnpm），最终用 [execa](https://github.com/sindresorhus/execa) 执行类似如下的命令。
>
> ```
> yarn add -D react react-dom
> ```

看完源码，我们也可以看下 `package.json` 中的 `scripts` 命令，学习一下。

## package.json script 解析

```json
 "scripts": {
    "prepublishOnly": "nr build",
    "dev": "nr build --watch",
    "start": "esno src/index.ts",
    "build": "tsup src/index.ts --format cjs,esm --dts --no-splitting",
    "release": "bumpp --commit --push --tag && pnpm publish",
    "lint": "eslint \"{src,test}/**/*.ts\"",
    "lint:fix": "nr lint -- --fix"
  }
```

### nr? ----> ni 神器

[github ni](https://github.com/antfu/ni)

推荐看[尤雨溪推荐神器 ni ，能替代 npm/yarn/pnpm ？简单好用！源码揭秘！](https://juejin.cn/post/7023910122770399269)

可以自动根据锁文件 `yarn.lock / pnpm-lock.yaml / package-lock.json` 检测使用 `yarn / pnpm / npm` 的包管理器。

例子：

nr 交互式选择脚本

```
nr
# 交互式选择脚本
# interactively select the script to run
# supports https://www.npmjs.com/package/npm-scripts-info convention

nr dev --port=3000

# npm run dev -- --port=3000
# yarn run dev --port=3000
# pnpm run dev -- --port=3000
```

nci - clean install

```
nci
# npm ci
# 简单说就是不更新锁文件
# yarn install --frozen-lockfile
# pnpm install --frozen-lockfile
```

等

### esno

[github esno](https://github.com/antfu/esno#readme)

![image-20220108162301182](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/anJQiD_image-20220108162301182.png)

源码不多，如下所示：

```js
#!/usr/bin/env node

const spawn = require('cross-spawn')
const spawnSync = spawn.sync

const register = require.resolve('esbuild-register')

const argv = process.argv.slice(2)

process.exit(spawnSync('node', ['-r', register, ...argv], { stdio: 'inherit' }).status)
```

[esbuild-register](https://github.com/egoist/esbuild-register) 简单说：使用 esbuild 即时传输 JSX、TypeScript 和 esnext 功能

[cross-spawn](https://www.npmjs.com/package/cross-spawn)：编写跨平台 spawn 语句，可参考[《用 Node 编写跨平台 spawn 语句》](https://mrseawave.github.io/blogs/articles/2022/01/08/cross-spawn)

### tsup

打包 `TypeScript` 库的最简单、最快的方法。

[tsup](https://github.com/egoist/tsup#readme)

### bumpp 交互式提升版本号

[bumpp](https://github.com/antfu/bumpp)

[version-bump-prompt](https://github.com/JS-DevTools/version-bump-prompt)

交互式 CLI 可增加您的版本号等

![Screenshot](https://camo.githubusercontent.com/e75f4a7630271317458584eb70fb0ce5d3f62cf88623e20e0f983c697a742ac7/68747470733a2f2f6a73746f6f6c732e6465762f76657273696f6e2d62756d702d70726f6d70742f696d672f73637265656e73686f742e676966)

## 总结

最后，在 [install-pkg](https://github.com/gs-analysis/install-pkg) 上可查看本篇源码文章~

## 参考链接

- [Vue团队核心成员开发的39行小工具 install-pkg 安装包，值得一学！](
