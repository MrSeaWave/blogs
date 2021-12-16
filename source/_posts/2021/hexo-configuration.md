---
title: hexo 相关问题以及优化配置
author: Sea
toc: true
date: 2021-01-08 11:18:32
cover:
tags: [hexo, configuration, questions, SEO, permalinks]
categories:
  - [hexo, configuration]
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

我们可以使用 `hexo-filter-nofollow` 自动为 Hexo 博客中的外链添加 `rel="external nofollow noreferrer"`的插件，从而[改善你的网站的安全性和 SEO](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Link_types)。

### 安装

```bash install
$ npm i hexo-filter-nofollow --save
```

### 编辑 `_config.yml`

在 `站点配置文件` `_config.yml` 末尾添加如下内容：

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

## 永久链接

因链接层级过深、链接中包含中文、 `title` 变动导致链接也经常发生变动，这些都不利于 SEO 。

### 方法一：按照文件名称生成

假设文章：

```yml md
# source/_posts/lorem/hello-world.md
title: Hello World Page
date: 2013-07-14 17:01:34
categories:
  - foo
  - bar
```

根据[官网](https://hexo.io/zh-cn/docs/permalinks.html)介绍在`_config.yml`中设定：

```yaml _config.yml
# title: 文件名称 (relative to “source/_posts/“ folder)
permalink: :title/
# url:-----> /lorem/hello-world/
# name: 文件名称
permalink: :name/
# url:-----> /hello-world/
```

问题来了，如果按照文件名称生成永久链接的，我的文件格式都要是这类 `英文字母.md` 的格式。如果是中文`中文.md`那么就会变成`/中文/`，浏览器地址栏上很不美观，对 SEO 也不好。

有没有办法让 Markdown 文件用 `你好世界.md` 这类中文文件名保存，生成的永久链接格式又是 `/hello-world/` 这种样式呢？

> Markdown `Front-matter` 区域可以看到，我这里除了 `title`， `date` 以及 `tags` 外，自己添加了一个新的变量 `customUrl` ，这个新的变量用来保存每个文章的英文名字，这样一来可以有利于 SEO，二来可以缩短博客文章 URL 的层数。

```yml front-matter
title: Hello World Page
# 自定义的变量
customUrl: custom-hello-world
```

再在 `hexo` 配置文件 `_config.yml` 中，把 `permalink:` 的值设为 `:customUrl/` 。

```yml _config.yml
permalink: :customUrl/
# url:------> /custom-hello-world/
```

### 方法二：使用 hexo-abbrlink

推荐使用插件 [hexo-abbrlink](https://github.com/rozbo/hexo-abbrlink) 生成 `permalink` 。

#### 安装

```bash install
$ npm install hexo-abbrlink --save
```

#### 使用

然后在配置文件`_config.yml` 中修改：

```yml _config.yml
permalink: :abbrlink/
#abbrlink配置
abbrlink:
  alg: crc32 # 算法：crc16(default) and crc32
  rep: dec # 进制：dec(default) and hex
```

**执行 `hexo clean && hexo g` 重新生成静态文件后，源文件 front-matter 中会包含 `abbrlink: xxx` 。**

> 如果文章中未指定 `abbrlink: xxx`，将会根据算法随机生成数字

这样就确保了链接的唯一化，只要不修改 md 文件的 `abbrlink` 的值，`url` 就永久不会改变。

使用这种方法生成 `permalink` 时，在每次提交修改前，最好先执行 `hexo clean && hexo g`，确保提交前你所有的文章的 `front-matter` 中都包含 `abbrlink` ，避免因 `title` 的改变导致生成 `abbrlink` 不一致（如果已存在 `abbrlink`，就不会重新生成，不论`title` 是否发生变化）。

## 如何引用自己撰写的文章

文章中，有时候需要自己给自己引流，所以经常要引用自己的文章，最好的方法就是在生成系统之内直接引用。

Hexo 提供了 [标签插件](https://hexo.io/zh-cn/docs/tag-plugins.html) 来完成这个功能。

```
{% post_path filename %}
{% post_link filename [title] [escape] %}
```

在使用此标签时可以忽略文章文件所在的路径或者文章的永久链接信息、如语言、日期。

例如，在文章中使用 `{% post_link how-to-bake-a-cake %}` 时，只需有一个名为 `how-to-bake-a-cake.md` 的文章文件即可。即使这个文件位于站点文件夹的 `source/posts/2015-02-my-family-holiday` 目录下、或者文章的永久链接是 `2018/en/how-to-bake-a-cake`，都没有影响。

默认链接文字是文章的标题，你也可以自定义要显示的文本。

默认对文章的标题和自定义标题里的特殊字符进行转义。可以使用`escape`选项，禁止对特殊字符进行转义。

**链接使用文章的标题**

```
{% post_link hexo-3-8-released %}
```

[Hexo 3.8.0 Released](https://hexo.io/news/2018/10/19/hexo-3-8-released/)

**链接使用自定义文字**

```
{% post_link hexo-3-8-released '通往文章的链接' %}
```

[通往文章的链接](https://hexo.io/news/2018/10/19/hexo-3-8-released/)

**对标题的特殊字符进行转义**

```
{% post_link hexo-4-released 'How to use <b> tag in title' %}
```

[How to use tag in title](https://hexo.io/news/2019/10/14/hexo-4-released/)

**禁止对标题的特殊字符进行转义**

```
{% post_link hexo-4-released '<b>bold</b> custom title' false %}
```

[**bold** custom title](https://hexo.io/news/2019/10/14/hexo-4-released/)

> 注，使用 post_path 时不能用在 md 语法中
>
> ![image-20211216113248493](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/y4ISIo_image-20211216113248493.png)

## 参考链接

- [Hexo 相关问题和优化](https://wylu.me/posts/78c745f0/)
- [hexo-filter-nofollow - Hexo 官方的 nofollow 插件](https://blog.skk.moe/post/hexo-filter-nofollow-joined-hexo-official-plugin/)
- [Hexo 永久链接管理](https://clearsky.me/hexo-permalinks.html)
- [永久链接（Permalinks）](https://hexo.io/zh-cn/docs/permalinks.html)
- [hexo-abbrlink](https://github.com/rozbo/hexo-abbrlink)
- [标签插件（Tag Plugins）](https://hexo.io/zh-cn/docs/tag-plugins.html)
