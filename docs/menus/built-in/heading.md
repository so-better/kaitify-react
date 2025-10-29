---
title: heading 标题
---

# heading 标题

设置/取消标题

## 使用方法

```tsx
import { useState } from 'react'
import { Wrapper, HeadingMenu } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} before={<HeadingMenu />}></Wrapper>
}
```

## Props 参数

##### disabled <Badge type="danger" text="boolean" />

是否禁用该菜单，默认为 `false`

##### data <Badge type="danger" text="MenuDataType[]" />

自定义可选择的标题列表，同 `Menu` 组件的 `data` 参数类型，标题的值只支持从 1-6，如：

```json
[
  {
    "label": "一级标题",
    "value": 1
  },
  {
    "label": "二级标题",
    "value": 2
  },
  {
    "label": "三级标题",
    "value": 3
  },
  {
    "label": "四级标题",
    "value": 4
  },
  {
    "label": "五级标题",
    "value": 5
  },
  {
    "label": "六级标题",
    "value": 6
  }
]
```

##### popoverProps <Badge type="danger" text="Omit<NonNullable<MenuPropsType['popoverProps']>, 'onShow' | 'onShowing' | 'onShown' | 'onHide' | 'onHiding' | 'onHidden'>" />

浮层属性配置，参考 `Menu` 的 `popoverProps` 属性

##### shortcut <Badge type="danger" text="{ [key: MenuDataType['value']]: (e: KeyboardEvent) => boolean }" />

菜单快捷键实现，继承自 `Menu` 组件的同名属性，具体使用可参考 [Menu 组件的 shortcut](/guide/menu#shortcut)
