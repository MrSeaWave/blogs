---
title: Node.js设置定时任务
author: Sea
toc: true
date: 2021-07-13 15:49:23
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/kAPfPH_leo-aveiro-qw-01-a.jpg
tags: [cron, node, schedule]
categories: [cron]
---

在实际开发项目中，会遇到很多定时任务的工作。比如：定时导出某些数据、定时发送消息或邮件给用户、定时备份什么类型的文件等等>

一般可以写个定时器，来完成相应的需求，在 node.js 中自已实现也非常容易，接下来要介绍的是[`node-schedule`](https://www.npmjs.com/package/node-schedule)来完成定时任务

<!--more-->

## 安装

```bash
$ yarn add node-schedule
```

## 基础用法

使用 `schedule.scheduleJob()` 即可创建一个定时任务，一个简单的上手示例：

```js
const schedule = require('node-schedule');

// 当前时间的秒值为 10 时执行任务，如：2021-7-8 13:25:10
let job = schedule.scheduleJob('10 * * * * *', () => {
  console.log('job schedule', new Date());
});
```

时间数值按下表表示:

```bash
*  *  *  *  *  *
┬  ┬  ┬  ┬  ┬  ┬
│  │  │  │  │  |
│  │  │  │  │  └ 星期几，取值：0 - 7，其中 0 和 7 都表示是周日
│  │  │  │  └─── 月份，取值：1 - 12
│  │  │  └────── 日期，取值：1 - 31
│  │  └───────── 时，取值：0 - 23
│  └──────────── 分，取值：0 - 59
└─────────────── 秒，取值：0 - 59（可选）
```

也可以指定一个具体的时间，如：

```js
const schedule = require('node-schedule');

// 定义一个未来的时间
let date = new Date(2021, 6, 13, 15, 50, 0);

// 定义一个任务
let job = schedule.scheduleJob(date, () => {
  console.log('job schedule', new Date());
});
```

## 进阶用法

除了基础的用法，我们还可以使用一些更为灵活的方法来实现定时任务。

### 隔一段时间执行一次

```js
const schedule = require('node-schedule');

// 定义规则
let rule = new schedule.RecurrenceRule();
rule.second = [0, 10, 20, 30, 40, 50]; // 每隔 10 秒执行一次 可使用 0/10 * * * * *

// 启动任务
let job = schedule.scheduleJob(rule, () => {
  console.log('job schedule', new Date());
});
```

`rule` 支持设置的值有 `second`、`minute`、`hour`、`date`、`dayOfWeek`、`month`、`year` 等用法，如：

#### 每秒执行

```js
rule.second = [0,1,2,3......59];
```

#### 每分钟 0 秒执行

```js
rule.second = 0;
```

#### 每小时 30 分执行

```js
rule.minute = 30;
rule.second = 0;
```

#### 每天 0 点执行

```js
rule.hour = 0;
rule.minute = 0;
rule.second = 0;
```

#### 每月 1 号的 10 点执行

```js
rule.date = 1;
rule.hour = 10;
rule.minute = 0;
rule.second = 0;
```

#### 每周一、周三、周五的 0 点和 12 点执行

```js
rule.dayOfWeek = [1, 3, 5];
rule.hour = [0, 12];
rule.minute = 0;
rule.second = 0;
```

### 设定开始时间与结束时间

```js
const startTime = new Date(Date.now() + 5000);
const endTime = new Date(startTime.getTime() + 5000);
const job = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function () {
  console.log('job schedule', new Date());
});
```

## 取消任务

可以使用 `cancel()` 终止一个运行中的任务。

```js
job.cancel();
```

> 注意：在使用 pm2 cluster 模式启动会导致定时任务多次执行，解决办法：
>
> - pm2 启动会默认自带一个 `'NODE_APP_INSTANCE'` 的环境变量, 它从 0 开始自增, 永远不能能重复, 每一个 worker 拥有一个值
> - 程序中启动定时任务, 或者执行方法的时候判断下`if(process.env.NODE_APP_INSTANCE === '0'){// TO DO ...} `这样就可以在某个 worker 里执行一次（`NODE_APP_INSTANCE` 也可以在 pme.json 中重命名该变量名称` instance_var: 'INSTANCE_ID'`）

最终封装代码如下：

```js
// 设定定时任务
const schedule = require('node-schedule');
// 解析cron表达式
const parser = require('cron-parser');

// 允许'0'号进程设定定时任务，防止 pm2 多实例冲突
const isAllowWorkerSchedule = !process.env.NODE_APP_INSTANCE || process.env.NODE_APP_INSTANCE === '0';

/**
 * @desc 解析cron表达式
 * @param {string} cron cron 表达式
 * @param {object} [options] 配置
 * @return {string[]}
 */
function parserCron(cron, options) {
  const interval = parser.parseExpression(cron, options);
  const dates = new Array(5).fill('').map((i) => interval.next().toString());
  console.log('parserCron:\n');
  console.log(dates.join('\n'));
  return dates;
}

/**
 * @desc 运行定时器
 * @param {string} cron cron 表达式
 * @param {function} func 函数
 * @return {*}
 */
function runScheduleCronStyle(cron, func) {
  console.log('进程process.env.NODE_APP_INSTANCE:', process.env.NODE_APP_INSTANCE);
  // 只在某个worker里运行，防止pm2 启动多个定时,(process.env.NODE_APP_INSTANCE === '0')
  if (!isAllowWorkerSchedule) {
    console.log('不允许开启定时器');
    return;
  }

  console.log('开始定时器:', cron);
  parserCron(cron);
  const job = schedule.scheduleJob(cron, func);
  return job;
}

/**
 * @desc 运行指定时间内的定时器
 * @param {object} d
 * @param {string} d.cron cron 表达式
 * @param {Date} [d.startTime] 开始时间
 * @param {Date} [d.endTime] 结束时间
 * @param {function} func 函数
 * @return {*}
 */
function runAreaScheduleCronStyle({ cron, startTime, endTime }, func) {
  console.log('进程process.env.NODE_APP_INSTANCE:', process.env.NODE_APP_INSTANCE);
  // 只在某个worker里运行，防止pm2 启动多个定时,(process.env.NODE_APP_INSTANCE === '0')
  if (!isAllowWorkerSchedule) {
    console.log('不允许开启定时器');
    return;
  }

  console.log('开始指定时间内定时器:', cron);
  parserCron(cron, { currentDate: startTime, endDate: endTime });
  const job = schedule.scheduleJob({ rule: cron, start: startTime, end: endTime }, func);
  return job;
}

/**
 * @desc 取消当前的job任务
 * @param job
 * @param {boolean} [reschedule]
 */
function cancelScheduleJob(job, reschedule) {
  if (!isAllowWorkerSchedule) return;
  console.log('取消定时器');
  job.cancel(reschedule);
}

const job = runScheduleCronStyle('0/10 * * * * *', () => {
  console.log('job--:' + new Date());
});

const jobArea = runAreaScheduleCronStyle(
  { cron: '0/10 * * * * *', startTime: new Date('2021/07/13 16:30'), endTime: new Date('2021/07/13 16:31:20') },
  () => {
    console.log('jobArea--:' + new Date());
  }
);

const job2 = runScheduleCronStyle('0/20 * * * * *', () => {
  console.log('job2--:' + new Date());
});

// 一分钟后关闭
setTimeout(() => cancelScheduleJob(job), 60 * 1000);
```

## 参考链接

- [Node.js 设置定时任务：node-schedule 模块的使用](https://segmentfault.com/a/1190000022455361)
- [如何解决 pm2 部署 nodejs 项目时 node-schedule 这类模块重复执行？](https://segmentfault.com/q/1010000002805686)
- [Nodejs 学习笔记（十二）--- 定时任务（node-schedule)](https://www.cnblogs.com/zhongweiv/p/node_schedule.html)
- [node-schedule](https://www.npmjs.com/package/node-schedule)
