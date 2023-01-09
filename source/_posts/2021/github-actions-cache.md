---
title: GitHub Actions 如何使用缓存
author: Sea
toc: true
date: 2021-12-17 13:31:17
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/qq8Lk4_bg2019091201.jpeg
tags: [GitHub, Actions, Workflow, CI/CD, Cache]
categories: [技术]
---

## 前言

在之前的文章中 《{% post_link start-github-actions github-actions入门 %}》《 {% post_link github-actions-auto-publish 如何使用Github Action 自动 lerna publish %} 》中，介绍了 Github Actions 的一些用法，其中在构建过程中，会安装很多第三方依赖，而这些依赖会很耗时，因此可以考虑是否有优化的空间，并不需要每次都重新下载，而是可以将这些依赖缓存起来，加快构建速度。

这里专门开一篇文章，来记录 Github Actions 的缓存优化相关的知识。

<!--more-->

## Cache

在构建过程中，进行缓存，加快构建速度。

主要使用[action/cache](https://github.com/actions/cache)。

### 原理

缓存大致原理就是把目标路径打包存储下来，并记录一个唯一 key。

下次启动时，根据 key 去查找。找到了就再按路径解压开。

### 缓存大小限制

注意缓存有大小限制。对于免费用户，单个包不能超过 500MB，整个仓库的缓存不能超过 2G。

### 缓存运作流程

该`action`主要包含三个属性：

- **path: 需要缓存的文件的路径**
- **key: 对缓存的文件指定的唯一表示**
- **restore-key: 当 key 没有命中缓存时，用于恢复缓存 key 值的有序列表**

下面以`node`项目为例，将`node_modules`缓存起来。

这里只列出关键步骤：

```yml
steps:
  - name: Cache node_modules
    id: cache-node-modules
    uses: actions/cache@v2
    with:
      path: node_modules
      key: ${{ runner.os }}-${{ matrix.node-version }}-nodeModules-${{ hashFiles('package-lock.json') }}-${{ hashFiles('package.json') }}
      restore-keys: |
        ${{ runner.os }}-${{ matrix.node-version }}-nodeModules-

  - name: Install dependencies 📦️
    if: steps.cache-node-modules.outputs.cache-hit != 'true'
    run: npm install
```

首先使用`action/cache`指定`path`和`key`；

这里的`key`包含 OS 信息、node 版本 和 `package-lock.json和package.json`文件的 hash 值，通常 OS 是固定下来的；

而一旦使用了新的第三方库，`package-lock.json & package.json`的 hash 值就会改变，得到一个新的`key`；

`action/cache`会抛出一个`cache-hit`的输出，如果找到对应`key`的缓存，值为`true`。

在随后的安装步骤中，可以使用`if`对`cache-hit`做判断。如果找到缓存就跳过，否则就安装依赖。

在第一次运行时，cache 找不到，执行`npm install`，在随后的 post cache 步骤中对`node_modules`做缓存。

![image-20211217135331062](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/3irwj2_image-20211217135331062.png)

第二次运行时，找到 cache, 则跳过`npm install`，直接使用缓存：

![image-20211217135404888](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/PxvEpK_image-20211217135404888.png)

更多使用请参考[官网](https://docs.github.com/en/actions/advanced-guides/caching-dependencies-to-speed-up-workflows) & [actions/cache](https://github.com/actions/cache) & [Cache node - npm](https://github.com/actions/cache/blob/main/examples.md#node---npm)

## 参考链接

- [Caching dependencies to speed up workflows](https://docs.github.com/en/actions/advanced-guides/caching-dependencies-to-speed-up-workflows)
- [Cache Examples](https://github.com/actions/cache/blob/main/examples.md#node---lerna)
- [Qt 使用 github-Actions 缓存优化](https://zhuanlan.zhihu.com/p/95945405)
- [Github Actions 总结](https://jasonkayzk.github.io/2020/08/28/Github-Actions%E6%80%BB%E7%BB%93/)
