---
title: GitHub Actions 如何手动触发
author: Sea
toc: true
date: 2021-12-17 09:48:53
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/qq8Lk4_bg2019091201.jpeg
tags: [github, actions, manual]
categories: [github]
---

## 前言

GitHub Ac­tions 在早期可能是处于初级开发阶段，它的功能非常原生，甚至没有直接提供一个手动触发按钮。一般的触发方式为代码变动（`push` 、`pull_request`），发布文件（`release`）或者定时（`schedule`）等，这些属于自动触发方式。如果我们需要在 GitHub 仓库没有任何变动的情况下**手动触发**就需要使用一些奇技淫巧。经历了漫长的功能迭代，官方最终正式带来了手动触发功能，这也宣告了一个瞎折腾时代的结束，一个崭新的折腾时代开始。

<!--more-->

## 手动触发

### workflow_dispatch

在时隔多年后 GitHub Ac­tions 终于引入了一个手动触发的按钮，不过默认是不开启的，需要在 work­flow 文件中设置 `workflow_dispatch` 触发事件。一个最简单的例子：

```yml
on:
  workflow_dispatch:
```

设置好触发事件后就能在相关 work­flow 的页面下看到 `Run workflow` 按钮。

![image-20211217100139973](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/4RbzQh_image-20211217100139973.png)

> 需要注意的是，正如官网所说你的这个 workflow 必须是在默认分支上。
>
> ![image-20211217100311765](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/2LnPmf_image-20211217100311765.png)

更复杂一点还可以实现在手动触发时填写参数，控制不同的工作流程或者直接改写某个环境变量等操作。目前[官方文档](https://docs.github.com/cn/actions/managing-workflow-runs/manually-running-a-workflow)已经相当完善，想要去深入可以去查看。

一个填写参数的例子：

```yml
name: Manual Trigger

on:
  # 手动触发事件
  workflow_dispatch:
    inputs:
      logLevel:
        description: 'Log level'
        required: true
        default: 'warning'
      tags:
        description: 'Test scenario tags'

jobs:
  printInputs:
    runs-on: ubuntu-latest
    steps:
      - run: |
          echo "Log level: ${{ github.event.inputs.logLevel }}"
          echo "Tags: ${{ github.event.inputs.tags }}"
          echo "Inputs: ${{ toJson(github.event.inputs) }}"
```

![image-20211217100540440](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/WtuX2K_image-20211217100540440.png)

如果我们在配置中定义了参数，则手动执行时也会需要填参数。上面在`workflow_dispatch`下通过定义`inputs`设定参数。在`jobs`中我们则可以在`github.event.inputs`中取到对应的参数。下面是上述代码运行结果：

![image-20211217101323184](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/xTI5sz_image-20211217101323184.png)

### repository_dispatch

[repository_dispatch](https://docs.github.com/cn/actions/learn-github-actions/events-that-trigger-workflows#repository_dispatch)让用户通过 API 批量手动执行，这个 event 的主要作用是让其他的程序通过 api 调用，通过自定义事件类型来驱动执行，这个 event 对应的 workflow 也必须在默认分支下定义。具体可参考[官方文档](https://docs.github.com/cn/rest/reference/repos#create-a-repository-dispatch-event)，下面是个简单例子

比如我们定义:

```yml
on:
  repository_dispatch:
    types: [opened, deleted]
```

然后执行 http 请求:

```bash
  curl \
  -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/{owner}/{repo_name}/dispatches \
  -d '{"event_type":"opened"}'
```

那么就可以被执行了，其中的`opened`, `deleted`是我们自定义的事件名字，`client_payload`是我们自定义的额外信息数据。

运行如下：

```bash
curl --location --request POST 'https://api.github.com/repos/MrSeaWave/lerna-demo/dispatches' \
--header 'Accept: application/vnd.github.v3+json' \
--header 'Authorization: Bearer 自定义的github token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "event_type": "opened",
    "client_payload": {
        "text": "my custom text here"
    }
}'
```

其中在`Authorization`一览中增加在`github`中申请的`token`，否则容易出现`"message": "Not Found"`的结果，就像这个[问题](https://stackoverflow.com/questions/68627451/github-actions-repository-dispatch-event-post-request-not-working-due-to-organis)一样。

上面运行成功结果：

![image-20211217104427699](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/zEJDAn_image-20211217104427699.png)

更多用法请关注 [Github 官网](https://docs.github.com/cn/actions/learn-github-actions/events-that-trigger-workflows#manual-events)~

## 参考链接

- [workflow_dispatch](https://docs.github.com/cn/actions/learn-github-actions/events-that-trigger-workflows#workflow_dispatch)
- [manually-running-a-workflow](https://docs.github.com/cn/actions/managing-workflow-runs/manually-running-a-workflow)
- [repository_dispatch](https://docs.github.com/cn/actions/learn-github-actions/events-that-trigger-workflows#repository_dispatch)
- [Create a repository dispatch event](https://docs.github.com/cn/rest/reference/repos#create-a-repository-dispatch-event)

- [GitHub Actions 手动触发方式进化史](https://p3terx.com/archives/github-actions-manual-trigger.html)

- [10 个你该了解的 GitHub Actions 进阶技巧](https://cloud.tencent.com/developer/article/1782556)
- [使用 GithubActions 自动化工作流](https://blog.hszofficial.site/introduce/2020/11/30/%E4%BD%BF%E7%94%A8GithubActions%E8%87%AA%E5%8A%A8%E5%8C%96%E5%B7%A5%E4%BD%9C%E6%B5%81/)
