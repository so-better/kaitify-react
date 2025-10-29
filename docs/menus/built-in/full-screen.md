---
title: full-screen 全屏功能
---

# full-screen 全屏功能

设置/取消编辑器的全屏效果

## 使用方法

```tsx
import { useState } from 'react'
import { Wrapper, FullScreenMenu } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} before={<FullScreenMenu />}></Wrapper>
}
```

## Props 参数

##### target <Badge type="danger" text="string" />

必填属性，该菜单在进行全屏设置时需要指定的 `dom`，这个 `dom` 应当包裹住了编辑器。

由于在真实的 `dom` 渲染中，`before` 和 `after` 插槽的内容都是在编辑区域之外的，所以若是希望合理地使用全屏功能，需要使用一个 `dom` 包裹住整个编辑器包括 `before` 和 `after` 的区域

##### zIndex <Badge type="danger" text="number" />

全屏 `dom` 的 `z-index` 设置，默认为 `100`

##### disabled <Badge type="danger" text="boolean" />

是否禁用该菜单，默认为 `false`

##### shortcut <Badge type="danger" text="(e: KeyboardEvent) => boolean" />

菜单快捷键实现，继承自 `Menu` 组件的同名属性，具体使用可参考 [Menu 组件的 shortcut](/guide/menu#shortcut)
