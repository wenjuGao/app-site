---
layout: article
title: JS 中的 map,some,every,filter,find,findIndex,forEach 跳出循环
description: js 中终止循环分为：终止本次循环，终止循环体，终止的形式也各有不同包括：return true fasle break 等，对应不同场景终止循环需要使用不同形式
img: /img/forEach.jpg
header: /img/forEach-banner.jpg
banner: true
category: javascript
tags:
  - 循环
  - map
  - some
  - every
  - filter
  - find
  - findIndex
  - forEach
  - javascript
---


>  js 中终止循环分为：终止本次循环，终止循环体，终止的形式也各有不同包括：return true fasle break 等，对应不同场景终止循环需要使用不同形式。

### every 循环

- 用于检测数组所有元素是否都符合指定条件；
- 如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测，既 return false 时跳出整个循环；
- 如果所有元素都满足条件，则返回 true；
- return true 则执行下一次循环;
- 无 return 则默认 return false 跳出整个循环；
- 不会对空数组进行检测；
- 不会改变原始数组；

```Javascript
let list = [1, 2, 3, 4, 5];
list.every((value, index) => {
    if(value > 3){
        console.log(value)// 4
        return false;
    }else{
        console.log(value)// 1 2 3
        return true;
    }
});

list.every((value, index) => {
    if(value > 3){
        console.log(value)
        return false;
    }else{
        console.log(value)// 1
        // return true; 如果没有返回值true 的话，也会跳出循环
    }
});
```

### forEach 循环

- 无返回值，只依次处理每个元素（使用 callback）；
- 对于空数组是不会执行回调函数的；
- 引发异常外，没有其他方法可以停止或中断循环
- forEach 的本事是异步函数，但是其内部 callback 是同步的；

```javascript
let list = [1, 2, 3, 4, 5]
let sum = 0

list.forEach((value, index) => {
  if (value > 3) {
    console.log(value) // 4 5
    return false // 没有返回值，ruturn false 仍向下执行
  } else {
    console.log(value) // 1 2 3
    return true // 没有返回值，ruturn true 仍向下执行
  }
})

let sumFunction = async function(a, b) {
  return a + b
}

list.forEach(async function(item) {
  sum = await sumFunction(sum, item)
})

console.log(sum) // 0
setTimeout(() => console.log(sum)) // 1
```

### some 循环

- 用于检测数组中的元素是否满足指定条件；
- 如果有一个元素满足条件，则表达式返回 true , 剩余的元素不会再执行检测，既 return true 时跳出整个循环；
- 如果没有满足条件的元素，则返回 false;
- 无 return 则默认 return false 继续循环；
- 不会对空数组进行检测；
- 不会改变原始数组；

```javascript
let list = [1, 2, 3, 4, 5]
list.some((value, index) => {
  if (value === 3) {
    return true // 当内部return true时跳出整个循环
  }
  console.log(value) // 1 2
})
```

### map 循环

- 返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值；
- 不会对空数组进行检测；
- 不会改变原始数组；

```javascript
let list = [1, 2, 3, 4, 5]
const resultA = list.map(parseInt) // 1, NaN, NaN, NaN, NaN
const resultB = list.map(item => parseInt(item)) // 1, 2, 3, 4, 5
```

### filter 循环

- 创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
- 不会对空数组进行检测；
- 不会改变原始数组；

```javascript
let newArray = arr.filter(callback(element[, index, [array]])[, thisArg]);

let fruits = ['apple', 'banana', 'grapes', 'mango', 'orange']

/**
 * Filter array items based on search criteria (query)
 */
function filterItems(arr, query) {
  return arr.filter(function(el) {
      return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
  })
}

console.log(filterItems(fruits, 'ap'))  // ['apple', 'grapes']
console.log(filterItems(fruits, 'an'))  // ['banana', 'mango', 'orange']
```

### find 方法

- 返回通过测试（函数内判断）的数组的第一个元素的值；
- 数组中的每个元素都调用一次函数执行；
- 当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数；
- 如果没有符合条件的元素返回 undefined
- 不会对空数组进行检测；
- 不会改变原始数组；

```javascript
array.find(function(currentValue, index, arr),thisValue);
let list = [1,2,3,4,5];
const result = list.find(item => item > 2);
console.log(result); // 3
```

### findIndex 方法

- 返回传入一个测试条件（函数）符合条件的数组第一个元素位置;
- 数组中的每个元素都调用一次函数执行；
- 当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数；
- 如果没有符合条件的元素返回 undefined
- 不会对空数组进行检测；
- 不会改变原始数组；

```javascript
array.findIndex(function(currentValue, index, arr),thisValue);
let list = [1,2,3,4,5];
const result = list.findIndex(item => item > 2);
console.log(result); // 2
```
