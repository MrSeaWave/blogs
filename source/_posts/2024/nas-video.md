---
title: Nas 家庭影音的搭建
author: Sea
toc: true
date: 2024-11-02 09:26:26
cover: https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2024/1730511834277_awNIXu.png
tags: Nas
categories: ['Tools']
---

有了 nas 就会想如何搭建一套自己的本地影音系统，让自己想看就看，避免自己想看的资源被正版进行和谐 🐶，下面将会展开介绍如何搭建。

<!-- more -->

## 前提

可以学习此 [视频](https://www.bilibili.com/video/BV1fL411g72a) 了解基础概念。

<details>
  <summary>BT 与 PT 区别? </summary>
  <section>
PT 就是一个私有的下载站，你在下载的过程中也会帮别人下载（分享率）。 分享出去走的是宽带的上传。我为人人，人人为我，BT 就是公有的下载站，人人为我 🐶。

详细了解可以看

- [此篇文章](https://post.smzdm.com/p/a30q5l8d/)
- [PT 介绍](https://linux.do/t/topic/181768)
  </section>
</details>

## 搭建

古老方案有 `qBittorrent + Jackett + Radarr & Sonarr + ChineseSubFinder + Emby + Jellyseerr`，每个应用各司其职，搜索资源、下载种子、下载字幕等，最终实现自动化的观影。该途径因配置过于复杂，需要较强的动手能力。

网上部署教程有很多，见：

- [利用 NAS 实现全自动观影追剧](https://leishi.io/blog/posts/2021-12/home-nas-media-center/)
- [使用 Sonarr 搭建自动化追番系统 | Reorx’s Forge](https://reorx.com/blog/track-and-download-shows-automatically-with-sonarr/)

本文重点介绍我当前使用的一套方案：

== qBittorrent + MoviePilot + ChineseSubFinder + Emby ==

选片、下载、整理、刮削、观看一条龙应用，其资源核心为 PT

![1730513254953_RMkVTc](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2024/1730513254953_RMkVTc.png)

### 软件

1. [qBittorent](https://github.com/qbittorrent/qBittorrent)

   一个常用的 BT 下载器，同类的还有  [Transmission](https://transmissionbt.com/)。

1. [MoviePilot](https://github.com/jxxghp/MoviePilot)

   媒体库资源归集整理工具，替代了方案一的 Radarr & Sonarr，由国人开发对中文支持很好

1. [ChineseSubFinder](https://github.com/ChineseSubFinder/ChineseSubFinder)

   自动化中文字幕

1. [Emby](https://emby.media/)

   一款媒体服务器软件，可以方便地在家庭内的各种设备上观看您喜爱的电影、电视剧和其他视频内容。提供了解析资源文件/文件夹，利用 IMDB/TMDB/TVDB 等影视索引网站索引你的本地资源（即刮削），并播放的功能。同类的还有 [Jellyfin](https://jellyfin.org/)，[Plex](https://www.plex.tv/)，本地播放推荐 Kodi，苹果全家桶用户强烈推荐  [Infuse](https://firecore.com/infuse)（需要付费订阅但不贵，建议土区年付）

### 分析

这套方案优点：

1. 开源免费，版本迭代很快，有现成的群晖套件，部署相对简单
2. 对 PT 站非常友好，支持自动登录保号签到，聚合资源搜索匹配，支持限制做种时间
3. 专为中文环境优化，支持国产剧集和动漫，重命名和刮削准确率高，剧集分季符合国人习惯，支持细化分类，高质量文件自动覆盖
4. 支持与豆瓣联动，在豆瓣中标记想看后台自动检索下载，未出全的自动加入订阅，资源自动实时追新
5. 支持 ServerChan、微信、Telegram、Bark 等图文消息通知，符合国内网络环境，支持通过微信、Telegram 远程控制订阅和下载
6. 支持对接 Emby/Jellyfin/Plex，通知播放状态

### 部署

这套方案核心就是 Moviepilot，下面将会介绍如何配置 Moviepilot

## Moviepilot

索引 + 整理 + 刮削

![1729516867302_ruDJbU](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2024/1729516867302_ruDJbU.png)

### 安装

群晖套件一键式安装

### 配置

请先准备好 `认证站点`，否则装了也无法使用。

具体 `认证站点` 可参考官方仓库下 AUTH_SITE 的内容

- 请注意 `认证站点` 和 `支持站点` 并不相同。MoviePilot 支持管理的站点并不代表能够用来认证！！！
  ![1729603017127_YH07Nx](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2024/1729603017127_YH07Nx.png)

### 认证

1. 直接安装插件 IYUU 认证站点绑定插件，添加相关配置即可
2. iyuu 申请 token 后，其实并未激活，需要安装 [iyuuPlus](https://doc.iyuu.cn/guide/install-synology)，再找 iyuu 的合作站点激活（感觉在套娃！）

BTW，我这里使用的是[麒麟](https://www.hdkyl.in/)进行上面认证，但是迟迟认证不成功，因此选择直接在配置中添加认证站点的密钥&uid，简单高效~

![1730514701841_2cnRRu](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2024/1730514701841_2cnRRu.png)

#### 添加站点

认证完成后，可以使用 [CookieCloud](https://github.com/easychen/CookieCloud) 方式添加站点，方便快捷，按照官网介绍操作即可

### 目录

推荐进行如下配置

- 媒体数据目录（文件硬链接目录）：`/volume1/media/movie`
- qBittorrent 数据下载目录: `/volume1/media/downloads/qBittorrent/media/movie`

![1730514265410_csO3rd](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2024/1730514265410_csO3rd.png)

> 目录之间不能跨磁盘 & 共享文件夹，见 [官网](https://wiki.movie-pilot.org/install#:~:text=%E5%A6%82%E6%9E%9C%E4%BD%A0%E8%AE%A1%E5%88%92%E4%BD%BF%E7%94%A8%E7%A1%AC%E9%93%BE%E6%8E%A5%E6%9D%A5%E6%95%B4%E7%90%86%E6%96%87%E4%BB%B6%EF%BC%8C%E9%82%A3%E4%B9%88%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD%E7%9B%AE%E5%BD%95%E5%92%8C%E6%95%B4%E7%90%86%E5%90%8E%E7%9A%84%E5%AA%92%E4%BD%93%E5%BA%93%E7%9B%AE%E5%BD%95%E5%8F%AA%E8%83%BD%E6%98%A0%E5%B0%84%E4%B8%80%E4%B8%AA%E6%A0%B9%E7%9B%AE%E5%BD%95%E4%B8%8D%E8%83%BD%E5%88%86%E5%BC%80%E6%98%A0%E5%B0%84%EF%BC%8C%E5%90%A6%E5%88%99%E5%B0%86%E4%BC%9A%E5%AF%BC%E8%87%B4%E8%B7%A8%E7%9B%98%E6%97%A0%E6%B3%95%E7%A1%AC%E9%93%BE%E6%8E%A5%E3%80%82)

### 插件推荐

- 目录监控

  可以用来 == 整理非 MoviePilot 下载的资源 == ，比如说移动硬盘上的资源，手动用 qBittorrent 下载文件，流程图中的两种手动方式必备的插件

- 站点自动签到
- 清理硬链接
- ChineseSubFinder

  资源入库时通知 ChineseSubFinder 进行字幕下载，不装也可以，ChineseSubFinder 自动定时对媒体库的字幕查漏补缺

- 媒体库刮削

  定时对媒体库进行查漏补缺

## Emby

资源刮削完毕后，还是需要一个影音服务器对资源进行海报墙展示&播放，

![1730516036805_pWU3t2](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2024/1730516036805_pWU3t2.png)

### 为什么需要影音服务器

首先可以通过海报墙的方式查看资源，当然你也可以不进行配置，直接通过 smb 共享文件进行资源查看，但是这样的话海报墙效果不就等同于无了吗 🐶

#### 共享文件夹播放

![1729335958034_ygBraE](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2024/1729335958034_ygBraE.jpg)

优点

- 对 Nas 性能要求低，nas 只需要保证文件共享的能力大于需要播放视频的码率
- Nas 不对视频文件做任何处理，仅将源文件发送给播放设备
- 响应速度快

缺点

- 只能以源码率进行播放
- ==如果在外面进行连接会造成带宽和流量的问题==
- 播放设备无法对源码率进行解码（这种方式需要客户端解码

#### 基于影音服务器的影音分享

![1729336592977_gC26bK](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2024/1729336592977_gC26bK.jpg)

优点

- 可以有海报墙
- 如果客户端支持源码率，则可以以本地文件共享的方式进行播放，不会影响 nas 性能，如果客户端不支持，则会进行转码再推送。

更多可查看此 [视频](https://www.bilibili.com/video/BV1fL411g72a)

### 配置

媒体库 --> 电影

> 文件夹选择上文配置的媒体数据库: `/volume1/media/movie`

![1730516132912_FwiGOW](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2024/1730516132912_FwiGOW.png)

> 注: emby 自带刮削功能，也可以直接使用 moviepilot 的刮削，或者使用 [tmm](https://www.bilibili.com/video/BV1YWtyeVEUG) 手动去刮削

## ChineseSubFinder

emby 本身字幕下载用不了，因此推荐使用 [ChineseSubFinder](https://github.com/ChineseSubFinder/ChineseSubFinder)，使用方式见[视频](https://www.bilibili.com/video/BV1pe411U7x7/) 进行字幕下载或者手动下载字幕（字幕下载网站：https://subhd.tv/）, 手动加载的方式需要将字幕文件放到视频平级，并且需要字幕名称改成和电影源一样。（如：xxx.default.srt，PS：ass 字幕 emby web 版支持 [较差](https://www.v2ex.com/t/866088) )

以上配置好后，即可享受自己的家庭影音了，玩的愉快~

## PT 资源

### BT

| 网站          | 地址                                                   | 类型 |
| ------------- | ------------------------------------------------------ | ---- |
| 萌番组        | [https://bangumi.moe/](https://bangumi.moe/)           | 动漫 |
| 蜜柑计划      | [https://mikanani.me/](https://mikanani.me/)           | 动漫 |
| 动漫花园      | [https://dmhy.org/](https://dmhy.org/)                 | 动漫 |
| 漫猫动漫      | [http://www.comicat.org/](http://www.comicat.org/)     | 动漫 |
| ACG.RIP       | [https://acg.rip/](https://acg.rip/)                   | 动漫 |
| Nyaa.si       | [https://nyaa.si/](https://nyaa.si/)                   | 动漫 |
| EZTV          | [https://eztv.re/](https://eztv.re/)                   | 综合 |
| RARBG         | [https://rargb.to/](https://rargb.to/)                 | 综合 |
| 海盗湾        | [https://thepiratebay.org/](https://thepiratebay.org/) | 综合 |
| torrentgalaxy | https://tgx.rs/ 官方代理列表：https://proxygalaxy.me/  | 综合 |

### PT

| 网站   | 地址                  | 类型       |
| ------ | --------------------- | ---------- |
| kufei  | https://kufei.org/    | 综合       |
| hdkyl  | https://www.hdkyl.in/ | 综合，短剧 |
| m-team | https://m-team.cc/    | 综合       |

...

#### 玩法

参考 [从零开始玩 PT.pdf](https://linux.do/uploads/short-url/rftsfaDEuIdJkajVjATKDsirJBt.pdf)，讲的明明白白，最好在入手 PT 时读几遍，免得把 PT 号玩死，被拉入黑名单。

另外关于名词，可以了解下面几个:

- **free**：不计算下载量，但计算上传量，对过考很重要
- **2xfree**：不计算下载量，但计算 2 倍上传量，对过考很重要
  一般站点会考核上传，下载和魔力/保种时长，
- **50**：计算 50%的下载量
- **保种**：下载好文件后处于上传的状态
- **上传**：我们要先去找到站点的免费种（free），时间是最近的，上传只有一个人，体积大于 10G 的种（越大越好），下载好让它上传就行。注意最好有公网 ip，没有 v4 就开 v6 公网，打开 upnp，或者 dmz 主机，以增加连接性。

更多介绍可看此篇[文章](https://linux.do/t/topic/181768)

## FAQ

### 为什么推荐用 TR 保种，而不是 qb 保种？

A：QB 种子数多的时候性能消耗大，保种少的话无所谓

### 刮削数据失败，迟迟没有刮削图片

A：需要手动修改 host

首先打开 [https://dnschecker.org/country/cn/](https://dnschecker.org/country/cn/) 搜索 `api.themoviedb.org` 可用的 dns，然后进行如下操作

1. 可以直接在本地电脑上修改 nas 的 host，（使用 `ssh@你的用户名@群晖地址`，修改 host，具体可查看此篇 [文章](https://blog.csdn.net/alinathz/article/details/132397458)
2. 或者修改路由器匹配的 host

### 为什么需要在路由器上固定 nas ip 地址

A: 因为很多软件（Moviepilot）配置需要依赖其他软件（emby）服务，固定 ip 地址后也不用进行时刻更换

## 参考链接

- [MoviePilot 配置-Nas 媒体库自动化管理工具 | Goalonez Blog](https://blog.goalonez.site/blog/MoviePilot%E9%85%8D%E7%BD%AE-Nas%E5%AA%92%E4%BD%93%E5%BA%93%E8%87%AA%E5%8A%A8%E5%8C%96%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7.html)
- [自动化观影平台 MoviePilot 安装与使用](https://hackfang.me/movie-pilot-install-and-guide)
- [MoviePilot 部署教程|新手指南|媒体整理|信息刮削|搜索下载|媒体订阅 - 折腾笔记](http://nas.zwbcc.cn:8090/archives/1711674204030)
- [利用 MoviePilot 打造家庭影视库全自动追剧（初帖+分帖） - 资源荟萃 - LINUX DO](https://linux.do/t/topic/36073)
- [搭建自动化个人影院-海报削刮-字幕下载-自动订阅-kodi/Plex/Emby/Jellyfin 观看蓝光 4K 电影-一键开箱的 nas 个人影院 - YouTube](https://www.youtube.com/watch?v=5whbI_Xv2Vk)
- [GitHub - Putarku/MoviePilot-Help: MoviePilot 配置及使用过程的中的常见问题](https://github.com/Putarku/MoviePilot-Help)
- [手把手教你从零开始设置群晖 NAS 家庭影院存储系统 KODI NFS 和 FTP 共享](https://www.bilibili.com/video/BV1vQ4y1e7wu/)
