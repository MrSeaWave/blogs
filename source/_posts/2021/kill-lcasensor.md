---
title: 如何杀死lcasensor进程
author: Sea
toc: true
date: 2021-04-16 17:13:04
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/uGWzme_Raphaelle_Maniere_11bis.jpeg
tags: [kill, lcasensor, dlp]
categories: [lcasensor]
---

本文讲述如何杀死 lcasensor（内网的监控软件，敏感数据监控）这个进程。

<!--more-->

一下操作均是在 MacOs 环境下运行。

### 1. 定位进程信息

```bash
$ ps aux |grep didi
```

找到 4 个相似进程：

- /opt/didi/lca/bin/lcasensor
- /opt/didi/lca/bin/lcaupdater
- /opt/didi/lca/bin/LCAService
- /opt/didi/lca/bin/lcaagent

### 2. 检查自动启动目录

- /Library/LaunchDaemons
- /Library/LaunchAgents
- ~/Library/LaunchAgents
- /System/Library/LaunchDaemons
- /System/Library/LaunchAgents

找到 4 份配置文件：

- /Library/LaunchAgents/com.didi.lca.lcaagent.plist
- /Library/LaunchDaemons/com.didi.lca.lcasensor.plist
- /Library/LaunchDaemons/com.didi.lca.lcaservice.plist
- /Library/LaunchDaemons/com.didi.lca.lcaupdater.plist

### 3. 修改自动启动选项

分别修改`com.didi.lca.*.plist`的内容，主要改下面 2 个地方。

请确认修改以后的效果是：`KeepAlive=false`，`RunAtLoad=false`

```text com.didi.lca.*.plist
     <key>KeepAlive</key>
     <false/>
     <key>RunAtLoad</key>
     <false/>
```

### 4. 重新启动电脑验证

检查一下进程信息，确认进程已经停止运行

```bash
$ ps aux |grep didi
```

删除上述提到的相关文件即可避免再次运行

```bash
$ sudo rm -rf /Library/LaunchAgents/com.didi.lca.*.plist
$ sudo rm -rf /Library/LaunchDaemons/com.didi.lca.*.plist
$ sudo rm -rf /opt/didi/lca
$ sudo rmdir /opt/didi
```

End! 🎉🎉🎉

### 参考链接

- [知乎](https://www.zhihu.com/question/366624364)
