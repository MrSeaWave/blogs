---
title: 阅读 only-allow
author: Sea
toc: true
date: 2022-01-25 17:00:00
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/pLHqhA_inhyuk-lee-1.jpg
tags: [only-allow, analysis]
categories: [analysis]
---

**一行代码统一规范包管理器**: [only-allow](https://github.com/pnpm/only-allow)，强制在项目上使用特定的包管理器

<!--more-->

## 场景

在实际开发时，往往需要限定包管理器，来保证同样的开发。但是这种通常都是口头相传，并没有强制约束，因此就有了本文的[only-allow](https://github.com/pnpm/only-allow)

## only-allow 介绍

> Force a specific package manager to be used on a project

强制在项目上使用特定的包管理器。

如：强制使用 yarn

```json
{
  "scripts": {
    "preinstall": "npx only-allow yarn"
  }
}
```

> 注：npm 命令钩子
>
> - `preinstall`: 在`npm install`命令前执行
> - `install,postinstall`： 在`npm install`命令后执行

## 源码

我们通过查看 `package.json` 文件。

```json
{
  "bin": "bin.js"
}
```

确定入口文件：`bin.js`

```js
#!/usr/bin/env node
const whichPMRuns = require("which-pm-runs");
const boxen = require("boxen");

const argv = process.argv.slice(2);
if (argv.length === 0) {
  console.log(
    "Please specify the wanted package manager: only-allow <npm|pnpm|yarn>"
  );
  process.exit(1);
}
// 用户规定的包管理器，例如 npx only-allow yarn ，那么wantedPM 为 yarn
const wantedPM = argv[0];
if (wantedPM !== "npm" && wantedPM !== "pnpm" && wantedPM !== "yarn") {
  console.log(
    `"${wantedPM}" is not a valid package manager. Available package managers are: npm, pnpm, or yarn.`
  );
  process.exit(1);
}

// 用户当前安装时 使用的包管理器
const usedPM = whichPMRuns();

// 希望使用的包管理器 不相等，则报错。
// - npm  提示使用 npm install
// - pnpm 提示使用 pnpm install
// - yarn 提示使用 yarn install
// 最后退出进程
if (usedPM && usedPM.name !== wantedPM) {
  // boxenOPts: boxen 的配置
  // boxen 能让terminal的输出展示盒装的样式,让终端提示更明显
  const boxenOpts = { borderColor: "red", borderStyle: "double", padding: 1 };
  switch (wantedPM) {
    case "npm":
      console.log(
        boxen('Use "npm install" for installation in this project', boxenOpts)
      );
      break;
    case "pnpm":
      console.log(
        boxen(
          `Use "pnpm install" for installation in this project.

If you don't have pnpm, install it via "npm i -g pnpm".
For more details, go to https://pnpm.js.org/`,
          boxenOpts
        )
      );
      break;
    case "yarn":
      console.log(
        boxen(
          `Use "yarn" for installation in this project.

If you don't have Yarn, install it via "npm i -g yarn".
For more details, go to https://yarnpkg.com/`,
          boxenOpts
        )
      );
      break;
  }
  process.exit(1);
}
```

其中使用到

- [boxen](https://www.npmjs.com/package/boxen): 让 `terminal`的输出展示盒装的样式，让终端提示更明显
- [which-pm-runs](https://www.npmjs.com/package/which-pm-runs): 当前运行的是哪一个包管理器

### which-pm-runs 源码

源码比较简单，这里一起讲下：

```js
"use strict";

module.exports = function () {
  if (!process.env.npm_config_user_agent) {
    return undefined;
  }
  return pmFromUserAgent(process.env.npm_config_user_agent);
};

// process.env.npm_config_user_agent: pnpm/6.22.2 npm/? node/v14.18.1 darwin x64
// 获取到当前运行脚本的包管理器和版本号
function pmFromUserAgent(userAgent) {
  const pmSpec = userAgent.split(" ")[0];
  const separatorPos = pmSpec.lastIndexOf("/");
  return {
    name: pmSpec.substr(0, separatorPos),
    version: pmSpec.substr(separatorPos + 1),
  };
}
```

## 总结

最后，在 [only-allow](https://github.com/gs-analysis/only-allow) 上可查看本篇源码文章~

## 参考链接

- [only-allow](https://github.com/pnpm/only-allow)
- [scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts)
- [从 vue3 和 vite 源码中，我学到了一行代码统一规范团队包管理器的神器](https://juejin.cn/post/7033560885050212389)
