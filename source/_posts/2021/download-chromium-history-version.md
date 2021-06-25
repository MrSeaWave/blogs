---
title: 谷歌浏览器历史版本下载
author: Sea
toc: true
date: 2021-04-06 10:41:56
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/GkcsTA_image-20210406112204323.png
tags: [download, chrome, chromium, history]
categories: [chrome]
---

本文将介绍谷歌浏览器历史版本如何下载及其代码仓库原理介绍。

<!--more-->

打开网页 https://mrseawave.github.io/chromium-history-page/ ，选择对应的 OS，与 version 点击进行下载即可。

- 网页源码：https://github.com/MrSeaWave/chromium-history-page
- dataSource：https://github.com/MrSeaWave/chromium-history-dataSource
- crawler(BASE): https://github.com/MrSeaWave/chromium-history-crawler

## 原理介绍

`crawler` 仓库代码解析

### Step_1

寻找所有的 version&&version 对应的 position

```bash getPositionByVersion
$ node ./src/getPositionByVersion.js
```

[`versionUrl`](https://chromium.googlesource.com/chromium/src/+refs) + [`versionPositionUrl`](https://omahaproxy.appspot.com/deps.json?version=])====>生成 `all-version.json`, `version-position.json`

- `versionUrl` ：爬虫获取所有 version
- `versionPositionUrl`: 通过指定的 version 获取特定的 position

`all-version.json`:

```json all-version.json
[
  "90.0.4399.1",
  "90.0.4399.0",
  "90.0.4398.1",
  "90.0.4398.0"
  // ...
]
```

`version-position.json`:

```json version-position.json
{
  "90.0.4399.1": "846615",
  "90.0.4399.0": "846615",
  "90.0.4398.1": "846545",
  "90.0.4398.0": "846545"
  // ...
}
```

### Step_2

寻找不同 os 对应的 position：`position/position-Mac.json` etc.

```bash getPositionWithOsList
$ node ./src/getPositionWithOsList.js
```

[`positionUrl`](<https://www.googleapis.com/storage/v1/b/chromium-browser-snapshots/o?delimiter=/&prefix=Mac/&fields=items(kind,mediaLink,metadata,name,size,updated),kind,prefixes,nextPageToken>)====>`position/position-Mac.json`

`position-Mac.json`:

```json position-Mac.json
[
  "15734",
  "15749",
  "15839",
  "15942"
  // ...
]
```

### Step_3

结合`step_1`与`step_2`的数据生成最终文件：`ver-pos-os/version-position-Mac.json`

```bash verPosOsGen.js
$  node ./src/verPosOsGen
```

`version-position.json` && `position/position-os.json` ===> `ver-pos-os/version-position-Mac.json` etc.

`ver-pos-os.json`:

```json ver-pos-os.json
{
  "90.0.4398.1": "846545",
  "90.0.4398.0": "846545",
  "90.0.4396.2": "845872",
  "90.0.4396.1": "845872"
  // ...
}
```

#### json steps

```bash json-steps
all-version.json -> version-position.json ->
                                              -> ver-pos-[os].json
                       position-[os].json ->
```

### Step_4

- 数据存储：将上述`steps`中生成的`json`文件夹下的数据复制到[`chromium-history-dataSource`](https://github.com/MrSeaWave/chromium-history-dataSource)仓库中，留作备份。

- 网页发布：将`ver-pos-os/version-position-Mac.json`复制到前端代码仓库:[chromium-history-page](https://github.com/MrSeaWave/chromium-history-page) `public`文件夹下，并且发布前端代码至`chromium-history-page`的`gh-pages`分支上

至此打开[网页](https://mrseawave.github.io/chromium-history-page/)即可看到谷歌浏览器的历史版本。🚀🚀🚀

## 参考链接

- 仓库代码参考：[chromium-history-version-crawler](https://github.com/vikyd/chromium-history-version-crawler)
