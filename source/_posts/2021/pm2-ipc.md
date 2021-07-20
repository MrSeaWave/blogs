---
title: pm2进程间通信
author: Sea
toc: true
date: 2021-07-20 15:44:42
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/BlZSEv_ichi-wang-asset.jpg
tags: [pm2, ipc]
categories: [pm2]
---

本文将介绍 pm2 进程间如何通信

<!--more-->

`pm2-master.js`，发送数据，可以在 pm2 内部或者外部运行

```js
const pm2 = require('pm2');
const neighborIds = [];

pm2.connect(function () {
  // 列出正在运行的进程并获取它们的名称/ID
  pm2.list(function (err, processes) {
    for (const i in processes) {
      console.log('Id:', processes[i].pm_id, 'Name:', processes[i].name);

      if (processes[i].name === 'pm2-slave') {
        neighborIds.push(processes[i].pm_id);
      }
    }

    console.log('neighborIds: ', neighborIds);

    // 将信息发送到指定进程
    pm2.sendDataToProcessId(
      neighborIds[0],
      {
        type: 'process:msg',
        data: {
          some: 'data',
        },
        topic: true,
      },
      function (err, res) {
        console.log('callback', err, res);
      }
    );
  });
});

// 接收信息
pm2.launchBus(function (err, pm2_bus) {
  pm2_bus.on('process:msg', function (packet) {
    console.log('pm2-master launchBus', packet);
  });
});
```

`pm2-slave.js`，接收数据，不需要引用 pm2 的包，**但是一定要在 pm2 里运行**

```js
const sendMsgToMaster = () => {
  process.send({
    type: 'process:msg',
    data: {
      success: true,
      num: Math.random(),
    },
  });
};

process.on('message', function (packet) {
  console.log('got message from pm2-master', packet);
  setTimeout(sendMsgToMaster, 2 * 1000);
});
```

`ecosystem.config.js`，pm2 配置

```js
module.exports = {
  apps: [
    // pm2-master 可以不用 pm2 运行
    // {
    //   name: 'pm2-master',
    //   script: './pm2-master.js',
    //   instances: 1,
    //   watch: ['pm2-master.js'],
    //   merge_logs: true,
    //   exec_mode: 'cluster',
    //   max_memory_restart: '600M',
    //   instance_var: 'NODE_APP_INSTANCE'
    // },
    {
      name: 'pm2-slave',
      script: './pm2-slave.js',
      watch: ['pm2-slave.js'],
      exec_mode: 'cluster',
    },
  ],
};
```

## 参考链接

- [process.send](http://nodejs.cn/api/process.html#process_process_send_message_sendhandle_options_callback)
- [process.on](http://nodejs.cn/api/process.html#process_process_events)
- [pm2 Send message to process](https://pm2.keymetrics.io/docs/usage/pm2-api/#send-message-to-process)
- [pm2-ipc.js](https://gist.github.com/nethoncho/b1160edacfe3e12a336c34e98f04cb2a)
- [Sending data to PM2 process using programatic API](https://stackoverflow.com/a/35504369/3386260)
