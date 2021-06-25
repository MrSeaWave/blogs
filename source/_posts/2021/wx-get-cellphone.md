---
title: 微信小程序云开发获取用户手机号
author: Sea
toc: true
date: 2021-02-03 13:39:49
cover:
tags: [微信小程序, 云开发]
categories:
  - [小程序, 微信小程序]
---

在网上搜索时，大部分微信小程序[云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)获取手机号码的例子还都是需要通过`code`获取`session_key`来解密信息取得手机号码，总感觉哪里不对，官网上都已经说过，云开发是自动鉴权的，不应该还要解密,因此下面介绍如何使用云开发获取用户信息数据。

<!-- more -->

## 具体步骤

1，页面 `cellphone.wxml`

```wxml cellphone.wxml
<button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"></button>
```

2，文件`cellphone.js`

```js cellphone.js
Page({
  getPhoneNumber(e) {
    console.log(e.detail);
    wx.cloud
      .callFunction({
        name: 'openapi',
        data: {
          action: 'getcellphone',
          id: e.detail.cloudID,
        },
      })
      .then((res) => {
        console.log('res: ', res);
      });
  },
});
```

3，云函数 `openapi` 的`index.js`

```js index.js
// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.action) {
    case 'getcellphone': {
      return getCellphone(event);
    }
    default: {
      return;
    }
  }
};

async function getCellphone(event) {
  const res = await cloud.getOpenData({
    list: [event.id],
  });
  return { res, event };
}
```

调用后`res`数据如下

```json res
{
  "list": [
    {
      "cloudID": "***********",
      "data": {
        "phoneNumber": "****", // 用户绑定的手机号（国外手机号会有区号）
        "purePhoneNumber": "******", // 没有区号的手机号
        "countryCode": "86", // 区号
        "watermark": {
          "timestamp": 1612332238,
          "appid": "********"
        }
      }
    }
  ],
  "errMsg": "getOpenData:ok",
  "errCode": 0
}
```

全程不涉及`code`,`session_key`和加密解密啥事，即可获取到用户的手机号。

## 参考链接

- [微信小程序云开发获取手机号码](https://cloud.tencent.com/developer/article/1552012)
- [获取手机号| 微信开放文档 - 微信开放社区 - 腾讯](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html)
- [`Cloud.getOpenData(list: string[]): Object`](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/open/Cloud.getOpenData.html)
