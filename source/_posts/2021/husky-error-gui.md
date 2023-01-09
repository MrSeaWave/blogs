---
title: Husky hooks skipped
author: Sea
toc: true
date: 2021-04-02 23:28:00
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/VgzPiK_louise-meijer-conc-envmistyhills3.jpg
tags: [Git, GitHub, Hooks, Husky, Sourcetree]
categories:
  - [技术]
  - [Tools]
---

在`sourceTree`遇到使用`husky` 会报错的情况：

```bash error
....
Can't find yarn in PATH:......
Skipping pre-push hook
```

<!--more-->

解决方案：

add this in `~/.huskyrc`:

```bash huskyrc
PATH="/usr/local/bin:$PATH"
```

## 参考链接

- [Husky hooks skipped](https://github.com/typicode/husky/issues/639#issuecomment-573281096)
- [Commit hooks are skipped due to PATH issues](https://jira.atlassian.com/browse/SRCTREE-7184)
