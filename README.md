# better-mouse-wheel

从 @better-scroll/mouse-wheel 魔改而来
[原文档](https://github.com/ustbhuangyi/better-scroll/blob/master/packages/mouse-wheel/README_zh-CN.md)

在原插件的基础上增加了 `exceptDOM` 的配置项，可传入 `HTMLElement | string | HTMLElement[]` ，当接收到来自 `exceptDOM` 的鼠标滚动事件时不会触发 `Better-scroll` 滚动，保留原生滚动。

## Usage

```js
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
BScroll.use(MouseWheel)

const bs = new BScroll('.wrapper', {
  // ...
  mouseWheel: {
    speed: 2,
    invert: false,
    easeTime: 300,
    exceptDOM: '.class'
  }
})
```
