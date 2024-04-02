---
layout: article
title: leetcode第 219 场周赛
description: 
img: leecode/banner/weekly-219.jpg
header: leecode/banner/weekly-219.jpg
date: 2023-04-01 12:12:12
category: 算法
tags:
  - 算法
  - 周赛
---

## 1.比赛中的配对次数

::tip{type="难度"}
简单
::

### [题目:](https://leetcode-cn.com/problems/count-of-matches-in-tournament/)

给你一个整数 n ，表示比赛中的队伍数。比赛遵循一种独特的赛制：

如果当前队伍数是 偶数 ，那么每支队伍都会与另一支队伍配对。总共进行 n / 2 场比赛，且产生 n / 2 支队伍进入下一轮。
如果当前队伍数为 奇数 ，那么将会随机轮空并晋级一支队伍，其余的队伍配对。总共进行 (n - 1) / 2 场比赛，且产生 (n - 1) / 2 + 1 支队伍进入下一轮。
返回在比赛中进行的配对次数，直到决出获胜队伍为止。

### 示例:

1. 示例 1:

```
输入：n = 7
输出：6
解释：比赛详情：
- 第 1 轮：队伍数 = 7 ，配对次数 = 3 ，4 支队伍晋级。
- 第 2 轮：队伍数 = 4 ，配对次数 = 2 ，2 支队伍晋级。
- 第 3 轮：队伍数 = 2 ，配对次数 = 1 ，决出 1 支获胜队伍。
总配对次数 = 3 + 2 + 1 = 6
```

2. 示例 2:

```
输入：n = 14
输出：13
解释：比赛详情：
- 第 1 轮：队伍数 = 14 ，配对次数 = 7 ，7 支队伍晋级。
- 第 2 轮：队伍数 = 7 ，配对次数 = 3 ，4 支队伍晋级。
- 第 3 轮：队伍数 = 4 ，配对次数 = 2 ，2 支队伍晋级。
- 第 4 轮：队伍数 = 2 ，配对次数 = 1 ，决出 1 支获胜队伍。
总配对次数 = 7 + 3 + 2 + 1 = 13
```

**提示：**

-   1 <= n <= 200

### 抛砖引玉

传入 n，每次 n 除以 2 结果取整为匹配次数，下一轮匹配在（n/2）向上取整的基础上匹配，返回最后 n 变成 1 时经历了多少次匹配

比赛时用了递归，有点高射炮打蚊子的感觉

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var numberOfMatches = function(n) {
    function helper(num, sum) {
        if (num === 1) return sum
        return helper(Math.ceil(num / 2), sum + parseInt(num / 2))
    }
    return helper(n, 0)
}
```

使用 while 限定边界

```javascript
var numberOfMatches = function(n) {
    let _result = 0
    while (n > 1) {
        _result += parseInt(n / 2)
        n = Math.ceil(n / 2)
    }
    return _result
}
```

---

## 2.十-二进制数的最少数目

::tip{type="难度"}
中等
::

### [题目:](https://leetcode-cn.com/problems/partitioning-into-minimum-number-of-deci-binary-numbers/)

如果一个十进制数字不含任何前导零，且每一位上的数字不是 0 就是 1 ，那么该数字就是一个 十-二进制数 。例如，101 和 1100 都是 十-二进制数，而 112 和 3001 不是。

给你一个表示十进制整数的字符串 n ，返回和为 n 的 十-二进制数 的最少数目。

### 示例:

1. 示例 1:

```
输入：n = "32"
输出：3
解释：10 + 11 + 11 = 32
```

2. 示例 2:

```
输入：n = "82734"
输出：8
```

3. 示例 3:

```
输入：n = "27346209830709182346"
输出：9
```

**提示：**

-   1 <= n.length <= $10^5$
-   n 仅由数字组成
-   n 不含任何前导零并总是表示正整数

### 抛砖引玉

使用 x 个只含有 0、1 的数组累加成 n，求 x，感觉就是一道脑筋急转弯。
其实我们不用知道怎么累计，只要知道 n 中所有位上最大的数是什么就好，它决定最少能拆分成几个 1

```javascript
/**
 * @param {string} n
 * @return {number}
 */
var minPartitions = function(n) {
    const list = String(n).split('')
    return Math.max(...list)
}
```

---

## 3. 石子游戏 VII

::tip{type="难度"}
中等
::

### [题目:](https://leetcode-cn.com/problems/stone-game-vii/)

石子游戏中，爱丽丝和鲍勃轮流进行自己的回合，爱丽丝先开始 。

有 n 块石子排成一排。每个玩家的回合中，可以从行中 移除 最左边的石头或最右边的石头，并获得与该行中剩余石头值之 和 相等的得分。当没有石头可移除时，得分较高者获胜。

鲍勃发现他总是输掉游戏（可怜的鲍勃，他总是输），所以他决定尽力 减小得分的差值 。爱丽丝的目标是最大限度地 扩大得分的差值 。

给你一个整数数组  stones ，其中 stones[i] 表示 从左边开始 的第 i 个石头的值，如果爱丽丝和鲍勃都 发挥出最佳水平 ，请返回他们 得分的差值 。

### 示例:

1. 示例 1:

```
输入：stones = [5,3,1,4,2]
输出：6
解释：
- 爱丽丝移除 2 ，得分 5 + 3 + 1 + 4 = 13 。游戏情况：爱丽丝 = 13 ，鲍勃 = 0 ，石子 = [5,3,1,4] 。
- 鲍勃移除 5 ，得分 3 + 1 + 4 = 8 。游戏情况：爱丽丝 = 13 ，鲍勃 = 8 ，石子 = [3,1,4] 。
- 爱丽丝移除 3 ，得分 1 + 4 = 5 。游戏情况：爱丽丝 = 18 ，鲍勃 = 8 ，石子 = [1,4] 。
- 鲍勃移除 1 ，得分 4 。游戏情况：爱丽丝 = 18 ，鲍勃 = 12 ，石子 = [4] 。
- 爱丽丝移除 4 ，得分 0 。游戏情况：爱丽丝 = 18 ，鲍勃 = 12 ，石子 = [] 。
得分的差值 18 - 12 = 6 。
```

2. 示例 2:

```
输入：stones = [7,90,5,1,100,10,10,2]
输出：122
```

**提示：**

-   n == stones.length
-   2 <= n <= 1000
-   1 <= stones[i] <= 1000

### 抛砖引玉

A、B 交替从数组中首尾取一个元素，剩余元素算作 A、B 得分，A 先手，A、B 每一步都取最优求 得分差值

比赛时看示例 1，一直在想 A、B 取元素的位置问题，走了一些弯路。

其实 A、B 选择元素的位置也不是确定的，需要根据当前剩余的 stones 来判断，问题的关键是每次选择先手的一方最优选择就是尽量扩大自己的得分。

选择的位置不确定，那么就将 stones 分割成子序列，在每个子序列给先手的一方最大得分，然后不断扩大子序列知道子序列等于 stones，这样就一步一步推到出了想要的结果。

### 动态规划

设 dp[i][j]表示区间 i 到 j 的得分差值，注意在区间 i 到 j 内先手的一方可能是 A 也可能是 B，那么先手选择后：dp[i][j-1]、dp[i+1][j]则是另一外一方先手形成的差值
那么：假设 dp[i][j]时 A 先手，dp[i][j-1]、dp[i+1][j]则是 B 先手
dp[i][j] = 本轮选择后得分 - 下一轮 B 先手形成的差值

| 0    | 1           | ... | i                        | ... | j                                     | ... | i 递减，j 递增 |
| ---- | ----------- | --- | ------------------------ | --- | ------------------------------------- | --- | -------------- |
| s[0] | s[0] + s[1] | ... | s[0] + s[1] + ... + s[i] | ... | s[0] + s[1] + ... + s[i] + ... + s[j] | ... | ...            |

本轮选择后得分：

-   选择 i 处(sum 去除 index <= i 部分和 index > j 部分：保留 j)：sum[j + 1]-sum[i + 1] = s[i] + ... + s[j]
-   选择 j 处(sum 去除 index < i 部分和 index >= j 部分：保留 i)：sum[j]-sum[i] = s[i-1] + ... + s[j-1]

```javascript
/**
 * @param {number[]} stones
 * @return {number}
 */
var stoneGameVII = function(stones) {
    let len = stones.length,
        sum = [0],
        dp = Array.from({ length: len }, _ => Array(len).fill(0))
    // 初始化不同位置和用于计算得分
    for (let i = 0; i < len; i++) sum.push(stones[i] + sum[i])
    // 两层遍历枚举不同选择组合
    for (let i = len - 1; i >= 0; --i) {
        for (let j = i + 1; j < len; ++j) {
            // 选择首个元素
            let left = sum[j + 1] - sum[i + 1] - dp[i + 1][j]
            // 选择尾个元素
            let right = sum[j] - sum[i] - dp[i][j - 1]
            dp[i][j] = Math.max(left, right)
        }
    }
    return dp[0][len - 1]
}
```

---

## 4. 堆叠长方体的最大高度

::tip{type="难度"}
困难
::

### [题目:](https://leetcode-cn.com/problems/maximum-height-by-stacking-cuboids/)

给你 n 个长方体 cuboids ，其中第 i 个长方体的长宽高表示为 cuboids[i] = [widthi, lengthi, heighti]（下标从 0 开始）。请你从 cuboids 选出一个 子集 ，并将它们堆叠起来。

如果 widthi <= widthj 且 lengthi <= lengthj 且 heighti <= heightj ，你就可以将长方体 i 堆叠在长方体 j 上。你可以通过旋转把长方体的长宽高重新排列，以将它放在另一个长方体上。

返回 堆叠长方体  cuboids 可以得到的 最大高度 。

### 示例:

1. 示例 1:

![堆叠长方体的最大高度](leecode/banner/weekly-219-1.jpg)

```
输入：cuboids = [[50,45,20],[95,37,53],[45,23,12]]
输出：190
解释：
第 1 个长方体放在底部，53x37 的一面朝下，高度为 95 。
第 0 个长方体放在中间，45x20 的一面朝下，高度为 50 。
第 2 个长方体放在上面，23x12 的一面朝下，高度为 45 。
总高度是 95 + 50 + 45 = 190 。
```

2. 示例 2:

```
输入：cuboids = [[38,25,45],[76,35,3]]
输出：76
解释：
无法将任何长方体放在另一个上面。
选择第 1 个长方体然后旋转它，使 35x3 的一面朝下，其高度为 76 。
```

2. 示例 2:

```
输入：cuboids = [[7,11,17],[7,17,11],[11,7,17],[11,17,7],[17,7,11],[17,11,7]]
输出：102
解释：
重新排列长方体后，可以看到所有长方体的尺寸都相同。
你可以把 11x7 的一面朝下，这样它们的高度就是 17 。
堆叠长方体的最大高度为 6 * 17 = 102 。
```

**提示：**

-   n == cuboids.length
-   1 <= n <= 100
-   1 <= widthi, lengthi, heighti <= 100

### 抛砖引玉

将 cuboids 中的元素简化成只包含 height，保持元素相对位置不变，那么题目就简化成了求数组的最大连续递增子序列的和。
可以用动态规划处理：
dp[i]表示 0 到 i 最大连续递增子序列和，两次遍历枚举 0 到 i 的组合

```javascript
let max = 0
for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
        max = Math.max(max, dp[j] + list[i], dp[i])
    }
}
```

再回到本题，每个元素增加了 width, length,两个属性，且属性可以相互替换，且排列顺序可以变化。

先看排列顺序，按照逻辑，长方体排列时，不管怎么排列，至少体积大的元素要放到底部，那么先按照体积确定 cuboids 的排列顺序。

再看[width, length, height]的组合旋转会出现 6 中可能：

1. [width, length, height]
2. [length, width, height]
3. [height, length, width]
4. [width, height, length]
5. [length, height, width]
6. [height, width, length]

那么将上面 6 中可能替换到 cuboids 中，动态规划重来组合元素时，遍历两个元素分别翻转的 6 种可能求出符合要求的最大堆叠高度。

```javascript
/**
 * @param {number[][]} cuboids
 * @return {number}
 */
var maxHeight = function(cuboids) {
    // 根据体积排序
    cuboids.sort(([a, b, c], [d, e, f]) => d * e * f - a * b * c)
    let _result = 0,
        len = cuboids.length
    //cuboids中每个元素位置存放其6中翻转组合
    for (let i = 0; i < len; i++) {
        const [l, m, h] = cuboids[i]
        cuboids[i] = [
            [l, m, h],
            [l, h, m],
            [m, l, h],
            [m, h, l],
            [h, m, l],
            [h, l, m],
        ]
        _result = Math.max(l, m, h, _result)
    }
    // dp初始化填充高
    const dp = Array(len).map((d, i) =>
        Array(6).map((v, k) => cuboids[i][k][2]),
    )
    // 枚举子序列组合：一个子元素为一组6个长宽高组合
    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            // 遍历所有翻转组合满足堆叠则更新最大高度
            for (let n = 0; n < 6; n++) {
                for (let m = 0; m < 6; m++) {
                    const [[wi, li, hi], [wj, lj, hj]] = [
                        cuboids[i][n],
                        cuboids[j][m],
                    ]
                    if (wj >= wi && lj >= li && hj >= hi) {
                        dp[i][n] = Math.max(dp[i][n], dp[j][m] + hi)
                    }
                    _result = Math.max(dp[i][n], _result)
                }
            }
        }
    }
    return _result
}
```

#### 优化元素组合和默认排序&降维

1. 元素组合
   因为要求 widthi <= widthj 且 lengthi <= lengthj，所以对每个 cuboids 的元素排序，最大的作为高，最后堆叠的高度一定是最高的。
   （每个元素 width, length, height 都是递增的，能不能堆叠不受排序影响）

2. 优化默认排序
   上面已经对元素组合进行了排序，一直 cuboids 每个元素都是递增的，那么可以优化 cuboids 的排序，使用 cuboids 也递增：
   (可以将三个数想象这次一个数字，组合的数组递增)

```javascript
/**
 * @param {number[][]} cuboids
 * @return {number}
 */
var maxHeight = function(cuboids) {
    const len = cuboids.length
    // 每个元素宽、长、高递增
    for (const cube of cuboids) cube.sort((a, b) => a - b)
    // 集合整体递增
    cuboids.sort((a, b) => {
        for (let i = 0; i < 3; i++) {
            if (a[i] - b[i]) return a[i] - b[i]
        }
        return 0
    })
    // 初始化dp
    const dp = [...Array(len)].map((v, k) => cuboids[k][2])
    // 枚举子序列组合
    for (let i = 1; i < len; i++) {
        const [wi, li, hi] = cuboids[i]
        for (let j = 0; j < i; j++) {
            const [wj, lj, hj] = cuboids[j]
            if (wi >= wj && li >= lj && hi >= hj) {
                dp[i] = Math.max(dp[i], dp[j] + hi)
            }
        }
    }
    return Math.max(...dp)
}
```
