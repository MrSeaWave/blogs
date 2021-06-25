---
title: export 与 export default 的区别
author: Sea
toc: true
date: 2021-06-03 15:58:01
cover: https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/dKTlYJ_-1.gif
tags: [js, export, export default]
categories: [js]
---

本文将介绍 export 与 export default 的差异性。

<!--more-->

## 1. export default 在一个模块里只能有一个，但是 export 可以有多个

```js
// model.js
let e1 = 'export 1';
let e2 = 'export 2';
let e3 = 'export 3';
let e4 = 'export 4';
export { e2 };
export { e3 };
export { e4 };
export default e1;
```

```js
// 使用模块的run.js
import e1, { e2, e3, e4 } from './model.js';

console.log(e1);
console.log(e2);
console.log(e3);
console.log(e4);
```

```bash
run.js运行结果
$ node run.js

export 1
export 2
export 3
export 4
```

> 如果在`model.js`再添加一个`export default`

```js
let e5 = 'export e5';
export default e5;
```

```js
$ node run.js
file:///Users/xxx/workspace/model.js:11
export default  e5
       ^^^^^^^^^^^

SyntaxError: Identifier '.default' has already been declared
```

## 2. 模块中通过`export` 导出的(属性或者方法)可以修改，但是通过`export default`导出的不可以修改

基本类型：

```js
// model.js
let e1 = 'export 1';
let e2 = 'export 2';
export function modifyFunc() {
  e1 = 'export 1 modified';
  e2 = 'export 2 modified';
}
export { e2 };
export default e1;
```

```js
// 使用模块的run.js
import e1, { e2, modifyFunc } from './model.js';
console.log(e1);
console.log(e2);
modifyFunc();
console.log(e1);
console.log(e2);
```

```js
$ node run.js
export 1
export 2
export 1
export 2 modified
```

Babel 编译后代码

```js
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.modifyFunc = modifyFunc;
exports.default = exports.e2 = void 0;
let e1 = 'export 1';
let e2 = 'export 2';
exports.e2 = e2;

function modifyFunc() {
  e1 = 'export 1 modified';
  exports.e2 = e2 = 'export 2 modified';
}

var _default = e1;
exports.default = _default;
```

对象

```js
let e1 = { v1: 'v1' };
let e2 = { v2: 'v2' };
export function modifyFunc() {
  e1 = { v1: 'v1 modified' };
  e1.v1 = 'v1 next modified';
  e2 = { v22: 'v2 modified' };
}
export { e2 };
export default e1;
```

```js
// 使用模块的run.js
import e1, { e2, modifyFunc } from './model.js';
console.log(e1);
console.log(e2);
modifyFunc();
console.log(e1);
console.log(e2);
```

```js
$ node run.js
{ v1: 'v1' }
{ v2: 'v2' }
{ v1: 'v1' }
{ v22: 'v2 modified' }
```

Babel 编译后代码

```js
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.modifyFunc = modifyFunc;
exports.default = exports.e2 = void 0;
// model.js
let e1 = {
  v1: 'v1',
};
let e2 = {
  v2: 'v2',
};
exports.e2 = e2;

function modifyFunc() {
  e1 = {
    v1: 'v1 modified',
  };
  e1.v1 = 'v1 next modified';
  exports.e2 = e2 = {
    v22: 'v2 modified',
  };
}

var _default = e1;
exports.default = _default;
```

首先需要了解到：

1. ES6 中模块通过`export`和`export default`暴露出来的属性或者方式并不是普通的赋值或者引用，它们是对模块内部定义的标志符类似**指针**的绑定。
2. 对于一个导出的属性或者方法，在什么地方导出不重要，在什么时候导入也不重要，重要的是:访问这这个绑定的时候的当前值。

```js
// model.js
let e1 = 'export 1';
let e2 = 'export 2';
export { e2 };
export default e1;
e1 = 'export 1 modified';
setTimeout(() => {
  e2 = 'export 2 modified';
}, 1000);
```

```js
// 使用模块的run.js
import e1, { e2 } from './model.js';
console.log(e1);
console.log(e2);
setTimeout(() => {
  console.log('-----later-----', e2);
}, 5000);
```

```js
$ node run.js
export 1
export 2
-----later----- export 2 modified
```

Babel 编译后代码

```js
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = exports.e2 = void 0;
// model.js
let e1 = 'export 1';
let e2 = 'export 2';
exports.e2 = e2;
var _default = e1;
exports.default = _default;
e1 = 'export 1 modified';
setTimeout(() => {
  exports.e2 = e2 = 'export 2 modified';
}, 1000);
```

但是，`export`是绑定到标识符，改变标志符的值，然后访问这个绑定，得到的是新值；`export default`绑定的是标志符指向的值，如果修改标志符指向另一个值，这个绑定的值不会发生变化。 如果想修改默认导出的值，可以使用`export {e1 as default}`这种方法。

```js
// model.js
let e1 = 'export 1';
export { e1 as default };
e1 = 'export 1 modified';
```

```js
// 使用模块的run.js
import e1 from './model.js';
console.log(e1);
```

```js
$ node run.js
export 1 modified

```

Babel 编译后代码

```js
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;
// model.js
let e1 = 'export 1';
exports.default = e1;
exports.default = e1 = 'export 1 modified';
```

## 3. `export default`与`export`语法差异。

> 1. `export var e1='...'` 是合法语句，但是`export default var e2='...'`是不合法的（`let`和`const`也一样）。
>
> 2. `export default`可以直接添加标识符导出，例如`export default e2`;`export`如果要导出已经声明的表示符,必须使用`{}`,例如`export {e1}`,注意：这里`{}`不是声明一个对象。

可查看例子[源码](https://github.com/MrSeaWave/test-run-demo)
