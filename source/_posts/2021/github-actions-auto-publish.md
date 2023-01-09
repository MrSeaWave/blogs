---
title: 如何使用Github Action 自动 lerna publish
author: Sea
toc: true
date: 2021-12-16 09:46:00
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/CJpYL9_image-20211216105358905.png
tags: [Lerna, GitHub, Publish, NPM, Actions, Workflow, CI/CD]
categories: [技术]
---

本文讲述的是如何利用`Github Action`自动化执行 `lerna publish`。

<!--more-->

## 动机

大家都明白，人是很懒的，自从接触到`Github Action`后我就在想，能不能解放自己的双手，让 Github 帮我来自动发包至 npm 仓库。由此引出了本文。

假设你对 Github Actions 已经有了最基本的了解。如果不太了解，可以参考往期文章：{% post_link start-github-actions github-actions入门 %}，

比如，你知道下面这个配置表示当 push 到 master 分支时会触发 action，作用是在 ubuntu 环境中把代码 checkout 出来，然后使用 node 14.X 先后执行 `npm i` 和 `npm run test`。

```yml
name: test
on:
  push:
    branches: [ master ]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14.x]

    steps:
      - name: checkout
        uses: actions/checkout@main

      - name: use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
    - name: install
      run: npm i
    - name: test
      run: npm run test

```

那么接下来照葫芦画瓢开始针对`publish` 进行针对操作。

## 如何设置

### 准备 Npm Token

我们都知道，以往在发布 npm 包的时候，我们需要先运行 npm login 登录我们自己的账号，用来验证我们的身份，使用 Github Action 也要验证我们的身份，不过需要用另外一种方式--->使用 npm token。

登录 [npm](https://www.npmjs.com/) 后，找到个人中心菜单里面的 “Access Tokens” 菜单，然后点击右上角的 “Generate New Token” 生成 token 按钮，生成一个新 token ，然后把新 token 复制出来，我们后面步骤要用到。

> _注：npm access token 有三种，但既有 publish 权限且可绕过 2FA 的只有 automation token。_
>
> ![image-20211216101557988](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/DVZWGO_image-20211216101557988.png)

### 放置 Npm Token

找到你的 Github 项目，然后点击 Setting 选项，如图：

![image-20211216101900381](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/Q3oh9P_image-20211216101900381.png)

然后在左侧菜单中找到 Secrets ，在点击 New repository secret 按钮，创建一个新的秘钥，这里的 name 起名为 **NPM_TOKEN**，下面要用到，value 则是刚才 npm 中生成的 token， 如图，

![image-20211216102049632](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/C2KuMZ_image-20211216102049632.png)

![image-20211216110710027](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/4OYrfz_image-20211216110710027.png)

### 设定针对 CI 使用的 npm scripts

以下为 `package.json` 中的`scripts`设定：

```json
{
  "scripts": {
    "release": "npm run build && lerna publish --yes --no-verify-access"
  }
}
```

> 1.  通常在发布之前会进行打包，所以这里把`build` 脚本放在一起来使用。
> 2.  Lerna 在使用 npm 的 automation token 会遇到问题，必须使用 `--no-verify-access` 绕过。详情参考[ issue](https://github.com/lerna/lerna/issues/2788)。

### 设定 Github Actions

前置条件已经完成，那么我们就可以在我们的本地项目中，创建 `.github\workflows\auto-publish.yml` 文件，内容如下：

```yml
# 自动发布
name: Auto Publish

on:
  push:
    # 针对指定分支
    branches:
      - master
    # 针对指定文件修改，这里可参考https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#onpushpull_requestpaths
    paths:
      - 'packages/**/*.js'
      - 'packages/**/*.scss'
      - '**/package*.json'
  # 让你能够手动触发，方便测试，参考https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows#workflow_dispatch
  workflow_dispatch:

jobs:
  auto-publish:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x]

    steps:
      - name: Checkout
        uses: actions/checkout@main
        with:
          # 0 indicates all history for all branches and tags，保留所有历史，为了让lerna publish 时可以生成有效的change log
          fetch-depth: '0'
      # 设定node 环境
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
          registry-url: https://registry.npmjs.org/
      #  设定安装工具--> yarn
      - name: Global install Yarn 🔨
        run: npm install -g yarn
      - name: Print Env 📄
        run: |
          echo "node"
          node -v
          echo "npm"
          npm -v
          echo "yarn"
          yarn -v
      # 安装依赖
      - name: Install dependencies 📦️
        run: yarn install

      - name: Setup credentials
        # lerna publish 后会提交代码到master分支，这里是为了配置 git 用户，区分用户
        run: |
          git config --global user.email action@github.com
          git config --global user.name Github Action
        # run: |
        #   git config --global user.email MrDaemon@outlook.com
        #   git config --global user.name Sea
      - name: Publish 🚀
        run: npm run release
        # 利用 automation token publish 至 npm，这里NPM_TOKEN 就是我们上文中设定的
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

到这里就全部设定完毕了。接下來只需要：

1. 在 master 上修改指定文件夹代码，并 push。
2. 触发 Github Actions 的 auto-publish job，它会运行脚本自动发布至 npm。

可参考：[MrSeaWave/lerna-demo](https://github.com/MrSeaWave/lerna-demo)

> 可能你会有如下的疑问，lerna publish 后也会修改代码（如：package.json 修改），并 push 到 master，那么会不会在这个脚本上一直套娃，无限循环的运行呢？
>
> 答案是不会的，官方解释[如下](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#using-the-github_token-in-a-workflow):
>
> ![image](https://user-images.githubusercontent.com/21967852/146156352-a3c27276-2baa-43d0-a6b9-1c88a47cfba9.png)

## 参考链接

- [_workflow-syntax-for-github-actions#onpushpull_requestpaths_](*https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#onpushpull_requestpaths*)
- [用 Lerna 管理共同前端設定，並透過 Github Actions 自動發布至 npm](https://galtz.netlify.app/f2e-common-config/)

- [Github Actions 实用参考](https://juejin.cn/post/6875857705282568200)
