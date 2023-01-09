---
title: 使用 depcheck 清理 package.json 中用不到的依赖
author: Sea
toc: true
date: 2022-02-10 10:39:06
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/LTI6FJ_nikita-s-shot1.jpeg
tags: [Pkg, Dependencies, Clean]
categories: [技术]
---

## 背景

随着时间的推移，项目中 package.json 中的依赖越来越臃肿，安装依赖的速度越来越慢，各种奇奇怪怪的包，不一定都会用到，因此我们可以为项目减负，使用 [depcheck](https://www.npmjs.com/package/depcheck) 检测项目中不用的依赖包，然后移除它们。

<!--more-->

## 安装

```bash
$ npm install -g depcheck
```

需要 **node.js >= 10**

## 使用

在项目目录下直接执行命令 depcheck，或者 depcheck <你的项目目录>

然后会出来这样的结果：

```bash
$> depcheck /path/to/my/project
Unused dependencies
* underscore
Unused devDependencies
* jasmine
Missing dependencies
* lodash
```

**Unused 表示没有使用的依赖包，Missing 表示使用到了但是没有在 json 文件中声明的依赖包**

需要注意特殊的包。如官网所述：

![image-20220210105123667](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/RDIk4o_image-20220210105123667.png)

不过可以使用参数过滤掉不想被检测的文件或者不想检测出来的包

**常用的参数：**

- `--skip-missing=[true | false]`：默认 false，表示是否检测 Missing 的依赖包
- `--ignore-bin-package=[true | false]`：默认 false，表示是否忽略包含 bin 条目的包
- `--json`：表示所有包的检测结果以 json 格式输出，大概就是 XX 包在哪些文件使用了，`{"包名":["path1","path2"]}`
- `--ignores="eslint,babel-*"`：表示要忽略的包名称（逗号分隔），比如 `depcheck --ignores="eslint,@babel/*,babel-*"`
- `--ignore-path`：表示要忽略的文件的模式的文件的路径，比如 `depcheck --ignore-path=.eslintignore`
- `--ignore-dirs`：已经弃用，使用 `--ignore-patterns` 替代，表示要忽略的目录名，逗号分隔`--ignore-dirs=dist,coverage`
- `--ignore-patterns`：表示要忽略的用逗号分隔的模式描述文件，比如 `depcheck --ignore-patterns=build/Release,dist,coverage,*.log`
- `--parsers, --detectors and --specials`：高级的语法使用参考[官方文档](https://github.com/depcheck/depcheck/blob/master/doc/pluggable-design.md)
- `--config=[filename]`：外部配置文件

**注意**：也可以创建一个 `.depcheckrc` 文件（`yml/json`格式），然后直接配置

```yaml
ignores: ['eslint', 'babel-*', '@babel/*']
skip-missing: true
```

> 注：结果仅供参考，移除相应依赖一定要小心！！！

## 参考链接

- [depcheck](https://www.npmjs.com/package/depcheck)

- [使用 depcheck 清理 package.json 中用不到的套件](https://oranwind.org/node-js-depcheck/)
