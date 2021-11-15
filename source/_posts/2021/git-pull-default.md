---
title: git-pull-default
author: Sea
toc: true
date: 2021-11-15 13:48:30
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/m5c0Xy_u310ya-desert.jpeg
tags: [git]
categories: [git]
---

## 问题背景

当使用 git 版本为 2.27.0 以上时，使用`git pull`命令出现以下的警告：

```shell
hint: Pulling without specifying how to reconcile divergent branches is
hint: discouraged. You can squelch this message by running one of the following
hint: commands sometime before your next pull:
hint:
hint:   git config pull.rebase false  # merge (the default strategy)
hint:   git config pull.rebase true   # rebase
hint:   git config pull.ff only       # fast-forward only
hint:
hint: You can replace "git config" with "git config --global" to set a default
hint: preference for all repositories. You can also pass --rebase, --no-rebase,
hint: or --ff-only on the command line to override the configured default per
hint: invocation.
```

<!--more-->

该警告的中文版本文案描述如下：

```shell
warning: 不建议在没有为偏离分支指定合并策略时执行pull操作。
您可以在执行下一次pull操作之前执行下面一条命令来抑制本消息：

git config pull.rebase false  # 合并（默认缺省策略）
git config pull.rebase true   # 变基
git config pull.ff only       # 仅快进

您可以将 "git config" 替换为 "git config --global" 以便为所有仓库设置
缺省的配置项。您也可以在每次执行 pull 命令时添加 --rebase、--no-rebase，
或者 --ff-only 参数覆盖缺省设置。
```

## 解决方案

先说结论：

若无特殊需求执行：`git config pull.rebase false`(默认)

## 如何解决问题

在上述的警告文案描述中我们可以发现两个重要的 Git 配置信息`pull.rebase`和`pull.ff`。

### pull.ff

先来了解一下`pull.ff`

在[《Git 官方文档-参考-pull.ff》](https://git-scm.com/docs/git-config#Documentation/git-config.txt-pullff)文章中可以查看到它的定义：

- 当把`pull.ff`设置为`false`时，这个变量告诉 Git 在这种情况下(相当于执行命令`git pull --no-ff`)，如果执行不带选项的`git pull`命令时先尝试快进合并，如果不行再进行正常合并生成一个新的提交。

- 当把`pull.ff`设置为`only`时，只允许快进合并(相当于执行命令`git pull --ff-only`)，如果执行不带选项的`git pull`命令时，如果不能进行快进合并则终止当前操作。

如果将`pull.ff`设置为`only`，而执行不带选项的`git pull`命令被终止，其实可以使用带参数的`git pull --no-ff`或者`git pull --rebase`命令来执行`pull`操作。

### pull.rebase

在《[Git 官方文档-参考-pull.base](https://git-scm.com/docs/git-config#Documentation/git-config.txt-pullrebase)》文章中可查看`pull.rebase`的定义，此处只解释当选项`pull.rebase`的参数为`true`或者`false`时的定义：

- 当`pull.rebase`为 true 时，运行不带选项的命令`git pull`相当于执行`git pull --rebase`。
- 当`pull.rebase`为 false 时，运行不带选项的命令`git pull`不会被改变含义，即不会变基。如果想变基，需要在执行命令时显式地加上选项`--rebase`，即`git pull --rebase`。

### 理解`git pull`命令的原理及其各选项的含义

#### `git pull`命令的原理

`git fetch`会查询`git remote`中所有的远程仓库所包含分支的最新提交，并将其记录到`.git/FETCH_HEAD`文件中。

`.git/FETCH_HEAD`是一个版本链接，指向着目前已经从远程仓库取下来的所有分支的最新提交。

`git pull`命令等价于：先执行`git fetch`，再执行`git merge FETCH_HEAD`将远程仓库对应分支的最新提交合并到当前本地分支中。

> git fetch && git merge

#### `git pull`命令中各选项的含义

`git pull`常见的选项搭配：

- 不带任何选项的`git pull`命令：先尝试快进合并，如果不行再进行正常合并生成一个新的提交。
- `git pull --rebase`命令：先尝试快进合并，如果不行再进行变基合并。
- `git pull --ff-only`命令：只尝试快进合并，如果不行则终止当前合并操作。
- `git pull --no-ff`命令：禁止快进合并，即不管能不能快进合并，最后都会进行正常合并生成一个新的提交。

### 理解`git pull`命令出现问题的原因

> 执行不带任何选项的`git pull`命令时，会产生三种歧义： `git pull --ff-only`、`git pull --no-ff`、`git pull --rebase`，而这三种 pull 方式的合并策略差异很大，即对整个分布式项目的版本管理有很大的影响作用。
>
> 而我们执行不带任何选项的`git pull`命令时，Git 就不知道我们到底想用哪种合并策略来执行`git pull`，因此 Git 会给出上述的警告文案，建议我们通过`git config`命令指定不带选项的`git pull`命令应该按照这三种合并策略的哪种来执行。

### 解决问题

再次回顾问题描述：

```shell
warning: 不建议在没有为偏离分支指定合并策略时执行pull操作。
您可以在执行下一次pull操作之前执行下面一条命令来抑制本消息：

git config pull.rebase false  # 合并（默认缺省策略）
git config pull.rebase true   # 变基
git config pull.ff only       # 仅快进

您可以将 "git config" 替换为 "git config --global" 以便为所有仓库设置
缺省的配置项。您也可以在每次执行 pull 命令时添加 --rebase、--no-rebase，
或者 --ff-only 参数覆盖缺省设置。
```

首先理解什么是`偏离分支`：

> 当本地的分支落后于远程分支时，本地分支又自行修改项目文件生成了新的提交，这时本地分支再执行`git pull`命令就不能快进合并，并且还容易发生冲突。这时的本地分支便称为偏离分支，因为这时的本地分支的最新提交跟远程分支的最新提交不同，产生了偏离。

接着理解什么是`合并策略`：

> 合并策略便是 `git merge --ff-only`、`git merge --no-ff`、`git merge --rebase`这三种常见的合并策略，分别代表着快进合并、非快进普通合并、变基合并。

通过上述的解析，现在我们理解了为什么理解`git pull`命令出现问题的原因，因此只要我们在 Git 中配置选项`pull.rebase`或`pull.ff`的参数即可。配置后，即便我们再执行不带任何选项的`git pull`命令，也不会再出现上述的警告文案啦。

> 若无特殊需求执行：`git config pull.rebase false`(默认)

## 参考链接

- [Git 问题解决：warning: Pulling without specifying how to reconcile divergent branches is discouraged.](https://blog.csdn.net/github_50517091/article/details/115628500)
- [Git 问题解决方案:不建议在没有为偏离分支指定合并策略时执行 pull 操作(Pulling without specifying how to reconcile divergent branches)](https://blog.csdn.net/wq6ylg08/article/details/114106272)
- [git 合并操作总结](https://sevody.github.io/2017/02/16/git-merge-command-summary/)
