---
title: 软删除和唯一索引
author: Sea
toc: true
date: 2022-01-10 16:20:28
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/vrWNnT_jennifer-park-e-mlf6ouyai977a.jpg
tags: [sql, mysql]
categories: [database, mysql]
---

## 背景

目前基本上在使用数据库时，都会使用到软删除（逻辑删除），但当软删除与唯一索引（`unique-key`）一起存在时可能会导致一些问题。

<!--more-->

举个例子 🌰：

当表结构为：

```sql
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

其中 `name` 字段为 唯一索引，`deleted_at` 为软删除时间。

首先我们先插入一条数据：

```sql
INSERT INTO `rocket_test`.`users` (`name`, `created_at`, `updated_at`) VALUES ('myName', '2022-01-10 16:30:10', '2022-01-10 16:30:10');
```

然后我们再将这条数据以软删除的方式删掉：

```sql
UPDATE `rocket_test`.`users` SET `deleted_at` = '2022-01-10 16:40:10' WHERE (`id` = '1');
```

数据库此时状态：

![image-20220110163612957](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/mjllS3_image-20220110163612957.png)

当我们想再次插入 `name` 为 `myName` 的数据时就会发生唯一索引冲突：

```sql
INSERT INTO `rocket_test`.`users` (`name`, `created_at`, `updated_at`) VALUES ('myName', '2022-01-10 16:30:10', '2022-01-10 16:30:10');
```

> Error Code: 1062. Duplicate entry 'myName' for key 'users.name'

原因相信大家都很清楚，这是由于软删除时并未真正的删除表中的数据，哪怕此时我们在业务层做了唯一性校验依然会出现这种问题。因为唯一性校验的 SQL 默认会拼接上`deleted_at`索引字段，导致无法查出相应数据，最终引发了`Duplicate entry 'myName' for key 'users.name'`

唯一校验 SQL：

```sql
SELECT * FROM rocket_test.users WHERE deleted_at IS NULL AND name="myName";
```

## 如何处理？

1. **去除唯一索引，业务层做完善校验（不推荐）**

   > 原因：业务上具有唯一特性的字段，即使是组合字段，也必须建成唯一索引。（阿里巴巴 Java 开发规范）
   >
   > 除非现有表结构中已经积累了大量数据，导致做全库 DDL（DDL 语句会锁整张表，不要轻易在线上做 DDL 操作）及数据迁移困难，否则不推荐采取该方案。
   >
   > 说明：不要以为唯一索引影响了 insert 速度，这个速度损耗可以忽略，但提高查找速度是明显的；另外，**即使在应用层做了非常完善的校验控制，只要没有唯一索引，根据墨菲定律，必然有脏数据产生。**

2. **建立联合索引，(将 name 和 删除标识 建立联合索引），软删除数据可以有以下几种方案来表示（推荐）**

   1. **将删除标识的删除状态设为 id（推荐，使用主键确保不会发生索引冲突，并且实现简单）**

      若使用的是`mybatis-plus`框架可将`logic-delete-value`设置为如下：

      ```
      logic-delete-value: id
      ```

   2. 将删除标识设为当前时间戳**（时间戳在极端情况下依旧有索引冲突的风险）**

      若使用的是`mybatis-plus`框架可将`logic-delete-value`设置为如下：

      ```
      logic-delete-value: REPLACE(unix_timestamp(current_timestamp(3)),'.','')
      ```

   若采用该方案我们需对表结构进行一定的修改（`bigint(20)`），因为原来的软删除字段为`tinyint(4)`类型，长度不足以支撑该解决方案

> Node 端在使用 [sequelize](https://www.sequelize.com.cn/) 时可以在 hooks 中增加软删除逻辑：
>
> ```js
> const Users = sequelize.define(
>   'users',
>   {
>     id: {
>       type: DataTypes.INTEGER(11),
>       allowNull: false,
>       primaryKey: true,
>       autoIncrement: true,
>     },
>     name: {
>       type: DataTypes.STRING(45),
>       allowNull: false,
>       unique: 'uniqueCompositeIndex',
>     },
>     logicDeleteValue: {
>       type: DataTypes.INTEGER,
>       defaultValue: 0,
>       unique: 'uniqueCompositeIndex',
>     },
>   },
>   {
>     hooks: {
>       beforeBulkDestroy: (options) => {
>         // 触发单个 hook 删除
>         options.individualHooks = true;
>       },
>       beforeDestroy: async (instance) => {
>         // 将删除标识的删除状态设为id（推荐，使用主键确保不会发生索引冲突，并且实现简单）
>         await instance.update({ logicDeleteValue: instance.id });
>       },
>     },
>   }
> );
> ```

## 参考链接

- [逻辑删除和唯一索引](https://chsm1998.github.io/2020/08/29/logical-deletion-and-unique-index/)
- [Sequelize](https://www.sequelize.com.cn/)
