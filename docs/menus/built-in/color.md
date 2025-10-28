---
title: color 文本字体颜色
---

# color 文本字体颜色

设置/取消文本的字体颜色

## 使用方法

- 引入组件

```ts
import { ColorMenu } from '@kaitify/vue'
```

- 在 `Wrapper` 包裹器插槽中使用

```tsx
import { useState } from 'react'
import { Wrapper, ColorMenu } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} before={<ColorMenu />}></Wrapper>
}
```

## Props 参数

##### disabled <Badge type="danger" text="boolean" />

是否禁用该菜单，默认为 `false`

##### colors <Badge type="danger" text="string[]" />

自定义字体颜色的可选择颜色数组

##### popoverProps <Badge type="danger" text="Omit<NonNullable<MenuPropsType['popoverProps']>, 'onShow' | 'onShowing' | 'onShown' | 'onHide' | 'onHiding' | 'onHidden'>" />

浮层属性配置，参考 `Menu` 的 `popoverProps` 属性
