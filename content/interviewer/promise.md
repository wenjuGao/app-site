---
layout: article
title: Promise
description: 
img: app-site/img/action-scope.jpg
header: app-site/img/action-scope-header.jpg
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - Promise
---


一个 Promise 对象代表一个在这个 promise 被创建出来时不一定已知的值。
它让您能够把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来。 
这样使得异步方法可以像同步方法那样返回值：
异步方法并不会立即返回最终的值，而是会返回一个 promise，以便在未来某个时候把值交给使用者。

一个 Promise 必然处于以下几种状态之一：
- 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝。
- 已兑现（fulfilled）: 意味着操作成功完成。
- 已拒绝（rejected）: 意味着操作失败。


```javascript
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

class Promise {
	constructor(executor) {
		this.status = PENDING; // 宏变量, 默认是等待态
		this.value = undefined; // then方法要访问到所以放到this上
		this.reason = undefined; // then方法要访问到所以放到this上
		let resolve = (value) => {
			if (this.status === PENDING) {// 保证只有状态是等待态的时候才能更改状态
				this.value = value;
				this.status = RESOLVED;
			}
		};
		let reject = (reason) => {
			if (this.status === PENDING) {
				this.reason = reason;
				this.status = REJECTED;
			}
		};
		// 执行executor传入我们定义的成功和失败函数:把内部的resolve和reject传入executor中用户写的resolve, reject
		try {
			executor(resolve, reject);
		} catch(e) {
			console.log('catch错误', e);
			reject(e); //如果内部出错 直接将error手动调用reject向下传递
		}
	}
	then(onfulfilled, onrejected) {
		if (this.status === RESOLVED) {
			onfulfilled(this.value);
		}
		if (this.status === REJECTED) {
			onrejected(this.reason);
		}
	}
}
module.exports = Promise;
```




```javascript
function Promise(func) {
  this.fullfilled = false;
  this.rejected = false;
  this.pending = true;
  this.handlers = [];
  this.errorHandlers = [];
  function resolve(...args) {
    this.handlers.forEach(handler => handler(...args));
  }
  function reject(...args) {
    this.errorHandlers.forEach(handler => handler(...args));
  }
  func.call(this, resolve.bind(this), reject.bind(this));
}

Promise.prototype.then = function(func) {
  this.handlers.push(func);
  return this;
};
Promise.prototype.catch = function(func) {
  this.errorHandlers.push(func);
  return this;
};

Promise.race = promises =>
  new Promise((resolve, reject) => {
    promises.forEach(promise => {
      promise.then(resolve, reject);
    });
  });

Promise.all = promises =>
  new Promise((resolve, reject) => {
    let len = promises.length;
    let res = [];
    promises.forEach((p, i) => {
      p.then(r => {
        if (len === 1) {
          resolve(res);
        } else {
          res[i] = r;
        }
        len--;
      }, reject);
    });
  });

// test
const p1 = new Promise(resolve =>
  setTimeout(resolve.bind(null, "resolved"), 3000)
);
p1.then(console.log).then((...args) => console.log("second", ...args));

const p2 = new Promise((resolve, reject) =>
  setTimeout(reject.bind(null, "rejected"), 3000)
);
p2.then(console.log).catch((...args) => console.log("fail", ...args));

```



```javascript
class Prom {
  static resolve (value) {
    if (value && value.then) {
      return value 
    }
    return new Prom(resolve => resolve(value))
  }

  constructor (fn) {
    this.value = undefined
    this.reason = undefined
    this.status = 'PENDING'

    // 维护一个 resolve/pending 的函数队列
    this.resolveFns = []
    this.rejectFns = []

    const resolve = (value) => {
      // 注意此处的 setTimeout
      setTimeout(() => {
        this.status = 'RESOLVED'
        this.value = value
        this.resolveFns.forEach(({ fn, resolve: res, reject: rej }) => res(fn(value)))
      })
    }

    const reject = (e) => {
      setTimeout(() => {
        this.status = 'REJECTED'
        this.reason = e
        this.rejectFns.forEach(({ fn, resolve: res, reject: rej }) => rej(fn(e)))
      })
    }

    fn(resolve, reject)
  }


  then (fn) {
    if (this.status === 'RESOLVED') {
      const result = fn(this.value)
      // 需要返回一个 Promise
      // 如果状态为 resolved，直接执行
      return Prom.resolve(result)
    }
    if (this.status === 'PENDING') {
      // 也是返回一个 Promise
      return new Prom((resolve, reject) => {
        // 推进队列中，resolved 后统一执行
        this.resolveFns.push({ fn, resolve, reject }) 
      })
    }
  }

  catch (fn) {
    if (this.status === 'REJECTED') {
      const result = fn(this.value)
      return Prom.resolve(result)
    }
    if (this.status === 'PENDING') {
      return new Prom((resolve, reject) => {
        this.rejectFns.push({ fn, resolve, reject }) 
      })
    }
  }
}

Prom.resolve(10).then(o => o * 10).then(o => o + 10).then(o => {
  console.log(o)
})

return new Prom((resolve, reject) => reject('Error')).catch(e => {
  console.log('Error', e)
})
```