---
layout: article
title: markdown文档中使用图标
description: nuxtContent中使用自定义组件实现markdown中展示图标
img: site/img/echarts-view.jpg
header: site/img/echarts-view.jpg
date: 2024-04-12 12:12:12
category: 
tags:
---



::EchartChart
---
height: h-60
option: {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}
---
::



::G6Chart
---
height: h-60
container: {
  defaultNode: {
    type: "circle",
    size: [100],
    color: "#5B8FF9",
    style: {
      fill: "#9EC9FF",
      lineWidth: 3
    },
    labelCfg: {
      style: {
        fill: "#fff",
        fontSize: 20
      }
    }
  },
  defaultEdge: {
    style: {
      stroke: "#e2e2e2"
    }
  }
}
data: {
  nodes: [
    {
      id: "node1",
      label: "Circle1",
      x: 150,
      y: 150
    },
    {
      id: "node2",
      label: "Circle2",
      x: 400,
      y: 150
    }
  ],
  edges: [
    {
      source: "node1",
      target: "node2"
    }
  ]
}
---
::