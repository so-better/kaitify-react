---
title: table 表格
---

# table 表格

插入表格

## 使用方法

```tsx
import { useState } from 'react'
import { Wrapper, TableMenu } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} before={<TableMenu />}></Wrapper>
}
```

## Props 参数

##### disabled <Badge type="danger" text="boolean" />

是否禁用该菜单，默认为 `false`

##### popoverProps <Badge type="danger" text="Omit<NonNullable<MenuPropsType['popoverProps']>, 'onShow' | 'onShowing' | 'onShown' | 'onHide' | 'onHiding' | 'onHidden'>" />

浮层属性配置，参考 `Menu` 的 `popoverProps` 属性

##### maxRows <Badge type="danger" text="number" />

创建表格时的最大行数

##### maxColumns <Badge type="danger" text="number" />

创建表格时的最大列数
