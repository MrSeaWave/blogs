---
title: Sequelize 入门使用指南
author: Sea
toc: true
date: 2022-01-11 09:53:44
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/r7hprs_logo-small-844fb9182c0fbf41931de2246fa9c496.png
tags: [Sequelize, mysql, orm]
categories: [Sequelize]
---

Sequelize 是一个基于 promise 的 Node.js [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping), 目前支持 [Postgres](https://en.wikipedia.org/wiki/PostgreSQL), [MySQL](https://en.wikipedia.org/wiki/MySQL), [MariaDB](https://en.wikipedia.org/wiki/MariaDB), [SQLite](https://en.wikipedia.org/wiki/SQLite) 以及 [Microsoft SQL Server](https://en.wikipedia.org/wiki/Microsoft_SQL_Server). 它具有强大的事务支持, 关联关系, 预读和延迟加载,读取复制等功能。

<!--more-->

> ORM（Object Relational Mapping），称为对象关系映射，用于实现面向对象编程语言里不同类型系统的数据之间的转换。 对象关系映射（Object Relational Mapping，简称 ORM，或 O/RM，或 O/R mapping），是一种程序设计技术，用于实现面向对象编程语言里不同类型系统的数据之间的转换。 Sequelize 是一个基于 Promise 的 NodeJs ORM 库，相当与一个中间人负责两者，js 和 mysql 之间的交流。

- 实例化 Sequelize 连接到 Database： 通过实例化 Sequelize 类，连接到数据库程序指定的数据库。
- 定义 Model 映射 Table： 通过模型映射数据表的定义并代理操作方法
- 指定 DataTypes 声明 Data Types： 把数据库的数据类型变成在 js 上下文中更合适的用法。
- 使用 Op 生成 Where 子句 Operators： 为选项对象提供强大的解耦和安全检测。
- 关联 Association 替代复杂的 Foreign Key 和 多表查询： 用一套简单的方法管理复杂的多表查询。
- 调用 Transcation 封装 Transation ： 对事务一层简单而必要的封装。

## 安装

```sh
npm install --save sequelize
```

必须手动为所选数据库安装驱动程序：（这里选择 mysql2

```sh
# 选择以下之一:
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL Server
```

## 连接到数据库

Sequelize 是库的入口类，可做两件事情：

1. 连接到数据库
2. 设置数据表的全局配置。 所以暂且可把 Sequelize 的实例 看做 Mysql 中的 Database（数据库）

```js
// config/database-config/database.dev.js
// dev 环境下的数据库连接配置
const databaseConfig = {
  // 使用哪个数据库程序
  dialect: 'mysql',
  // mysql2 参数
  dialectOptions: {
    // useUTC: false, // for reading from database
    // timezone: '+08:00',
    typeCast(field, next) {
      // for reading from database
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    },
  },
  // 写入数据库时间为中国时间
  timezone: '+08:00',
  database: 'rocket_test',
  username: 'root',
  password: '12345678',
  host: 'localhost',
  port: 3306,
  // 连接池
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // 数据表相关的全局配置
  define: {
    // 是否冻结表名，停止 Sequelize 执行自动复数化. 这样,Sequelize 将推断表名称等于模型名称,而无需进行任何修改
    // 默认情况下，表名会转换为复数形式
    freezeTableName: true,
    // 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段.
    // createdAt 记录表的创建时间
    // updatedAt 记录字段更新时间
    // 时间戳
    timestamps: true,
    // 是否为表添加 deletedAt 字段
    // 默认情况下, destroy() 方法会删除数据，
    // 设置 paranoid 为 true 时，将会更新 deletedAt 字段，并不会真实删除数据。
    paranoid: true,
    // 为 createdAt,updatedAt,deletedAt 列指定自定义名称,可以不用单独设定
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
    // deletedAt: 'deleted_at'
    // 将所有属性的 field 参数设置为其名称的 snake_case 版本
    underscored: true,
  },
};

export default databaseConfig;
```

导入配置文件，并实例化 Sequelize，并测试连接。

```js
// src/models/utils.js
// 实例化，并指定配置
import { Sequelize } from 'sequelize';
import config from '../../config/database-config/database.dev';

export const sequelize = new Sequelize(config);
```

```js
// src/models/test.js

// 测试连接
import { sequelize } from './utils';

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
```

> 注： 个人习惯，models 目录用于存放 Sequelize 库相关文件，除个别 js 外，其余 js 文件对应当前 Database 中的一张 Table。

默认情况下,Sequelize 将保持连接打开状态,并对所有查询使用相同的连接. 如果你需要关闭连接,请调用 `sequelize.close()`(这是异步的并返回一个 Promise).

## 建立模型

模型是 Sequelize 的本质. 模型是代表数据库中表的抽象. 在 Sequelize 中,它是一个 [Model](https://sequelize.org/master/class/lib/model.js~Model.html) 的扩展类.

该模型告诉 Sequelize 有关它代表的实体的几件事,例如数据库中表的名称以及它具有的列(及其数据类型).

如下，新建一个文件 User.js 存放用户表的模型定义：

```js
// src/models/Users.js
import { DataTypes } from 'sequelize';
import { sequelize } from './utils';

// define() 方法接受三个参数
// 表名，表字段的定义和表的配置信息
const Users = sequelize.define('users', {
  id: {
    // Sequelize 库由 DataTypes 对象为字段定义类型
    type: DataTypes.INTEGER(11),
    // 允许为空
    allowNull: false,
    // 主键，primary key=unique+not null
    primaryKey: true,
    // 自增
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
    // 唯一键
    unique: true,
  },
  secret: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Users;
```

然后，导入并同步到 Mysql 中。

```js
// src/models/init.js
// 导入
import { sequelize } from './utils';
import Users from './Users';

// 同步到 Mysql 中
// 也就是将我们用 js 对象声明的模型通过 sequelize 转换成 mysql 中真正的一张数据表
(async function init() {
  // 标准同步
  // 只有当数据库中不存在与模型同名的数据表时，才会同步
  await sequelize.sync();
  // 动态同步
  // 修改同名数据表结构，以适用模型。
  // await sequelize.sync({ alter: true });
  // 强制同步
  // 删除同名数据表后同步，谨慎使用，会导致数据丢失
  // await sequelize.sync({ force: true });
  // 另外，当你指定表与表之间的关联后，修改被关联的表结构时会抛出异常。
  // 需要先注释掉关联代码，然后更新同步模型后，再取消掉注释即可。
  // 再另外，当你有新的关联时必须使用动态同步才会生效。
})();
```

更多可查看[模型基础](https://www.sequelize.com.cn/core-concepts/model-basics)

## 数据类型

DataTypes 对象为模型的字段指定数据类型。 以下列出了部分 DataTypes 类型 对应的 Mysql 数据类型，更多可查看[数据类型](https://www.sequelize.com.cn/core-concepts/model-basics#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)&[其他数据类型](https://www.sequelize.com.cn/other-topics/other-data-types)

```
// 字符串
STRING(N=255)               // varchar(0~65535)
CHAR(N=255)                 // char(0~255)
TEXT(S=tiny/medium/long)    // s + text
// 数字
// 整数
TINYINT(N?)         // tinyint(1-byte)
SMALLINT(N?)        // smallint(2-byte)
MEDIUMINT(N?)       // mediumint(3-byte)
INTEGER(N=255?)     // integer(6-byte)
BIGINT(N?)          // bigint(8-byte)
// 浮点数
FLOAT(n, n)         // float(4-byte)
DOUBLE(n, n)        // double(8-byte)
// 布尔值
BOOLEAN             // tinyint(1)
// 日期
DATE(n?)            // datetime(8-byte)
TIME                // timestamp(4-byte)
NOW                 // 默认值为 current timestamp
// 其他
ENUM( any，...)      // ENUM('value1', ...) length > 65535
JSON                 // JSON
```

## 模型方法

简单 SELECT 查询

你可以使用 [findAll](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAll) 方法从数据库中读取整个表：

```js
// 查询所有用户
const users = await User.findAll();
console.log(users.every((user) => user instanceof User)); // true
console.log('All users:', JSON.stringify(users, null, 2));
```

```sql
SELECT * FROM ...
```

这里列出了模型上一些操作数据库常用的方法，更多查看[模型查询(基础)](https://www.sequelize.com.cn/core-concepts/model-querying-basics) & [模型查询(查找器)](https://www.sequelize.com.cn/core-concepts/model-querying-finders) & [Static Method Summary](https://sequelize.org/master/class/lib/model.js~Model.html)

```
findOne()
findAll()
findById()
findOrCreate()
findOrBuild()
findAndCountAll()
create()
bulkCreate()
update()
upsert()
destroy()
increment()
decrement()
count()
max()
min()
sun()
```

## 验证器

使用模型验证器，可以为模型的每个属性指定 格式/内容/继承 验证，验证会自动在 `create`, `update` 和 `save` 时运行，你还可以调用 `validate()` 来手动验证实例。当验证未通过时，会抛出一个 SequelizeValidationError 异常对象（这也是为什么，需要在数据库操作的地方用 try catch 语句捕获错误，防止 nodeJs 进程退出）。

例子：

```js
const Users = sequelize.define('users', {
  // ...
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
});
```

另外，可指定 args 和 msg 自定义参数和错误消息。

```
isEmail: {
    args: true, // 可省略，默认为 true
    msg: "邮箱格式不合法！"
}
```

你可以定义你的自定义验证器，也可以使用由 [validator.js (10.11.0)](https://github.com/chriso/validator.js) 实现的多个内置验证器，更多查看[官网](https://www.sequelize.com.cn/core-concepts/validations-and-constraints)，如下所示：

```js
sequelize.define('foo', {
  bar: {
    type: DataTypes.STRING,
    validate: {
      is: /^[a-z]+$/i,          // 匹配这个 RegExp
      is: ["^[a-z]+$",'i'],     // 与上面相同,但是以字符串构造 RegExp
      not: /^[a-z]+$/i,         // 不匹配 RegExp
      not: ["^[a-z]+$",'i'],    // 与上面相同,但是以字符串构造 RegExp
      isEmail: true,            // 检查 email 格式 (foo@bar.com)
      isUrl: true,              // 检查 url 格式 (http://foo.com)
      isIP: true,               // 检查 IPv4 (129.89.23.1) 或 IPv6 格式
      isIPv4: true,             // 检查 IPv4 格式 (129.89.23.1)
      isIPv6: true,             // 检查 IPv6 格式
      isAlpha: true,            // 只允许字母
      isAlphanumeric: true,     // 将仅允许使用字母数字,因此 '_abc' 将失败
      isNumeric: true,          // 只允许数字
      isInt: true,              // 检查有效的整数
      isFloat: true,            // 检查有效的浮点数
      isDecimal: true,          // 检查任何数字
      isLowercase: true,        // 检查小写
      isUppercase: true,        // 检查大写
      notNull: true,            // 不允许为空
      isNull: true,             // 只允许为空
      notEmpty: true,           // 不允许空字符串
      equals: 'specific value', // 仅允许 'specific value'
      contains: 'foo',          // 强制特定子字符串
      notIn: [['foo', 'bar']],  // 检查值不是这些之一
      isIn: [['foo', 'bar']],   // 检查值是其中之一
      notContains: 'bar',       // 不允许特定的子字符串
      len: [2,10],              // 仅允许长度在2到10之间的值
      isUUID: 4,                // 只允许 uuid
      isDate: true,             // 只允许日期字符串
      isAfter: "2011-11-05",    // 仅允许特定日期之后的日期字符串
      isBefore: "2011-11-05",   // 仅允许特定日期之前的日期字符串
      max: 23,                  // 仅允许值 <= 23
      min: 23,                  // 仅允许值 >= 23
      isCreditCard: true,       // 检查有效的信用卡号

      // 自定义验证器的示例:
      isEven(value) {
        if (parseInt(value) % 2 !== 0) {
          throw new Error('Only even values are allowed!');
        }
      }
      isGreaterThanOtherField(value) {
        if (parseInt(value) <= parseInt(this.otherField)) {
          throw new Error('Bar must be greater than otherField.');
        }
      }
    }
  }
});
```

## Getters & Setters

Getters 和 Setters 可以让你在获取和设置模型数据时做一些处理。

```js
const Users = sequelize.define('users', {
  // ...
  // 假设我们想要以大写形式查看每个用户名,
  // 即使它们在数据库本身中不一定是大写的
  username: {
    type: DataTypes.STRING,
    get() {
      const rawValue = this.getDataValue('username');
      return rawValue ? rawValue.toUpperCase() : null;
    },
  },
  password: {
    type: DataTypes.STRING,
    set(value) {
      // 在数据库中以明文形式存储密码是很糟糕的.
      // 使用适当的哈希函数来加密哈希值更好.
      this.setDataValue('password', hash(value));
    },
  },
  content: {
    type: DataTypes.TEXT,
    get() {
      // 取出真实内容
      const storedValue = this.getDataValue('content');
      const gzippedBuffer = Buffer.from(storedValue, 'base64');
      const unzippedBuffer = gunzipSync(gzippedBuffer);
      return unzippedBuffer.toString();
    },
    set(value) {
      // 内容作为 gzip 压缩的 base64 字符串存储
      const gzippedBuffer = gzipSync(value);
      this.setDataValue('content', gzippedBuffer.toString('base64'));
    },
  },
});
```

> 注： deletedAt 字段目前不走 setter，很疑惑。。。（"sequelize": "6.12.4"

## Op（查询条件）

Op 对象集内置了一系列适用于 where 子句 查询的操作符（查询条件）。

举个例子：

```js
const { Op } = require('sequelize');

User.findAll({
  // 查询所有 id > 2 的用户
  where: {
    id: {
      [Op.gt]: 2,
    },
  },
});
```

以下列出了所有内置的 Op 操作符，更多解释查看[官网](https://www.sequelize.com.cn/core-concepts/model-querying-basics#%E6%93%8D%E4%BD%9C%E7%AC%A6)

```js
const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
    [Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)
    someAttribute: {
      // 基本
      [Op.eq]: 3,                              // = 3
      [Op.ne]: 20,                             // != 20
      [Op.is]: null,                           // IS NULL
      [Op.not]: true,                          // IS NOT TRUE
      [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)

      // 使用方言特定的列标识符 (以下示例中使用 PG):
      [Op.col]: 'user.organization_id',        // = "user"."organization_id"

      // 数字比较
      [Op.gt]: 6,                              // > 6
      [Op.gte]: 6,                             // >= 6
      [Op.lt]: 10,                             // < 10
      [Op.lte]: 10,                            // <= 10
      [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15

      // 其它操作符

      [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

      [Op.in]: [1, 2],                         // IN [1, 2]
      [Op.notIn]: [1, 2],                      // NOT IN [1, 2]

      [Op.like]: '%hat',                       // LIKE '%hat'
      [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
      [Op.startsWith]: 'hat',                  // LIKE 'hat%'
      [Op.endsWith]: 'hat',                    // LIKE '%hat'
      [Op.substring]: 'hat',                   // LIKE '%hat%'
      [Op.iLike]: '%hat',                      // ILIKE '%hat' (不区分大小写) (仅 PG)
      [Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (仅 PG)
      [Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (仅 MySQL/PG)
      [Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (仅 MySQL/PG)
      [Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (仅 PG)
      [Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (仅 PG)

      [Op.any]: [2, 3],                        // ANY ARRAY[2, 3]::INTEGER (仅 PG)
      [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat') // 匹配文本搜索字符串 'fat' 和 'rat' (仅 PG)

      // 在 Postgres 中, Op.like/Op.iLike/Op.notLike 可以结合 Op.any 使用:
      [Op.like]: { [Op.any]: ['cat', 'hat'] }  // LIKE ANY ARRAY['cat', 'hat']

      // 还有更多的仅限 postgres 的范围运算符,请参见下文
    }
  }
});
```

> 为什么不直接使用符号而是使用额外的封装层 Op，据官方说法是为了防止 SQL 注入和其他一些安全检测。另外，Op 对象集其实是一系列 Symbol 的集合。

## 关联

关联定义比较难以理解，留在下一篇文章着重介绍。

## 参考链接

- [Sequelize](https://www.sequelize.com.cn/)
- [命名策略](https://www.sequelize.com.cn/other-topics/naming-strategies)
- [Koa + Sequelize](https://juejin.cn/post/6844903944632664077)
