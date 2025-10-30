---
title: Icon 图标
---

# Icon 图标

`Icon` 组件是 `kaitify-react` 的一个 `UI` 组件，通过该组件你可以在你想要的地方展示不同的图标

## 基本使用

```tsx
import { Icon } from '@kaitify/react'
export default function App() {
  return <Icon name='solar:home-bold-duotone' />
}
```

## Props 参数

##### name <Badge type="danger" text="string" />

图标的值，目前仅支持 `kaitify` 内置图标（暂不对外提供具体的使用）和 `@iconify/react` 图标，可在[https://icon-sets.iconify.design/](https://icon-sets.iconify.design/)上查找你想用的图标并复制其 `name` 使用

##### size <Badge type="danger" text="string | number" />

图标的大小，如果是数字默认单位为 `px`，默认图标大小为父元素的字体大小

##### style <Badge type="danger" text="CSSProperties" />

图标的额外样式

##### className <Badge type="danger" text="string" />

图标的样式类
