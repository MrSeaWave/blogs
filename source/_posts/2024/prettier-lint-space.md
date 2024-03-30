---
title: Prettier V3 中英文之间不支持空格
author: Sea
toc: true
date: 2024-03-30 08:54:17
cover: https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2024/1711762533890_P5S3TX.png
tags:
categories: ['技术']
---

最近在做 blog 依赖升级，使用 `pnpm update --latest` 升级完所有的依赖后，发现 `prettier@3` 不再支持[盘古之白](https://github.com/vinta/pangu.js/blob/master/README.md)（分隔中文与英语的空白间隔）

<!-- more -->

## 解决办法

参考[官网](https://prettier.io/blog/2023/07/05/3.0.0.html#stop-inserting-spaces-between-chinese-or-japanese-and-western-characters)，如果需要一个强制间距样式的工具，请考虑 [textlint-ja](https://github.com/textlint-ja/textlint-rule-preset-ja-spacing/tree/master/packages/textlint-rule-ja-space-between-half-and-full-width) 或 [lint-md](https://github.com/lint-md/lint-md)（规则 `space-round-alphabet` 和 `space-round-number`），需要引入额外的插件配置，配不动了，因此我选择降级至 `prettier@2.8.8`，没啥太大影响，后续可能会再次升级。

## 额外补充

按照[w3c](https://www.w3.org/TR/clreq/#mixed_text_composition_in_horizontal_writing_mode)标准，

> In horizontal writing mode, the basic approach uses proportional fonts to represent Western alphas and uses proportional or monospace fonts for European numerals. In principle, there is tracking or spacing between an adjacent Han character and a Western character of up to 1/4 em, except at the line start or end.
> 横排时，西文字母使用比例字体；阿拉伯数字则常用比例字体或等宽字体。原则上，汉字与西文字母、数字间使用不多于四分之一个汉字宽的字距或空白。但西文出现在行首或行尾时，则无须加入空白。

看其意思，应该也是需要空格的（or 间距）。

按照 [中华人民共和国新闻出版行业标准 CY/T 154—2017 号《中文出版物夹用英文的编辑规范》第 8.1 节](http://sxqx.alljournal.cn/uploadfile/sxqx/20190304/CY%20T154%E2%80%942017%20%E4%B8%AD%E6%96%87%E5%87%BA%E7%89%88%E7%89%A9%E5%A4%B9%E7%94%A8%E8%8B%B1%E6%96%87%E7%9A%84%E7%BC%96%E8%BE%91%E6%A0%87%E5%87%86.pdf)

> 中文文本中夹用英文时，应根据所选用的中英文字体、字符间距以及排版的视觉效果决定英文词句与中文文字之间是否留有空格间距。如留空格，应保证体例的统一。

借鉴[知乎上 - 梁海的回答](https://www.zhihu.com/question/19587406/answer/12298128)

> 我坚持要在混排中加空格，主要是我觉得两种文字的交界处应该是个尽量平滑的过渡，尽量满足双方文字的需求，并且让文本的节奏尽量平稳

**混排加空格主要是为了顺滑！视觉美化**

> 另外如果需要加空格，这事也不该由写作者自己输入，工具该自动化执行。

## 参考链接

- [Prettier 3.0: Hello, ECMAScript Modules! · Prettier](https://prettier.io/blog/2023/07/05/3.0.0.html#stop-inserting-spaces-between-chinese-or-japanese-and-western-characters)
- [Markdown: Add an option to re-enable Prettier 2.x's automatic space insertion in CJK · Issue #15015 · prettier/prettier](https://github.com/prettier/prettier/issues/15015)
- [盘古之白 | M-x Chris-An-Emacser](https://chriszheng.science/2015/10/08/Pangu-spacing/)
- [中西文混排时汉字与拉丁字母之间是否要有空格？ - 知乎](https://www.zhihu.com/question/19587406)
- [中文文案排版指北](https://github.com/sparanoid/chinese-copywriting-guidelines)
- [document-style-guide: 中文技术文档的写作规范](https://github.com/ruanyf/document-style-guide)
