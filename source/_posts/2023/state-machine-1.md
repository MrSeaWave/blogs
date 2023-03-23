---
title: 状态机
author: Sea
toc: true
date: 2023-03-23 11:47:18
cover: https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1678933761294_5NDwiG.png
tags: ['JS']
categories: ['技术']
---

# 什么是状态机

<!--more-->

## 定义

状态机是有限状态自动机（Finite State Machine，FSM）的简称，是现实事物运行规则抽象而成的一个数学模型。表示有限个状态以及在这些状态之间的转移和动作；说白了，就是指一张状态变换图。

如下图，就定义了一个只有 opened 和 closed 两种状态的状态机。当系统处于 opened 状态，在收到输入「关闭事件」，达到了状态机转移条件，系统则会执行相应的动作（close door），并转移到了 closed 状态。

<img src="https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1678933761294_5NDwiG.png" alt="img" style="zoom: 25%;" />

## 疑惑

既然状态机是有限状态机的简称，那有没有无限状态机呢？

- 这个问题其实和永动机的答案是一样的，属于只有理论意义但不存在的模型；
- 状态机的实质就是确定的输入和状态可以得到确定的输出，按照定义需要首先收集所有状态，而无限状态机在这个步骤就已经不满足了；
- 关于无限状态机的更多 [可以了解](https://www.zhihu.com/question/29826198)：图灵机、下推自动机等。。。

# 为什么要使用状态机？

根据上面状态机的基本概念的介绍，想必大家对状态机应该有个大致了解，我们可以继续思考下，为什么我们需要使用状态机？

世间的一切，都可以看成是各种状态的集合。比如一块石头，今天可能是干的，明天可能是湿的。再比如一个人，年龄会逐渐增长，可以从结婚变成未结婚，可以从男人变成女人，等等等……

而状态改变的时候，我们可能要做某种事情来应对这种改变，比如结婚了想喊一嗓子，让所有人都恭喜我……

而且状态机在游戏开发中大放异彩，已经成为了一种常用的设计模式，比如大家小时候都会玩马里奥

![Super Mario Bros. 3 coverart.png](https://upload.wikimedia.org/wikipedia/zh/thumb/a/a5/Super_Mario_Bros._3_coverart.png/220px-Super_Mario_Bros._3_coverart.png)

在游戏中，马里奥可以变身为多种形态，比如小马里奥（Small Mario）、超级马里奥（Super Mario）、火焰马里奥（Fire Mario）、斗篷马里奥（Cape Mario）[等等](https://zh.wikipedia.org/zh-my/%E8%B6%85%E7%B4%9A%E7%91%AA%E5%88%A9%E6%AD%90%E5%85%84%E5%BC%9F3)。在不同的游戏情节下，各个形态会互相转化，并相应的增减积分。比如，初始形态是小马里奥，吃了蘑菇之后就会变成超级马里奥，并且增加 100 积分。

马里奥形态的转变就是一个状态机。其中，马里奥的不同形态就是状态机中的「状态」，游戏情节（比如吃了蘑菇）就是状态机中的「事件」，加减积分就是状态机中的「动作」。比如，吃蘑菇这个事件，会触发状态的转移：从小马里奥转移到超级马里奥，以及触发动作的执行（增加 100 积分）

<img src="https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1679022001876_OH1iv4.png" alt="image-20230317110000583" style="zoom:50%;" />

## 与前端的联系

至于在前端开发中，用到状态机的场合更是比比皆是。比如一个前端组件的状态，可能从「隐藏」到「显示」，从「左边」到「右边」，背景从「白」到「黑」，里面的图片从「10」张到「20 张」等等……

当组件从隐藏到显示的时候，你可能需要调用另一个组件来填充它的位置，这时候就需要在「隐藏、显示」这个状态改变的时候做相应的操作。而促使这个组件改变可能有很多种情况（比如点击，或者过五秒隐藏），这时如果用状态机的话，只需要给它绑定一个状态改变事件而已……

使用状态机，能让你的代码变得更直观、更整洁，减少了耦合,提升了代码的健壮性……

当然，状态机能带来的好处远远不止这么多。

# 如何使用状态机

首先我们需要了解下状态机的本质：确定的输入 + 某一个状态 => 另一个状态；

（状态机的工作原理所示，发生事件 (event) 后，根据当前状态 (cur_state) ，决定执行的动作 (action)，并设置下一个状态号 (nxt_state)）

状态机有四大概念还有三大特征

## 四大概念

下面来给出状态机的四大概念。现态（Current State）、次态（Next State）、事件（Event）、动作（Action）

1. 现态（Current State）：状态机当前所处的状态，也称为当前状态。它表示状态机当前的状态，也是状态转移的起始状态。
2. 次态（Next State）：状态机转移后的状态，也称为下一个状态。它表示状态机经过某个事件或条件转移后，即将要进入的状态。
3. 事件（Event）：事件就是执行某个操作的触发条件或者口令。当一个条件被满足，可能将会触发一个动作，或者执行一次状态的迁移。
4. 动作（Action）事件发生以后要执行动作。动作不是必需的，当条件满足后，也可以不执行任何动作，直接迁移到新状态。

## 三大特征

状态机并不是一个复杂的概念，简单说，它有三个特征：

- 状态总数（state）是有限的。
- 任一时刻，只处在一种状态之中。
- 某种条件下，会从一种状态转变（transition）到另一种状态。

## 表示法

通常我们会用 状态转换图 或者 状态转移表 来表示状态机

### 状态转换图

![image-20230317114943412](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1679024983683_41SvzG.png)![img](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/DFAexample.svg/220px-DFAexample.svg.png)

### 状态转移表

![image-20230317115115078](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1679025075273_sBxS2z.png)![image-20230317115201770](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1679025121950_nKH5A3.png)

## Demo

了解了状态机的基本概念后，接下来看一个简单的前端例子，

比方说网页上存在一个按钮元素。当鼠标点击按钮时会出现弹窗，同样当鼠标再次点击按钮时候弹窗消失。

<img src="https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1679038851808_AdkUQW.png" alt="image-20230317154051576" style="zoom:50%;" />

简单分析下，可以发现 Button 组件有两种状态，一个为 On 一个为 Off，它要么处于 on 状态，要么处于 off 状态，初始状态为 off，它有 2 例行为：turnOff 和 turnOn，前者能使组件从 on 状态变化到 off 状态，后者能使组件从 off 状态变为 on 状态，它的行为绑定到了某个 DOM 元素的点击事件上，可以先看下伪代码实现

```js
// 伪代码
const buttonMachine = {
  // 状态机当前状态
  currentState: 'off',
  // 每次输入会调用 transition 方法根据输入判断更改当前状态
  transition: function (event) {
    // do something 根据用户行为(event)更改currentState
    switch (this.currentState) {
      case 'on':
        // do something 更改为 关闭 状态， 取消高亮同时隐藏菜单
        this.currentState = 'off';
        doSomething();
        break;

      case 'off':
        // do something 更改状态为 打开 状态 高亮按钮、显示菜单
        this.currentState = 'on';
        doSomething();
        break;

      default:
        console.log('Invalid State');
        break;
    }
  },
};
```

接下来可以看到真实代码 [实现方式](https://codepen.io/mrseawave/pen/JjaZZvx)

<iframe height="300" style="width: 100%;" scrolling="no" title="JS - machine -1" src="https://codepen.io/mrseawave/embed/JjaZZvx?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/mrseawave/pen/JjaZZvx">
  JS - machine -1</a> by MrSeaWave (<a href="https://codepen.io/mrseawave">@mrseawave</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

可以看到当调用 machine.init() 之后打印的是这个组件的初始状态，当点击一次之后，组件从 off 状态转换到了 on 状态，点击第二次之后从 on 状态转换到了 off 状态，点击第三次又恢复到了 on 状态。这个例子虽然是一个极其简单的状态机实现，但还是能够比较恰当地说明状态机的思想以及它的优点（逻辑思维清晰， 表达能力强）。在实际工作中，我们可以借助 [javascript-state-machine](https://github.com/jakesgordon/javascript-state-machine) 来实现基于状态机的组件，它是有限状态机这种模型的一个 js 的实现库，利用它可以快速定义一个状态机对象，相比我前面举例写出的那种实现，这个库虽然源码只有 200 多行，但是功能非常完整，API 简单好用，值得学习跟实践。

### 使用 javascript-state-machine 库实现状态机

只要引入该库的 js 之后就能通过该库提供的一个全局对象 StateMachine，并使用 `new StateMachine()`，则可以生成有限状态机的实例.

**Demo1**

![matter state machine](https://github.com/jakesgordon/javascript-state-machine/raw/master/examples/matter.png)

```js
var fsm = new StateMachine({
  init: 'solid',
  transitions: [
    { name: 'melt', from: 'solid', to: 'liquid' },
    { name: 'freeze', from: 'liquid', to: 'solid' },
    { name: 'vaporize', from: 'liquid', to: 'gas' },
    { name: 'condense', from: 'gas', to: 'liquid' },
  ],
  methods: {
    onMelt: function () {
      console.log('I melted');
    },
    onFreeze: function () {
      console.log('I froze');
    },
    onVaporize: function () {
      console.log('I vaporized');
    },
    onCondense: function () {
      console.log('I condensed');
    },
  },
});
```

在这个例子中：inil 选项用来表示 fsm 对象的初始状态，transitions 选项用来描述 fsm 对象所有状态的变化规则，每一种变化规则对应一种行为（不过有可能多个规则会对应同一个行为，在后面你会看到这样的例子）。我们在使用 `new StateMachine` 时则会为实例的每一种行为都添加了一个方法，调用这个方法就相当于触发对象的某种行为，当对象行为发生时，对象的状态就可以发生变化。如以上例子创建的实例将拥有如下行为方法：

```
fsm.melt() - 调用该方法，实例状态将从'solid'变为'liquid'
fsm.freeze() - 调用该方法，实例状态将从'liquid'变为'solid'
fsm.vaporize() - 调用该方法，实例状态将从'liquid'变为'gas'
fsm.condense() - 调用该方法，实例状态将从'gas'变为'liquid'
```

这些方法是 StateMachine 根据配置的 transitions 规则自动创建的，方法名跟 transitions 规则里面的 name 属性对应，transitions 规则里面有几个不重复的 name，就会添加几个行为方法。同时为了方便使用，它还添加了如下成员来判断和控制实例的状态和行为：

```
fsm.state - 返回实例当前的状态
fsm.is(state) - 如果传入的state是实例当前状态就返回true
fsm.can(transitionName) - 如果传入的transitionName在实例当前状态能够被触发就返回true
fsm.cannot(transitionName) - 如果传入的transitionName在实例当前状态不能被触发就返回true
fsm.transitions() - 以数组的形式返回实例当前状态下能够被触发的行为列表
...
```

![image-20230321162243497](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1679386963742_9RrA5z.png)

还记得前面列出的可以用有限状态机模型的事物特点吧，接下来就用 Demo1 来说明 javascript-state-machine 创建的对象是如何满足状态机模型的要求的：

**1）事物拥有的状态总数是有限的**

这个实例最多只有三个状态。

**2）可以用状态来描述事物，并且任一时刻，事物总是处于一种状态**

这个例子中创建的固液气的实例转换规则中，要么处于 solid 状态，要么处于 liquid 状态，要么处于 gas 状态，所以它是满足第 2 点的。

**3）在某种条件下，可以导致事物从一种状态过渡到另一种状态**

fsm.melt，fsm.freeze，fsm.vaporize，fsm.condense 这几个行为方法都能改变实例的状态。

**4）另外其实事物状态变化是有规则的，A 状态可以变换到 B，B 可以变换到 C，A 却不一定能变换到 C**

这个实例的初始状态为 solid，根据 transitions 配置的状态变化规则，solid 可以变换到 liquid, liquid 可以变换到 gas，但是实例初始化之后，却不能调用 fsm.freeze 这个行为方法，因为这个方法只有实例状态为 liquid 的时候才能调用，而初始化时实例的状态为 solid，所以一开始只能调用 melt 方法：（注意，这里只是具体例子，实际上 solid 可以直接变成 gas，这种现象叫做升华，只是在例子中没定义

![image-20230320195718508](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1679313438668_4Fwpcn.png)

**5）同一种行为，可以将事物从多种状态变成同种状态，但是不能从同种状态变成多种状态**

从理论上也很好理解这一点，为什么不能从同种状态变成多种状态，因为第二点说了事物任一时刻只能处于一种状态，如果某一个行为使得事物的状态变成了多种，事物的状态机制就有问题了。

下来来看个例子,来说明同一个行为，可以从多种状态变换到一种状态的场景：

![wizard state machine](https://github.com/jakesgordon/javascript-state-machine/raw/master/examples/wizard.png)

```js
let fsm = new StateMachine({
  init: 'A',
  transitions: [
    { name: 'step', from: 'A', to: 'B' },
    { name: 'step', from: 'B', to: 'C' },
    { name: 'step', from: 'C', to: 'D' },
    { name: 'reset', from: ['B', 'C', 'D'], to: 'A' },
  ],
});
```

可以发现

1）虽然它配置了多个变化规则，但是它只有 2 个行为，我们可以从 A 状态调用 step 依次到 D 状态，中间可以随时使用 `reset` 方法返回 A 状态

2）它的 step 行为发生后的状态跟当前状态有关系，当前状态不同，行为发生后的状态也不同，所以 step 行为对应了多条配置规则；

3）它的 reset 行为发生后的状态跟当前状态没关系，只要当前状态在 reset 行为的状态条件范围内，行为发生后的结果都是一样的，所以 reset 行为用一个 from 数组配置了该行为发生的当前状态的条件范围，整个行为仅定义了一条配置规则。

在实际使用状态机实例的过程中，我们通过调用实例的行为方法来触发实例状态的改变，比如 Demo1 中： fsm.melt()，这样 fsm 的状态就会由 solid 变为 liquid，像这种简单的状态机实例，这个程度的使用也许就足够了，但是对于实际项目而言，我们定义的组件，往往要用它们生成的实例来完成很多复杂的逻辑功能，如果用状态机来定义组件，那么这些逻辑代码该写在哪里？因为 javascript-state-machine 创建的状态机实例，它的行为方法都是自动添加的，你不可能去重写这些行为方法，否则就失去状态机的意义了（将状态变化的逻辑与业务逻辑拆分）。
答案是回调，可以发现 Demo1 中的 methods。javascript-state-machine 为每个实例的每种状态的变换前后和每种行为的变换前后都定义了相关的回调，我们的逻辑都可以写在这些回调里面，这样就达到了状态逻辑与业务逻辑拆分的目的。下面先看看这些回调的用法，接着我会用 javascript-state-machine 改写一下前面那个 Button 组件的例子。

javascript-state-machine 根据 transition 的配置，可以为实例定义 [4 种类型的回调](https://github.com/jakesgordon/javascript-state-machine/blob/master/docs/lifecycle-events.md)：

```
onBefore<TRANSITION> - 在TRANSITION对应的行为发生之前触发
onLeave<STATE> - 在要改变STATE对应的状态时触发
onEnter<STATE> - 在把当前状态设置为了STATE对应的状态时触发，简写为on<STATE>
onAfter<TRANSITION> - 在TRANSITION对应的行为发生之后触发，简写为on<TRANSITION>
```

其中每个回调都接受一个参数 lifecycle，其中包含

```
transition - 行为名称
from - 行为发生前的状态
to - 行为发生后的状态
```

状态机每个行为触发，或者状态改变都一定会触发上面的回调（只要这些回调都有定义的话），并且回调顺序跟前面列出的顺序一致。

如 Demo3

```js
let fsm = new StateMachine({
  init: 'A',
  transitions: [{ name: 'step', from: 'A', to: 'B' }],
  methods: {
    onBeforeStep: function () {
      console.log('onBeforeStep');
    },
    onLeaveA: function () {
      console.log('onLeaveA');
    },
    onB: function () {
      console.log('onEnterB');
    },
    onStep: function () {
      console.log('onStep');
    },
  },
});
```

![image-20230320203705650](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1679315825812_doKA7J.png)

另外 javascript-state-machine 还定义了五个通用回调，这五个回调跟 transition,state 没有关系，在任何行为触发，任何状态变化的时候，相关的回调都会触发，这五个回调是：

```
onBeforeTransition - 在任何行为发生之前触发
onLeaveState - 在要改变对象状态时触发
onTransition - 在行为发生中触发
onEnterState - 在把当前状态设置为新状态时触发
onAfterTransition - 在任何行为发生之后触发
```

这五个回调名称是固定的，跟触发的行为和要改变的状态没有关系，相当于是全局回调，也就是说，如果某个状态变化规则相关的四个类型的回调有定义并且这五个全局回调也有定义的话，那么触发该规则对应的行为，就一共会触发 9 个回调，顺序如下：

```
//注意，STATE是当前状态机所处的状态，TRANSITION是即将发生的动作

onBeforeTransition 任何动作触发前触发

onBefore<TRANSITION> 在特定动作TRANSITION前触发

onLeaveState 离开任何一个状态的时候触发

onLeave<STATE> 在离开特定状态STATE时触发

onTransition 在任何动作发生期间触发

onEnterState 当进入任何状态时触发

onEnter<STATE> 进入一个特定的状态STATE时触发

on<STATE> onEnter<STATE>的简写

onAfterTransition 任何动作触发后触发

onAfter<TRANSITION> 在特定动作TRANSITION后触发

on<TRANSITION> onAfter<TRANSITION>的简写
```

了解到前面这些内容后，我们就可以用 javascript-state-machine 来改写前面的 Button 组件了：

```js
let ButtonMachine = function (btnEle, ulEle) {
  fsm = new StateMachine({
    init: 'off',
    transitions: [
      { name: 'turnOn', from: 'off', to: 'on' },
      { name: 'turnOff', from: 'on', to: 'off' },
    ],
    methods: {
      onTurnOn: function (lifecycle) {
        const { transition, from, to } = lifecycle;
        btnEle.classList.add('on');
        ulEle.classList.add('ul-visible');
        log(to, from);
      },
      onTurnOff: function (lifecycle) {
        const { transition, from, to } = lifecycle;
        btnEle.classList.remove('on');
        ulEle.classList.remove('ul-visible');
        log(to, from);
      },
    },
  });

  btnEle.addEventListener('click', (event) => {
    console.log('fsm', fsm, fsm.transitions());
    fsm[fsm.transitions()[0]]();
  });

  log(fsm.state);

  return fsm;
};

function log(currentState, previousState) {
  if (!previousState) {
    console.log(`[INIT] currentState is :  ${currentState}`);
  } else {
    console.log(`[TRANSFORM] currentState is :  ${currentState}, and previous state is : ${previousState}`);
  }
}
```

效果如下：

![image-20230320204654742](https://sea-figure-bed.oss-cn-shanghai.aliyuncs.com/uPic/2023/1679316415073_1i4jHT.png)

在实际工作中，肯定会碰到在行为触发期间，因为某些条件不允许需要取消该行为的情况， 以免对象状态被错误的更改，在 javascript-state-machine 的回调中，只需要 `return false` 即可取消当前触发，

有时，我们在实际工作中，也需要在状态转换期间执行一些异步代码，并确保在代码完成之前不会进入新状态，这时我们可以在回调中返回 `Promise`，以此来取消或者继续回调。

```js
var fsm = new StateMachine({
  init: 'menu',

  transitions: [
    { name: 'play', from: 'menu', to: 'game' },
    { name: 'quit', from: 'game', to: 'menu' },
  ],

  methods: {
    onEnterMenu: function () {
      return new Promise(function (resolve, reject) {
        $('#menu').fadeIn('fast', resolve);
      });
    },

    onEnterGame: function () {
      return new Promise(function (resolve, reject) {
        $('#game').fadeIn('fast', resolve);
      });
    },

    onLeaveMenu: function () {
      return new Promise(function (resolve, reject) {
        $('#menu').fadeOut('fast', resolve);
      });
    },

    onLeaveGame: function () {
      return new Promise(function (resolve, reject) {
        $('#game').fadeOut('fast', resolve);
      });
    },
  },
});
```

这个例子中创建的实例，包含 play 和 quit 两个行为，这两个行为触发之后，不会立即去更改对象的状态，而是开启一个异步的动画任务，然后在动画结束之后，通过调用 `resolve`，通知实例去改变自己的状态。如果想取消则使用 `reject`

# 小结

1）有限状态机是定义组件的一种好用的模式，能够让组件的代码看起来更加清晰，而且易于理解

2）javascript-state-machine 也是一个优秀的实现库，源码简洁，提供的 API 用法简单，同时还突出了状态机的特点，值得在定义组件的时候去试一试，大家有兴趣可以看看源码实现

3）有限状态机这种模式适合有明显状态特点的组件

因此我们可以写代码之前，思考一下：

- 页面有几种状态（初始化状态？成功状态？失败状态？出错状态？）。
- 描述这些状态需要什么参数。
- 在什么时候转变状态，需要改变哪些部分。

然后跟着思路，完成数据与 UI 部分。

卖个关子，本篇只是打个小样，介绍一种思考模式，如果遇到大量判断条件的场景，记得想想状态机，在未来，将会介绍如何将状态机与 react 结合使用，具体可参考 [XState](https://xstate.js.org/docs/)

[前端:从状态管理到有限状态机的思考 - 掘金](https://juejin.cn/post/6952047570046697485)

https://soshace.com/an-introduction-to-finite-state-machines-simplifying-react-state-management-with-state-machines/

https://www.telerik.com/blogs/how-to-use-finite-state-machines-react

https://tsh.io/blog/finite-state-machines-in-react/

https://xstate.js.org/docs/recipes/react.html#local-state

> 本篇所涉及到的代码可去 [js-state-machine-demo](https://github.com/MrSeaWave/js-state-machine-demo) 进行查看

# 参考链接

- [有限状态机 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E6%9C%89%E9%99%90%E7%8A%B6%E6%80%81%E6%9C%BA)
- [什么是状态机？一篇文章就够了-面包板社区](https://www.eet-china.com/mp/a146963.html)
- [状态转移表 - 维基百科，自由的百科全书](https://zh.wikipedia.org/zh-hans/%E7%8A%B6%E6%80%81%E8%BD%AC%E7%A7%BB%E8%A1%A8)
- [ccqgithub/StateMachine: Javascript 有限状态机](https://github.com/ccqgithub/StateMachine)
- [XState：都 1202 年了，不会真有人还在用假的状态管理库吧？ - 知乎](https://zhuanlan.zhihu.com/p/431565113)
- [JavaScript 状态模式及状态机模型 - 掘金](https://juejin.cn/post/6844903593460367374)
- [超级马力欧兄弟 3 - 维基百科，自由的百科全书](https://zh.wikipedia.org/zh-my/%E8%B6%85%E7%B4%9A%E7%91%AA%E5%88%A9%E6%AD%90%E5%85%84%E5%BC%9F3)
- [状态机\_百度百科](https://baike.baidu.com/item/%E7%8A%B6%E6%80%81%E6%9C%BA/6548513#2)
- [有限状态机 FSM(Finite State Machine)及实现方式介绍 - BarryW - 博客园](https://www.cnblogs.com/barrywxx/p/12860573.html)
- [试试用有限状态机的思路来定义 javascript 组件 - 流云诸葛 - 博客园](https://www.cnblogs.com/lyzg/p/5058335.html)
- [前端开发中的状态机 - 作业部落 Cmd Markdown 编辑阅读器](https://www.zybuluo.com/gyyin/note/1666878)
- [如何把业务逻辑这个故事讲好@张克军*ReactConf CN 2018*开发](https://www.sohu.com/a/259772272_609503)
- [如何把业务逻辑这个故事讲好 - 有限状态机与 React 开发@ReactConf*2018*哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1vK4y1k7ma/?vd_source=340c3fc924b0c4be6baa9bb2af1224a9)
- [Selecting a finite state machine library for React | Rainforest QA](https://www.rainforestqa.com/blog/selecting-a-finite-state-machine-library-for-react)
- [jakesgordon/javascript-state-machine: A javascript finite state machine library](https://github.com/jakesgordon/javascript-state-machine)
