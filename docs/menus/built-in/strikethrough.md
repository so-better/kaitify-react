---
title: strikethrough 删除线
---

# strikethrough 删除线

设置/取消文本删除线

## 使用方法

```tsx
import { useState } from 'react'
import { Wrapper, StrikethroughMenu } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} before={<StrikethroughMenu />}></Wrapper>
}
```

## Props 参数

##### disabled <Badge type="danger" text="boolean" />

是否禁用该菜单，默认为 `false`

##### shortcut <Badge type="danger" text="(e: KeyboardEvent) => boolean" />

菜单快捷键实现，继承自 `Menu` 组件的同名属性，具体使用可参考 [Menu 组件的 shortcut](/guide/menu#shortcut)
