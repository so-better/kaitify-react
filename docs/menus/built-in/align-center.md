---
title: align-center 居中对齐
---

# align-center 居中对齐

设置/取消块节点的居中对齐效果

## 使用方法

- 引入组件

```ts
import { AlignCenterMenu } from '@kaitify/react'
```

- 在 `Wrapper` 包裹器插槽中使用

```tsx
import { useState } from 'react'
import { Wrapper, AlignCenterMenu } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} before={<AlignCenterMenu />}></Wrapper>
}
```

## Props 参数

##### disabled <Badge type="danger" text="boolean" />

是否禁用该菜单，默认为 `false`

##### shortcut <Badge type="danger" text="(e: KeyboardEvent) => boolean" />

菜单快捷键实现，继承自 `Menu` 组件的同名属性，具体使用可参考 [Menu 组件的 shortcut](/guide/menu#shortcut)
