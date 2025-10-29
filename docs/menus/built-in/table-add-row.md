---
title: table-add-row 表格添加行
---

# table-add-row 表格添加行

给表格添加行

## 使用方法

```tsx
import { useState } from 'react'
import { Wrapper, TableAddRowMenu } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} before={<TableAddRowMenu />}></Wrapper>
}
```

## Props 参数

##### disabled <Badge type="danger" text="boolean" />

是否禁用该菜单，默认为 `false`

##### type <Badge type="danger" text="'top' | 'bottom'" />

在当前光标所在列的上方还是下方添加行

##### shortcut <Badge type="danger" text="(e: KeyboardEvent) => boolean" />

菜单快捷键实现，继承自 `Menu` 组件的同名属性，具体使用可参考 [Menu 组件的 shortcut](/guide/menu#shortcut)
