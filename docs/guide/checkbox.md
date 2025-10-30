---
title: Checkbox 复选框
---

# Checkbox 复选框

`Checkbox` 组件是 `kaitify-react` 的一个 `UI` 组件，该组件与编辑器具体的功能无关，它一般用于带浮层的菜单中，用来进行勾选

## 基本使用

```tsx
import { useState } from 'react'
import { Checkbox } from '@kaitify/react'

export default function App() {
  const [checked, setChecked] = useState(false)

  return <Checkbox label='我是复选框' checked={checked} onChange={setChecked} />
}
```

## Props 参数

##### checked <Badge type="danger" text="boolean" />

复选框的值

##### onChange <Badge type="danger" text="(checked: boolean) => void" />

复选框选择事件

##### disabled <Badge type="danger" text="boolean" />

复选框是否禁用

##### label <Badge type="danger" text="string" />

复选框右侧显示的文字内容
