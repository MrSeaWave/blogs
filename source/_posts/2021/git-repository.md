---
title: git-repository
author: Sea
toc: true
date: 2021-06-03 17:04:48
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/fqdGaY_sergey-vasnev-temple2.jpeg
tags: [git, empty, repository, github]
categories: [git]
---

本文讲述如何上传本地代码到远程的空仓库。

<!--more-->

##### Create a new repository

```bash
git clone https://github.com/MrSeaWave/tem.git
cd tem
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master
```

##### Push an existing folder

```bash
cd existing_folder
git init
git remote add origin https://github.com/MrSeaWave/tem.git
git add .
git commit -m "Initial commit"
git push -u origin master
```

##### Push an existing Git repository

```bash
cd existing_repo
git remote rename origin old-origin
git remote add origin https://github.com/MrSeaWave/tem.git
git push -u origin --all
git push -u origin --tags
```
