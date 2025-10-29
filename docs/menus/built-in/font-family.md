---
title: font-family 字体
---

# font-family 字体

设置/取消文本的字体

## 使用方法

```tsx
import { useState } from 'react'
import { Wrapper, FontFamilyMenu } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} before={<FontFamilyMenu />}></Wrapper>
}
```

## Props 参数

##### disabled <Badge type="danger" text="boolean" />

是否禁用该菜单，默认为 `false`

##### data <Badge type="danger" text="MenuDataType[]" />

自定义可选择的字体列表，同 `Menu` 组件的 `data` 参数类型，如：

```json
[
  { "label": "楷体", "value": "楷体,楷体-简" },
  { "label": "宋体", "value": "宋体,宋体-简" }
]
```

##### popoverProps <Badge type="danger" text="Omit<NonNullable<MenuPropsType['popoverProps']>, 'onShow' | 'onShowing' | 'onShown' | 'onHide' | 'onHiding' | 'onHidden'>" />

浮层属性配置，参考 `Menu` 的 `popoverProps` 属性

##### shortcut <Badge type="danger" text="{ [key: MenuDataType['value']]: (e: KeyboardEvent) => boolean }" />

菜单快捷键实现，继承自 `Menu` 组件的同名属性，具体使用可参考 [Menu 组件的 shortcut](/guide/menu#shortcut)
