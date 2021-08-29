---
title: remote Support for password authentication was removed on August 13, 2021
author: Sea
toc: true
date: 2021-08-29 11:58:38
cover:
tags: [github, token]
categories: [github]
---

本文主要介绍 github 开发人员在七夕搞事情：`remote: Support for password authentication was removed on August 13, 2021.`

<!--more-->

## 问题描述

如果你在`七夕`（没错就是 2021 年 8 月 14 日）的这一天刚好加班，又刚好去访问了全球最大的同性交友网站，又刚好去更新提交代码，又或你创建了一个新的仓库送给自己，又刚好想把这个仓库送给`（push）github`，你就刚好会遇到这个问题：`remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.`

具体如下：

```shell
$ git push
remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
fatal: Authentication failed for 'https://github.com/MrSeaWave/blogs.git/'
```

这是什么情况，大概意思就是`你原先的密码凭证从2021年8月13日`开始就不能用了，`必须使用个人访问令牌（personal access token）`，就是把你的`密码`替换成`token`！

## github 为什么要把密码换成 token

[官方解释](https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/)

修改为 token 的好处

`令牌（token）`与基于密码的身份验证相比，令牌提供了许多安全优势：

1. 唯一： 令牌特定于 GitHub，可以按使用或按设备生成

2. 可撤销：可以随时单独撤销令牌，而无需更新未受影响的凭据
3. 有限 ： 令牌可以缩小范围以仅允许用例所需的访问
4. 随机：令牌不需要记住或定期输入的更简单密码可能会受到的字典类型或蛮力尝试的影响

## 如何生成自己的 token

1. 在`个人设置页面`，找到`Setting` [链接](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)

   ![image-20210829121216988](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/eY0yCA_image-20210829121216988.png)

2、选择设置`Developer setting`，选择个人访问令牌`Personal access tokens`，然后选中生成令牌`Generate new token`

![image-20210829121349085](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/mbPg1b_image-20210829121349085.png)

3. 设置 token 的有效期，访问权限等

   选择要授予此`令牌token`的`范围`或`权限`。

- 要使用`token`从命令行访问仓库，请选择`repo`。
- 要使用`token`从命令行删除仓库，请选择`delete_repo`
- 其他根据需要进行勾选

  ![image-20210829121516730](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/NL54PQ_image-20210829121516730.png)

4. 生成令牌`Generate token`

   ![image-20210829121622426](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/rbldTJ_image-20210829121622426.png)

   ![image-20210829121750465](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/0HXzt4_image-20210829121750465.png)

   > 注意：记得及时把你的 token 保存下来，因为你再次刷新网页的时候，你已经没有办法看到它了

5. 之后用自己生成的`token`登录，把上面生成的`token`粘贴到`输入密码的位置`，然后成功`push`代码！

```shell
$ git push
Username for 'https://github.com': MrSeaWave
Password for 'https://MrSeaWave@github.com':
husky > pre-push (node v14.17.5)
---- push files ----
Enumerating objects: 11, done.
Counting objects: 100% (11/11), done.
Delta compression using up to 4 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (6/6), 755 bytes | 755.00 KiB/s, done.
Total 6 (delta 4), reused 0 (delta 0)
remote: Resolving deltas: 100% (4/4), completed with 4 local objects.
To https://github.com/MrSeaWave/blogs.git
   5162910..388fa6f  master -> master
```

也可以 把`token`直接添加远程仓库链接中，这样就可以避免同一个仓库每次提交代码都要输入`token`了：

> `git remote set-url origin https://<your_token>@github.com/<USERNAME>/<REPO>.git`

- ` <your_token>`：换成你自己得到的 `token`

- `<USERNAME>`：是你自己`github`的用户名

- `<REPO>`：是你的仓库名称

例如：

> `git remote set-url origin https://ghp_LJGJUevVou3FXXXXXXXXXXXXXX@github.com/MrSeaWave/blogs/`

## FAQ

1. 如果 `push` 等操作没有出现`输入密码选项`，请先输入如下命令，之后就可以看到输入密码选项了

   > `git config --system --unset credential.helper`

2. `SourceTree`也遇到类似问题

   当`SourceTree`提交时遇到：

   ```she
   Pushing to https://github.com/MrSeaWave/MacApp.git
   remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
   remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
   fatal: Authentication failed for 'https://github.com/MrSeaWave/MacApp.git/'
   Pushing to https://github.com/MrSeaWave/MacApp.git
   remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
   remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
   fatal: Authentication failed for 'https://github.com/MrSeaWave/MacApp.git/'
   Pushing to https://github.com/MrSeaWave/MacApp.git
   remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
   remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
   fatal: Authentication failed for 'https://github.com/MrSeaWave/MacApp.git/'
   Pushing to https://github.com/MrSeaWave/MacApp.git
   remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
   remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
   fatal: Authentication failed for 'https://github.com/MrSeaWave/MacApp.git/'
   ```

   1. 可以`git remote set-url origin https://<your_token>@github.com/<USERNAME>/<REPO>.git`

   2. 也可以：（密码处填写`token`）

   ![image-20210829125142006](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/wp7uaH_image-20210829125142006.png)

   ## 参考链接

3. [Token authentication requirements for Git operations](https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/)
4. [Creating a personal access token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)
5. [github 开发人员在七夕搞事情：remote: Support for password authentication was removed on August 13, 2021.](https://blog.csdn.net/weixin_41010198/article/details/119698015)

6. [GitHub 不再支持密码验证解决方案：SSH 免密与 Token 登录配置](https://cloud.tencent.com/developer/article/1861466)
