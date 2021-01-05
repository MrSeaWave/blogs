---
title: hexo new 生成新的文章
author: Sea
date: 2021-01-05 10:34:01
toc: true
cover: 
tags: [hexo,write]
categories:
  - [hexo, write]
---

## 介绍

关于如何新建博客，[官网](https://hexo.io/zh-cn/docs/writing)已经有了明确的介绍：

你可以执行下列命令来创建一篇新文章或者新的页面。

```bash 命令行
$ hexo new [layout] <title>
```

<!-- more -->

您可以在命令中指定文章的布局`（layout）`，默认为 `post`，可以通过修改 `_config.yml` 中的 `default_layout` 参数来指定默认布局。

这句话有几个地方需要解释一下：

1. `layout`是什么？`layout`的意思是布局，`hexo`博客安装成功后，在默认的根部录下，有一个`scaffolds`文件夹，里面有个 3 个文件，分别是`draft.md`,`page.md`,`post.md`。这 3 个文件就是默认的 `layout` 。这三个布局分别会有什么样的作用和效果，我们会在后面的内容中进行详细说明。
1. 如果不提供 `layout` 的话，也可以生成博客，不过默认的 `layout` 是在 `_config.yml` 中的配置。一般情况下，如果没有更改过任何 `_config.yml` 中的内容的话，默认的 `layout` 是 `post`
1. 如果 `title` 包含空格的话， `title` 需要用引号包裹起来。也就是意味着，如果 `title` 没有空格的话，可以不使用引号。

假设我们想要写一篇名为 `myBlog` 的博客，如果输入完整的命令的话，应该是： `hexo new post "myBlog"`。但是因为默认情况下，我们的 `layout` 就是`post`，所以我们可以将 `post` 省略掉，写为 `hexo new "myBlog"` 。又因为我们的博客名字中没有空格，因此可以将省略号去掉，写为`hexo new myBlog`。这个命令已经是简化到不能再简化的命令了。而如果我们的博客名称是 `my first blog`，因为名称包含了空格，所以我们的命令就必须将博客名称包裹起来，也就是说最简化的命令就是 `hexo new "my first blog"` 。 这就是为什么很多网上的攻略说新生成一篇文章时用`hexo new <title>`的命令的原因，这个命令没错，但是只是大部分的情况，而不是完整的命令。

## 布局（Layout）

`Hexo` 有三种默认布局：`post`、`page` 和 `draft`。在创建这三种不同类型的文件时，它们将会被保存到不同的路径；而您自定义的其他布局和 `post` 相同，都将储存到 `source/_posts` 文件夹。

|  布局   |       路径       |
| :-----: | :--------------: |
| `post`  | `source/_posts`  |
| `page`  |     `source`     |
| `draft` | `source/_drafts` |


## layout 为 post 的情况

以上面的情况为例，我们的命令是 `hexo new post myBlog` ，执行这个命令之后，你会发现命令行会有如下提示：

![image-20210105134259362](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/Hz973p_image-20210105134259362.png)

它告诉你，在根目录的下的 `source` 文件夹中创建了一个` _post` 文件夹，并且在内生成了一个`myBlog.md`的文件。打开对应的文件夹，你会发现`myBlog.md`的文件，这就是你新生成的文件。你可以通过某种支持`markdown`的编辑器打开这个文件，然后使用`markdown`格式的方法书写这篇博客。

##  layout 为 draft 的情况

`Hexo` 的一种特殊布局：`draft`，这种布局在建立时会被保存到 `source/_drafts` 文件夹。

接下来我们使用`hexo new draft myDraftBlog`，生成`myDrafaBlog.md`文件，这个md文件是草稿状态，也就是说，这篇文章仅仅是作为你的草稿而不是正式稿，所以不会发表在博客主页上。草稿就是需要你不断完善的文章，知道有一天你觉得这篇文章可以正式发表了，你可通过 `publish` 命令将草稿移动到 `source/_posts` 文件夹，该命令的使用方式与 `new` 十分类似，您也可在命令中指定`layout` 来指定布局。

```bash publish
$ hexo publish [layout] <title>
```

（草稿默认不会显示在页面中，您可在执行时加上 --draft 参数，或是把 render_drafts 参数设为 true 来预览草稿。）

执行`hexo publish draft myDraftBlog`，你就会发现，`source/_draft`文件夹下的`myDraftBlog.md`文件消失了，而在`_post`文件夹下你会找到`myDraftBlog.md`文件。

## layout 为 page 的情况

我们可以尝试一下下面这个命令`hexo new page "about"`，这个时候你打开`source`文件夹你会发现一个`about`的文件夹，里面会有一个`index.md`的文件。打开`http://localhost:4000/about`，这个时候你就会发现你刚才编辑的index.md的内容会出现在这里。

`layout` 为 `page`的时候，其实就是相当于生成一个新的路径，也就是我们说的`url`的`path`，或者也可以称作路由。通过这种方式，我们可以把我们的博客再进行细分各个内容版块，更有条理的组织我们的博客。

## Front-matter

`Front-matter` 是文件最上方以` ---` 分隔的区域，用于指定个别文件的变量，举例来说：

```text eg
---
title: Hello World
date: 2013/7/13 20:46:25
---
```
以下是预先定义的参数，您可在模板中使用这些参数值并加以利用。

|参数|描述|默认值|
|:--|:--|:--|
|layout|	布局	|`config.default_layout`|
|title|	标题|	文章的文件名|
|date	|建立日期	|文件建立日期|
|updated	|更新日期	|文件更新日期|
|comments|	开启文章的评论功能|	true|
|tags|	标签|（不适用于分页）|
|categories|	分类|（不适用于分页）	|
|permalink	|覆盖文章网址|

### 分类和标签

只有文章支持分类和标签，您可以在 `Front-matter` 中设置。在其他系统中，分类和标签听起来很接近，但是在 `Hexo` 中两者有着明显的差别：分类具有顺序性和层次性，也就是说 `Foo, Bar` 不等于 `Bar, Foo`；而标签没有顺序和层次。

```yaml eg
categories:
- Diary
tags:
- PS3
- Games
```

如果你需要为文章添加多个分类，可以尝试以下 list 中的方法。

```yaml 分类Eg
categories:
- [Diary, PlayStation]
- [Diary, Games]
- [Life]
```
此时这篇文章同时包括三个分类： `PlayStation` 和 `Games` 分别都是父分类 `Diary` 的子分类，同时 `Life` 是一个没有子分类的分类。

## 标签插件

具体内容参考[官网](https://hexo.io/zh-cn/docs/tag-plugins)

## 参考链接

- [hexo 写作](https://hexo.io/zh-cn/docs/writing)
