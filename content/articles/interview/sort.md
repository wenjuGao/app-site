---
layout: article
title: 排序算法
description: 
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
banner: true
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - 算法
  - 排序
---

### 1. 堆排序(Heapsort)

子节点的键值或索引总是小于（或者大于）它的父节点

```javascript
Array.prototype.heap_sort = function() {
	var arr = this.slice(0);
	// 交换
	function swap(i, j) {
		var tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
	}

	function max_heapify(start, end) {
		//建立父節點指標和子節點指標
		var dad = start;
		var son = dad * 2 + 1;
		if (son >= end)//若子節點指標超過範圍直接跳出函數
			return;
		if (son + 1 < end && arr[son] < arr[son + 1])//先比較兩個子節點大小，選擇最大的
			son++;
		if (arr[dad] <= arr[son]) {//如果父節點小於子節點時，交換父子內容再繼續子節點和孫節點比較
			swap(dad, son);
			max_heapify(son, end);
		}
	}

	var len = arr.length;
	//初始化，i從最後一個父節點開始調整
	for (var i = Math.floor(len / 2) - 1; i >= 0; i--)
		max_heapify(i, len);
	//先將第一個元素和已排好元素前一位做交換，再從新調整，直到排序完畢
	for (var i = len - 1; i > 0; i--) {
		swap(0, i);
		max_heapify(0, i);
	}

	return arr;
};
var a = [3, 5, 3, 0, 8, 6, 1, 5, 8, 6, 2, 4, 9, 4, 7, 0, 1, 8, 9, 7, 3, 1, 2, 5, 9, 7, 4, 0, 2, 6];
console.log(a.heap_sort());
```

----

### 2. 快速排序

1. 任选一个元素pivot（作为基准），将数组其他元素根据与pivot大小关系，放置到pivot两侧（左侧元素都小于pivot，右侧元素都大于pivot）
2. 对pivot左右两侧的子片段，重新上面选取基准，然后根据基准排列左右测元素的逻辑
3. 当基准元素两侧的元素仅为1个时，说明当前子片段排序完成，所有子片段均完成排序，则数组排序完成


#### 1. 操作数组

```javascript
	function quickSort(arr) {
		if (arr.length <= 0) return arr;
		const index = parseInt(arr.length / 2),
			pivot = arr.splice(index, 1)[0];
		let left = [],
			right = [];
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] > pivot) {
				right.push(arr[i])
			} else {
				left.push(arr[i])
			}
		}
		return quickSort(left).concat(pivot, quickSort(right));
	}
}
```

#### 1. 原地排序

```javascript
	function partition(arr, left, right) {
		// 选择基准pivot，排列基准左右的元素（排列范围left-right）
		let pivot = Math.floor((left + end) / 2),
			i = left,
			j = right;
		while (i <= j) {
			while (arr[i] < arr[pivot]) i++;
			while (arr[j] > arr[pivot]) j--;
			if (i <= j) {
				[arr[i], arr[j]] = [arr[j], arr[i]];
				i++;
				j--;
			}
		}
		return i;
	}

	function quickSort(arr, left = 0, right = arr.length - 1) {
		if (arr.length <= 1) return arr;
		const index = partition(arr, left, right);
		if (left < index - 1) {
			quickSort(arr, left, index - 1);
		}
		if (index < right) {
			quickSort(arr, index, right);
		}
		return arr;
	}
```


将要排序的数据分割成独立的两部分，其中一部分的所有数据比另一部分的所有数据要小.

再按这种方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，使整个数据变成有序序列。


---

### 冒泡排序


```js
function bubbleSort (arr) {
  let len = arr.length - 1;
  for (let j = 0; j < len; j++) {
    // 声明一个变量，作为标志位
    let done = true;
    for (let i = 0; i < len - j; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        done = false;
      }
    }
    if (done) {
      break;
    }
  }
  return arr;
}
```


----


### 二分法排序


```javascript
// 二分法查找
var arr = [1,3,4,6,45,76,88,450];

// 思路：找到数组的中间数（midVal）,和你要查找的数（findVal）进行比较，
// 如果 midVal > findVal在数组的左边，就把该数组二分（就只在左边查找）
function binarySearch(arr, finalVal, leftIndex, rightIndex) {

	if (leftIndex > rightIndex) {
		console.log("下标错误/找不到");
		return;
	}
	// 找到中间这个只值
	var midIndex = Math.floor((leftIndex + rightIndex)/2);
	var midVal = arr[midIndex];

	if (finalVal > midVal) {
		arguments.callee(arr, finalVal, midIndex + 1, rightIndex);
	} else if (finalVal < midVal) {
		arguments.callee(arr, finalVal, leftIndex, midIndex -1);
	} else {
		console.log("找到了");
	}

}

binarySearch(arr, 34,0,arr.length - 1);
```

 arguments.callee 属性包含当前正在执行的函数。实现匿名函数递归
 [arguments.callee 从ES5严格模式中删除](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments/callee)
 


---

### 基数排序

### 并归排序