---
title: 使用 renovate 监控第三方依赖更新
author: Sea
toc: true
date: 2022-02-09 09:56:19
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/rzF1La_renovate.jpeg
tags: [Monitor, Dependencies]
categories: [技术]
---

## 背景

当一个公共依赖包的使用者数量逐渐庞大的时候，如何保证当此包发布新版本时，所有使用者都能尽可能快地得到更新？或者如何保证自己仓库的使用的第三方库一直保持**安全情况下**的最新状态呢？

<!--more-->

传统的解决方案：

1. 手工对所有项目逐个升级。这种办法相当繁琐，且容易产生遗漏，当项目数量足够庞大的时候，发布一次将会是相当痛苦的体验，而且对于 lerna + monorepo 而言，yarn 的 `upgrade-interactive` 对 monorepo 没有很好的支持；
2. 在依赖安装时指定版本为 `latest`，这种办法虽然能保证每次安装时都能得到最新版本，但是却有诸多弊端，如：
   1. 无法保证依赖的安全性，有可能一次更新不慎造成大面积的瘫痪；
   2. 对「依赖锁」不友好，如 `yarn.lock` 等。

因此，如何使这个过程变得优雅，是一个亟待解决的问题。

经过调研发现有如下几种方式可以确保第三方包更新到最新版本。

- [Dependabot](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/about-dependabot-version-updates)
- [Renovate](https://github.com/renovatebot/renovate)

本篇文章将会介绍如何使用 Renovate ，关于他俩的使用区别可以参考此文章[《Try to update your dependencies with Renovate or Dependabot》](https://dev.to/omaiboroda/try-to-update-your-dependencies-once-a-month-5dm5)

## Renovate

Renovate 是一个专注于解决依赖问题的库，自动化的依赖项更新，多平台和多语言。目前在 Github 上以 Github Apps 的形式，可以为接入此 Apps 的项目提供依赖更新监控相关的服务。

## Renovate 使用体验

### 安装 renovate

在此网站 https://github.com/apps/renovate 点击安装即可。

### Configure Renovate Pr

安装 renovate 之后无须手动操作，等待即可。

此时 renovate 将会扫描你授予权限的仓库，做一些简要分析，分析你的各个项目主力语言、依赖管理方式，之后将会对哪些可以被通过 renovate 管控更新依赖的仓库，分别提交一份 Pull Request。

这个 Pull Request 的标题叫做 **Configure Renovate，**中间附带了一个文件更变，便是他会在项目的更目录下添加 `renovate` 的配置文件，名为 `renovate.json` 。

![image-20220209102019013](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/RB79K7_image-20220209102019013.png)

这个配置文件描述了一些 renovate 管理此仓库依赖的相关选项，默认生成的 `config:base` 已经能够满足日常需要。

如果开发者很不爽在项目根目录增添这样一个 json 配置文件，可以按照他们官方配置发现的目录查找顺序，移入到 `.github` 目录下。(具体查找规则，官方有较为详细的[说明文档](https://docs.renovatebot.com/key-concepts/automerge/#overriding-global-automerge))

### Pin Pr (Pr: Pin Dependencies。)

在 [Configure Renovate Pr](https://github.com/MrSeaWave/chinese-holidays/pull/1) 被合并后，发起一个 [Pin Pr](https://github.com/MrSeaWave/chinese-holidays/pull/2)，将项目中用到的依赖的版本锁定，对于 `package.json` 来说，即去除任何模糊的通配符，如 `^` / `~` 等，改用精确的版本号。在这个 PR 被合并前，不会有任何后续操作。

![image-20220209103308471](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/ROfHkE_image-20220209103308471.png)

### Update Dependencies

日常的监控依赖更新。

[Pin Pr](https://github.com/MrSeaWave/chinese-holidays/pull/2) 被合并后，开始周期性地检索依赖。当发现有更新时，为每个依赖（或依赖群）更新发起一个 Pr（[示例](https://github.com/MrSeaWave/chinese-holidays/pull/5)），内容包含依赖定义文件（如 `package.json`） 与依赖锁文件（如 `yarn.lock`）

![image-20220209103959578](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/vVD1lR_image-20220209103959578.png)

> 1. 如果用户想要做本次升级，将其合并即可。将来如果该依赖再次有更新可用，会再次生成新的 PR；
> 2. 如果用户不想做本次升级，不理会或将其关闭即可：
>    1. 若不理会，在将来该依赖再次升级时，Renovate 会更新该 PR 至新版本；
>    2. 若关闭，Renovate 将忽略该版本，不再发起 PR。

以上只是大致流程，实际上 Renovate 还有非常多的[配置项](https://docs.renovatebot.com/self-hosted-configuration/)可以发掘，可以提供高度定制化的使用体验。

## 参考链接

- [Renovate](https://github.com/renovatebot/renovate)
- [Renovate Doc](https://docs.renovatebot.com/)

- [使用 renovate 监控第三方依赖更新](https://zexo.dev/posts/2020/03/01/keep-your-repo-dependencies-up-to-date-with-renovate/)
- [Integrate Renovate with GitLab](https://wxsm.space/2020/integrate-renovate-with-gitlab/)

- [Try to update your dependencies with Renovate or Dependabot](https://dev.to/omaiboroda/try-to-update-your-dependencies-once-a-month-5dm5)
