---
title: GitHub Pages 绑定个人域名
author: Sea
toc: true
date: 2024-03-23 14:16:29
cover: https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2024/1711175145828_hEVpjZ.jpg
tags: ['Github']
categories: ['技术']
---

首先需要有一个自己的域名，让大家更好的认识你。

<!-- more -->

## 配置 DNS

在域名服务商那里，添加 4 个 A 记录和 1 个 CNAME：([github](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#dns-records-for-your-custom-domain))

| 类型  | 名称 | 值                  |
| ----- | ---- | ------------------- |
| A     | @    | 185.199.108.153     |
| A     | @    | 185.199.109.153     |
| A     | @    | 185.199.110.153     |
| A     | @    | 185.199.111.153     |
| CNAME | www  | mrseawave.github.io |

添加完成后如下：

![1711159785529_qf8NJS](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2024/1711175016636_qVj5fA.png)

怎么查看域名是否已经解析成功了呢？

```bash
➜ dig +noall +answer hailangya.com
hailangya.com.		600	IN	A	185.199.109.153
hailangya.com.		600	IN	A	185.199.110.153
hailangya.com.		600	IN	A	185.199.108.153
hailangya.com.		600	IN	A	185.199.111.153
```

终端输入以上命令，得到以上结果即表明域名解析成功，可以进入下一步了。

## 自定义域

在 GitHub 配置

1. 在边栏的“代码和自动化”部分中，单击“ Pages”。
2. 在“自定义域”下，键入自定义域，然后单击“保存”。

![1711160815895_KatKh8](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2024/1711175027632_r6Gqpv.png)

## 博客相关配置

### 创建 CNAME 文件

在等待证书生成的时候就可以配置下 Hexo 博客

首先添加 CNAME 文件：

```txt
hailangya.com
```

文件位置：`~/blog/source/CNAME`

![1711175635109_Qx8G8F](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2024/1711175635109_Qx8G8F.png)

### 修改相关链接

Hexo 中，然后修改站点配置文件：

```diff
# 文件位置：~/blog/_config.yml

- url: https://mrseawave.github.io/blogs
+ url: https://hailangya.com

```

因使用自定义域名，所以去除 pathname 路径（/blogs ），具体细节可查看 [文章](https://juejin.cn/post/6895518085504040973)

> [!TIP] 提示 💡 
>   由于 github 的所有项目只能有一个 github pages 域名（如我的项目：mrseawave/mrseawave.github.io，域名为 mrseawave.github.io，其他开启 github pages 的项目都是这个域名的子目录（如项目 mrseawave/imgs，域名为 mrseawave.github.io/imgs ，但是我在子项目中单独配置域名 xxx.com，所以不在需要 pathname，直接访问 xxx.com 即可

## 参考链接

- [GitHub Pages 绑定个人域名，免 Cloudflare 支持 HTTPS | reuixiy](https://io-oi.me/tech/custom-domains-on-github-pages/)
- [管理 GitHub Pages 站点的自定义域 - GitHub 文档](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [多个 Github Pages 项目主页 DNS 配置方式 | Iifa Tree](https://blog.iifatree.com/2019/12/13/dns-configuration-for-github-pages-project/)
- [添加 CNAME 文件到你的存储库中 - GitHub Pages 指南 - UDN 开源文档](https://doc.yonyoucloud.com/doc/wiki/project/github-pages-basics/cname-file.html)
- [多项目部署为同一个 GitHub Pages - 掘金](https://juejin.cn/post/6895518085504040973)
