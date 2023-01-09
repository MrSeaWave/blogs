---
title: 定制 Github 主页
author: Sea
toc: true
date: 2022-01-27 14:55:10
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/CRyaoA_image-20220127171125602.png
tags: [GitHub]
categories: [技术]
---

Github 作为一个资源托管平台，我们有没有想过在主页锦上添花否？

> 这不，你可以通过 yourUsername/yourUsername 来制作你的名片。

先跟大家展示下我最终实现的效果，在线体验地址：[Github 主页](https://github.com/MrSeaWave)。

<!--more-->

## 创建仓库

- 首先，登录你的[Github](https://github.com/)账号：

- 登录后，创建一个和你用户名相同的仓库，填写仓库介绍、设置公开权限、添加 README.md 文件，如下所示:

​ ![image-20220127150410701](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/K4dvQH_image-20220127150410701.png)

- 最后点击` Create repository`按钮，即可完成仓库创建。

## 界面美化

我们创建完仓库后，进入自己的个人主页，即：github.com/你的用户名。

我们能看到的页面如下所示，红框部分就是我们刚才创建仓库的`README.md`文件里的内容。

![image-20220127150623572](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/J4YOHq_image-20220127150623572.png)

![image-20220127150646339](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/ozXxKs_image-20220127150646339.png)

因此，我们只需要修改我们刚才创建的仓库中的 README.md 文件中的内容，我们的主页内容就会跟着更新。

### 资源

[ awesome-github-profile-readme](https://github.com/abhisheknaiidu/awesome-github-profile-readme)：里面收集了很多关于主页的模版，大家可以参考下别人的设计思路，稍微修改修改就是自己的了[旺柴]

### 个性化设计

#### **徽章(Badge)**

网站：https://shields.io/

不仅提供而且可以定制很多有趣的徽章

![image-20220127151224594](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/xUB8ku_image-20220127151224594.png)

#### 动态访问量徽章

- [visitor-badge](https://visitor-badge.glitch.me/#docs)

![image-20220127153532772](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/tGjMOE_image-20220127153532772.png)

- [Moe-counter](https://github.com/journey-ad/Moe-counter) 二次元展示访问量

  ![image-20220127154042171](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/wUJVZF_image-20220127154042171.png)

#### 项目展示卡片

[github-readme-stats](https://github.com/anuraghazra/github-readme-stats)

利用 Github 官方提供的 API 接口，我们可以得到用户自己的项目情况。

![image-20220127151557923](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/daJMG2_image-20220127151557923.png)

#### **统计代码时常**

利用 WakaTime 对事情的统计功能，并绑定到 Github 来实现展示。官网：[WakaTime](https://wakatime.com/)

总结一下简要的步骤

1. 注册 wakatime 账号

2. 在自己常用的 IDE 上下载 wakatime 插件，配置上自己的 API key

3. 将自己的 API key 存到自己 GitHub 仓库的 secrets

4. 在 README 文件上加上

```xml
  <!--START_SECTION:waka-->
  <!--END_SECTION:waka-->
```

5. 配置 GitHub 仓库的 Action，这样就能每天自动运行了

![image-20220127152252089](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/qSeDec_image-20220127152252089.png)

#### Emoji

[emoji-cheat-sheet](https://www.webfx.com/tools/emoji-cheat-sheet/)

![image-20220127152649884](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/7QORsG_image-20220127152649884.png)

[gitmoji](https://gitmoji.dev/)

![image-20220127152743133](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/YH3oqw_image-20220127152743133.png)

#### Github 关注活跃图表

由[github-readme-activity-graph](https://github.com/Ashutosh00710/github-readme-activity-graph) 提供的 api 实现:

![image-20220127153141766](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/6Gllkd_image-20220127153141766.png)

#### 获取最新博客文章

[blog-post-workflow](https://github.com/gautamkrishnar/blog-post-workflow)

![image-20220127162819942](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/JSTHcH_image-20220127162819942.png)

#### 最后

上述功能可以利用 [github-profile-readme-generator](https://github.com/rahuldkjain/github-profile-readme-generator)，你会喜欢上它的~

## 参考链接

- [定制你的 GitHub 主页](https://juejin.cn/post/6940644830179491876)
- [打造你 GITHUB 的名片](https://juejin.cn/post/6940091355632762916)
- [给自己弄一个酷酷的 Github 主页吧](https://blog.csdn.net/sinat_23133783/article/details/107643656)
