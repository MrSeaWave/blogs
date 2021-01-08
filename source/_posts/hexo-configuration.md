---
title: hexo 相关问题以及优化配置
author: Sea
toc: true
date: 2021-01-08 11:18:32
cover:
tags: [hexo,configuration,questions,SEO]
categories:
- [hexo,configuration]

---



## 前言

本文记录一些 hexo 出现的问题及其解决方案，以及相关配置

`hexo` 环境

```bash env
hexo: 5.3.0
hexo-cli: 4.2.0
os: Darwin 19.6.0 darwin x64
node: 15.2.1
```

<!-- more -->

## 禁止爬虫跟踪外链

搜索引擎的蜘蛛来爬取文章内容时，如果你的文章中有外部链接，它就会到外链的站点去爬取，有可能再也不会回来了。为了告诉搜索引擎不要跟踪这些外链，需要在这些链接标签中添加属性 `rel="nofollow"` 或 `rel="external nofollow"` 。

`rel="nofollow"` 是通用格式，即是告诉搜索引擎不要跟踪此链接，`rel="external nofollow"` 是更具体的写法，进一步告诉搜索引擎这是一个外部的链接，不要跟踪它。

我们可以使用 `hexo-filter-nofollow` 自动为 Hexo 博客中的外链添加 `rel="external nofollow noreferrer" `的插件，从而[改善你的网站的安全性和 SEO](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Link_types)。

### 安装

```bash install
$ npm i hexo-filter-nofollow --save
```

### 编辑 `站点配置文件`

在 `站点配置文件`` _config.yml` 末尾添加如下内容：

```yml _config.yml
nofollow:
  enable: true
  field: site
  exclude:
    - 'exclude1.com'
    - 'exclude2.com'
```

- **enable** - 是否启用插件，默认值为 `true`
- **field** - 插件的处理范围，默认值为 `site`，可选 `post` 或 `site`
  - `post` - 仅处理文章内容
  - `site` - 处理全站所有页面
- **exclude** - 域名白名单，不同的子域名视为不同的域名（如 `www`）
  - `exclude1.com`不包括 `www.exclude1.com` 或 `en.exclude1.com`



## 参考链接

- [Hexo相关问题和优化](https://wylu.me/posts/78c745f0/)
- [hexo-filter-nofollow - Hexo 官方的 nofollow 插件](https://blog.skk.moe/post/hexo-filter-nofollow-joined-hexo-official-plugin/)