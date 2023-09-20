---
layout: article
title: 节流与防抖
description: 
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - 节流
  - 防抖
---

节流和防抖本身的目的都是避免函数被多次触发，引起不必要的性能开销，但是两者在逻辑上是不同的。
- 节流：有函数再等待则不再增加新的函数排队
- 防抖：有函数再等待，后面又被触发则清除未执行的计时器，重新开始计时

### 防抖(debounce)

在一个时间间隔内多次触发会清除前面触发飞的计时器，保留最后一个触发的计时器，确保函数只在最后一个时间周期计时完成触发

```javascript
function debounce(fn, wait) {
    let timer = null
    return function (...arguments) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            clearTimeout(timer)
        }, wait)
    }
}
```

### 节流(throttle)

在一个时间间隔内多次触发时如果有事件已经存在计时器那么间隔内的触发将忽略，只保留第一次触发，待其计时完成才能再次触发

```javascript
function throttle(fn, wait) {
    let timer = null
    return function(...arguments) {
      if(timer) return
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = null
      }, wait)
    }
}
```

### 皮一下

换种表述方式：
- 防抖，来新客人了就不管旧人了重新开始算时间
- 节流，有新客人？不管他，等旧人的时间到了再让客人再过来吧


### 适用场景：

也举个被最多举的例子吧

- 输入宽输入 	->	防抖 因为函数最终想要的是完成的输入数据
- 页面滚动 		->	节流 因为如果前面滚动触发了函数后面一个周期内的都是无效可以忽略的逻辑

### 项目中应用

一般项目中，其实很少自己去写这个逻辑的，奉行着拿来主义，当然是去找第三方给我们提供的方法。

#### 节流(throttle)

[lodash.throttle](https://www.lodashjs.com/docs/lodash.throttle)

可以看到lodash中的节流给提供了更丰富的配置：
- func (Function): 要节流的函数。
- wait (number,默认0): 需要节流的毫秒。
- options: 选项对象。
	- leading (boolean,默认true): 指定调用在节流开始前。
	- trailing (boolean,默认true): 指定调用在节流结束后。

```javascript
function func(){
	// 这里是业务逻辑
}
// 节流
let myThrottle =  _.throttle(func, 10000, { 'trailing': false });

myThrottle.flush	// 立即调用
myThrottle.cancel   // 取消节流调用将清除计时器
```

#### 防抖(debounce)

[lodash.debounce](https://www.lodashjs.com/docs/lodash.debounce)

- func (Function): 要防抖的函数。
- wait (number,默认0): 需要防抖的毫秒。
- options: 选项对象。
	- leading (boolean,false): 延迟开始前调用。
	- maxWait (Number): 设置 func 允许被延迟的最大值
	- trailing (boolean,默认true): 延迟结束后调用

```javascript
function func(){
	// 这里是业务逻辑
}
// 防抖
let myDebounce =  _.debounce(func, 1000,{ 'maxWait': 3000 });

myDebounce.flush	// 立即调用
myDebounce.cancel   // 取消防抖调用将清除计时器
```

**注意（debounce & throttle）：**
- 如果 leading 和 trailing 均为 true, 则只有一个周期结束才会调用
- 如果 wait 为 0 并且 leading 为 false, func调用会被推迟，即延迟结束调用的是下轮计时器开启时的调用，类似setTimeout为0的超时


可以发现在lodash中节流和防抖的逻辑是通过该（debounce 或者 throttle）的参数配置得到的。
### 源码

既然已经看到这里了，那不妨搂一眼lodash的源码吧。

```javascript
import debounce from './debounce.js'
import isObject from './isObject.js'
function throttle(func, wait, options) {
  let leading = true
  let trailing = true
// ------ 参数校验
  // func要是函数 
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  // 回填下可配置项
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }
// ------
// 重点来喽，在lodash中节流和防抖其实主要都是通过debounce函数实现
  return debounce(func, wait, {
    leading,
    trailing,
    'maxWait': wait
  })
}

export default throttle
```

lodash中的逻辑要包括：
1. 等待时阻断间隔周期内的函数调用
2. 间隔周期内触发更新计时逻辑
3. 主动调用函数
4. 主动取消计时器
5. 根据leading、trailing配置决定函数是在计时器开始前调用还是开始后调用

以下代码为源码删减后代码(删减部分包括:依赖引入、参数校验)

```javascript
function debounce(func, wait, options) {
  let lastArgs, //  上一次调用参数
    lastThis,	// 上一次调用主体
    maxWait,	// 等待时间
    result,		// 函数调用
    timerId,	// 计时器
    lastCallTime  // 上一次被调用时间

  let lastInvokeTime = 0
  let leading = false  
  let maxing = false
  let trailing = true   // 指定调用在节流结束后
// ------ 参数校验 
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  wait = +wait || 0
  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }
// ------
// 调用函数及记录时间
  function invokeFunc(time) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }
  // 一轮计时器开始前调用 => 计时器期间被再次出发新成新的计时器
  function leadingEdge(time) {
    lastInvokeTime = time
    timerId = setTimeout(timerExpired, wait)
    return leading ? invokeFunc(time) : result
  }
  // 重新计算计时器时间
  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime // 从开始等待时间到现在的时间间隔
    const timeWaiting = wait - timeSinceLastCall      // 从上次调用到现在的时间间隔
    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    // 第一次调用 || 等待时间结束 || 到达间隔周期
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) || (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
  }
  // 计时完成调用函数 => 计时器期间被再次出发更新计时器时间
  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // 更新计时器
    timerId = setTimeout(timerExpired, remainingWait(time))
  }
  // 一轮计时器其结束调用
  function trailingEdge(time) {
    timerId = undefined
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }
	// 取消调用
  function cancel() {
    if (timerId !== undefined) clearTimeout(timerId)
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }
// 立即发送
  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }
// 查询状态：如果存在计时器则说明有事件在等待着
  function pending() {
    return timerId !== undefined
  }
// 防抖函数主体	
  function debounced(...args) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time
    // 满足到达间隔或者第一次调用直接开始调用或者计算逻辑
    if (isInvoking) {
      if (timerId === undefined) {
        // 如果没有开始及时开启及时
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        timerId = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    // 无计时器开启新的计时器
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait)
    }
    return result
  }
//   给主体函数附加属性和方法
  debounced.cancel = cancel
  debounced.flush = flush
  debounced.pending = pending
  return debounced
}

export default debounce
```


### 应用

npm -> throttle-debounce

```javascript
import { throttle } from 'throttle-debounce'

throttle(300, this.handleScroll)

```