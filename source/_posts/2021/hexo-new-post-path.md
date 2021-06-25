---
yantitle: 如何在Hexo中对文章md文件分类
author: Sea
toc: true
date: 2021-06-25 16:23:31
cover:
tags: [hexo, md]
categories:
---

本文将介绍如何在 Hexo 中对文章 md 文件按日期进行分类

<!--more-->

## 起因

在默认配置下，我们使用`hexo new post [title]`会在`source/_post/`目录下生成对应的`markdown`文件，当我们写的博客越来越多的时候，会发现，所有文章都是在`source/_post/`下，查找起来会不大方便，因此希望对它进行一个分类，但是在生成的文章链接上保持不变。

## 方法

通过查看[hexo 配置文档](https://hexo.io/zh-cn/docs/configuration.html) 发现：

> permalink 用于设置文章的永久链接格式
> new_post_name 新文章的文件名称

因此我们可以通过配置`new_post_name`让创建的文件按时间分类，其次可通过[`new`命令](https://hexo.io/zh-cn/docs/commands#new)指定创建时的文件路径(`hexo new page --path about/me "About me"`)，从而进行归类。

这里介绍`new_post_name`方法，我们可以指定：

```yaml
permalink: 'articles/:year/:month/:day/:name/'
new_post_name: ':year/:title.md'
```

这时候每次运行`hexo new post [title]`时新建的文件将按年份存放，生成的 html 文件将会按照年月日展示，比如`source/_post/2021/test.md`对应的博客地址：`2021/06/25/test/`。

## 整理

现在新建文章的路径我们是已经处理好了，那以前创建的文章是不是要一个个手动分类呢？这里参考[此文章]](https://www.githang.com/2018/12/22/hexo-new-post-path/)，我们可以使用终端进行处理：

思路为：

1. 找出 2021 年的文章
2. 移动到`2021`文件夹下
3. 使用`sed`命令批量修改文件内容
4. 找出`2020`年的文章，按 1-3 步的方式处理……

## 参考链接

- [如何在 Hexo 中对文章 md 文件分类](https://www.githang.com/2018/12/22/hexo-new-post-path/)
