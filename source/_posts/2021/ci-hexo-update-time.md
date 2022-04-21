---
title: 修复 CI 构建博客造成的更新时间错误
author: Sea
toc: true
date: 2021-01-07 15:53:16
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/dtAx7s_image-20210107155558692.png
tags: [hexo, ci]
categories:
  - [hexo]
---

当使用 `Travis CI` or `Github Actions` 自动化部署时，发现部署成功后，所有文章的更新时间都变成了此次提交修改的时间，但有些文章在上一次提交后是没有发生过任何修改的。

这是因为 `git` 在推送更新时，并不记录保存文件的访问时间、修改时间等元信息，（[原因在这里](https://git.wiki.kernel.org/index.php/Git_FAQ?spm=a2c4e.10696291.0.0.671919a4OeAqE1#Why_isn.27t_Git_preserving_modification_time_on_files.3F)）所以每次使用 `git` 把项目 `clone` 下来时，文件的时间都是克隆时的时间。又因为如果没有在 `front-matter` 中指定 `updated`，`Hexo` 会默认使用文件的最后修改时间作为文章的更新时间，所以会出现所有文章的更新时间都发生变化的情况。

<!-- more -->

总的来说，使用 `git clone` 下来的文件的时间都不是原来文件的时间，而自动化部署每次都需要 `clone` 源码才能进行后面的生成和部署操作，所以目前如果想正确显示更新时间。需要：

## 方法一：使用 updated 属性字段

在文章中的`front-matter`中添加`updated: 更新时间`项

```yaml front-matter
title: 修复 CI 构建博客造成的更新时间错误
author: Sea
toc: true
date: 2021-01-07 15:53:16
updated: 2021-01-07 15:53:16
```

![image](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/dtAx7s_image-20210107155558692.png)

以后修改文件的话也只需修改`updated`项对应日期即可，但是这样有个弊端，完全需要靠自己自觉去修改更新时间，自己一旦忘掉，那么更新时间的意义也就荡然无存了，因此这里推荐第二种方法。

## 方法二：使用 git 推送时间

如果你用的是`Travis Ci`的话，只需要在`.travis.yml`添加如下配置：

```yaml .travis.yml
before_install:
  # Restore last modified time
  - 'git ls-files -z | while read -d '''' path; do touch -d "$(git log -1 --format="@%ct" "$path")" "$path"; done'
```

如果你用的是`Github Actions`的话，只需要在对应的`yml`添加如下配置：

```yml actions
jobs:
  <jobs_id>:
    steps:
      - name: Restore file modification time
        run: |
          git ls-files -z | while read -d '' path; do touch -d "$(git log -1 --format="@%ct" "$path")" "$path"; done
```

当然`git ls-files` 如果不好用可以改成 `find`：

```bash bash
find source/_posts -name '*.md' | while read file; do touch -d "$(git log -1 --format="@%ct" "$file")" "$file"; done
```

实际上，`clone` 下来的文件的时间还是克隆时的时间，然后通过上面的命令，它将 `clone` 下来的文件的时间改成了该文件最近一次变动的推送时间（也即文件最后一次修改的 `push` 时间）。

> **注**：如果`github actions`中使用`actions/checkout@v2`，请设定它的参数`fetch-depth: 0`，因为`0`表示获取所有分支和标签的所有历史记录。默认值为`1`

小知识：

```bash bash
# 获取 git 仓库中所有文件的最新修改时间
git ls-tree -r --name-only HEAD | while read filename; do
  echo "$(git log -1 --format="%ad" -- $filename) $filename"
done
# 获取 git 仓库中所有文件的最初创建时间
git ls-tree -r --name-only HEAD | while read filename; do
	echo "$(git log --format="%ad" -- $filename | tail -1) $filename"
done
```

## 参考链接

- [GIT 获取文件最初创建及最新修改日期](https://github.com/Dream4ever/Knowledge-Base/issues/69)
- [How to retrieve the last modification date of all files in a git repository](https://serverfault.com/a/401450)：介绍了如何获取 git 仓库中，所有文件的最新修改时间。
- [Finding the date/time a file was first added to a Git repository](https://stackoverflow.com/a/2390382/2667665)：介绍了如何获取 git 仓库中，所有文件最初的创建时间。
- [Hexo 相关问题和优化](https://wylu.me/posts/78c745f0/)
- [The update time of the article is incorrect](https://github.com/theme-next/hexo-theme-next/issues/893)
- [修复 CI 构建博客造成的更新时间错误](https://moonbegonia.xyz/fix-wrong-updated-time-with-ci/)
