---
title: Git 仓库瘦身
author: Sea
toc: true
date: 2022-11-16 21:00:11
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/UfwFAW_will-murai-kiriko-mom-005.jpg
tags: [git, GitHub, Gitlab]
categories: [git]
---

随着时间的推移，Git 存储库变得越来越大，或者自己误操作，把 `node_moduoles`、`.yarn`、`.DS_Sore `这种大文件上传到远程仓库中，虽然后期把他们移除了，但还是会使仓库体积变大，获取仓库变得更慢，每个人都必须下载文件，因此我们需要缩减 Git 仓库体积。

<!--more-->

（虽然我们可以使用 `git clone --depth=1 --single-branch https://gitlab.example.com/<namespace>/<project_name>.git` ，快速拉取代码，但依然减少不了远程仓库体积）

## 前置条件

1. 安装 [git-filter-repo](https://github.com/newren/git-filter-repo) (重写仓库删除不需要的历史记录以缩小仓库，更多用法参考[Examples](https://htmlpreview.github.io/?https://github.com/newren/git-filter-repo/blob/docs/html/git-filter-repo.html#EXAMPLES))

   ```shell
   $ brew install git-filter-repo
   ```

2. 分析现有仓库 top 100 大文件

   ```bash
   $ git rev-list --objects --all | grep "$(git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -100 | awk '{print $1}')"
   ```

   示例如下，运行`du -sh`可以看到当前仓库大小为 `82M`。

   ![image-20221117105116119](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/3TeNP3_image-20221117105116119.png)

   `.git`文件夹为`81M`

   ![image-20221117110359777](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/wXIY6t_image-20221117110359777.png)

​ 当前仓库 top 100 的大文件:

![image-20221117105553946](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/Y6BKOP_image-20221117105553946.png)

可以看出，大文件多数集中在`.yarn`文件夹内。 而这个文件夹对于我们来说，是不需要使用 git 管理的。 应该是早期不规范或者误操作给上传到了仓库里。 虽然这个文件夹现在已经被删除了，但是提交记录还在。

## 瘦身操作

前期准备工作我们已经完成了，目的很明确，清楚历史中的`.yarn`文件，接下来开始瘦身工作。

1. [Export project](https://git.garena.com/help/user/project/settings/import_export.html#exporting-a-project-and-its-data)

   生成一个新的项目导出并下载它。此项目导出包含你的存储库*和* refs 的备份副本，我们用于从你的仓库中清除文件。

​ ![image-20221117110458641](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/mxfoxG_image-20221117110458641.png)

2. 使用 `tar` 解压刚才的导出项目

   ```bash
   $ tar xzf project-backup.tar.gz
   ```

   ![image-20221117111010306](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/jZXInH_image-20221117111010306.png)

3. 使用 `--bare` 和 `--mirror` 选项从包中克隆一个新的仓库副本：

   ```bash
   $ git clone --bare --mirror /path/to/project.bundle
   ```

   ![image-20221117111122563](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/Sgw3Lf_image-20221117111122563.png)

4. 导航到 `project.git` 目录

   ![image-20221117112940429](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/d00zeb_image-20221117112940429.png)

5. 使用 `git filter-repo` ，分析您的仓库并查看结果，确定您要清除哪些项目：(可以忽略，前面已确定要删除的文件为`.yarn`)

   ```bash
   $ git filter-repo --analyze
   ```

6. 使用` git filter-repo` 清除仓库历史记录中的文件。因为我们试图删除内部 refs，所以我们依靠每次运行产生的 `commit-map` 来告诉我们要删除哪些内部 refs。

   清除特定文件：`.yarn`(更多用法参考[Examples](https://htmlpreview.github.io/?https://github.com/newren/git-filter-repo/blob/docs/html/git-filter-repo.html#EXAMPLES))

   ```bash
   $ git filter-repo --path-glob '.yarn/*' --invert-paths --force
   ```

   ![image-20221117112350330](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/5p3gSM_image-20221117112350330.png)

   移除文件之后，可以发现本地仓库大小已缩减至 `1M`，瘦身很明显

   ![image-20221117112651822](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/08g0E3_image-20221117112651822.png)

   > `git filter-repo` 每次运行都会创建一个新的 `commit-map` 文件，并覆盖上一次运行中的 `commit-map`。**每次**运行都需要此文件。每次运行 `git filter-repo` 时都执行下一步。

## 变更远程仓库

前面操作的都是本地文件，需要提交变更记录到远程。

1. 因为从包文件克隆会将 `origin` 远端设置为本地包文件，删除这个 `origin` 远端，并将其设置为您的仓库的 URL：

   ```bash
   $ git remote remove origin
   $ git remote add origin https://gitlab.example.com/<namespace>/<project_name>.git
   ```

2. 强制推送你的更改以覆盖 GitLab 上的所有分支：

   ```bash
   $ git push origin --force 'refs/heads/*'
   ```

   [受保护的分支](https://docs.gitlab.cn/jh/user/project/protected_branches.html) 会导致失败。要继续，您必须移除分支保护、推送，然后重新启用受保护的分支。

3. 要从标签版本中删除大文件，请强制将您的更改推送到 GitLab 上的所有标签：

   ```bash
   $ git push origin --force 'refs/tags/*'
   ```

   [受保护的标签](https://docs.gitlab.cn/jh/user/project/protected_tags.html) 会导致失败。要继续，您必须移除标签保护、推送，然后重新启用受保护的标签。

4. 为了防止不再存在的提交的死链接，推送由 `git filter-repo` 创建的 `refs/replace`。

   ```bash
   $ git push origin --force 'refs/replace/*'
   ```

> 📢
>
> 1.  **等待至少 30 分钟，因为仓库清理流程只处理超过 30 分钟的对象**。
> 2.  运行仓库清理

## 仓库清理

上传 `commit-map` 文件，这个文件是`git filter-repo`执行过程中生成的，点击**开始清理**。

> 如果您的 `commit-map` 文件大于 250KB 或 3000 行，则可以将文件拆分并逐个上传：
>
> ```bash
> $ split -l 3000 filter-repo/commit-map filter-repo/commit-map-
> ```

![image-20221117114155484](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/qYQDQ7_image-20221117114155484.png)

![image-20221117113956285](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/un8gss_image-20221117113956285.png)

## 最后

等待远程仓库清理完成之后，我们再**重新 clone 一份代码**，可以很明显的发现克隆速度变快了许多，仓库体积减小了

瘦身前：

![image-20221117125549419](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/kuXjI6_image-20221117125549419.png)

![image-20221117125812658](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/Lk7jGd_image-20221117125812658.png)
![image-20221117115121242](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/1zzBkB_image-20221117115121242.png)瘦身后：

![image-20221117125458556](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/lhTffb_image-20221117125458556.png)

![image-20221117125739059](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/wM8VNj_image-20221117125739059.png)

![image-20221117114603482](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/dBi4jQ_image-20221117114603482.png)

注意 📢：

1. 操作前通知所有人将手头代码提交到远程
2. 开始操作后，禁止大家提交代码
3. **操作完通知大家重新 clone**
4. 记得补充 `.gitignore` & 还原设置。（受保护的分支、tags 继续保护起来）

## 参考链接

- [减少仓库大小](https://docs.gitlab.cn/jh/user/project/repository/reducing_the_repo_size_using_git.html)
- [Reduce repository size](https://docs.gitlab.com/ee/user/project/repository/reducing_the_repo_size_using_git.html)
- [Git 瘦身](https://action121.github.io/2020/09/02/Git%E7%98%A6%E8%BA%AB.html)
