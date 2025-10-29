---
title: table-merge-cell 表格单元格合并
---

# table-merge-cell 表格单元格合并

删除表格行

## 使用方法

```tsx
import { useState } from 'react'
import { Wrapper, TableMergeCellMenu } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} before={<TableMergeCellMenu />}></Wrapper>
}
```

## Props 参数

##### disabled <Badge type="danger" text="boolean" />

是否禁用该菜单，默认为 `false`

##### direction <Badge type="danger" text="TableCellsMergeDirectionType" />

当前光标所在的单元格往哪个方向合并，可取值 `"left" | "right" | "bottom" | "top"`

##### shortcut <Badge type="danger" text="(e: KeyboardEvent) => boolean" />

菜单快捷键实现，继承自 `Menu` 组件的同名属性，具体使用可参考 [Menu 组件的 shortcut](/guide/menu#shortcut)
