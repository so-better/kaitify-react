---
title: code-block-languages 代码块语言选择
---

# code-block-languages 代码块语言选择

选择语言来设置代码块的高亮

## 使用方法

```tsx
import { useState } from 'react'
import { Wrapper, CodeBlockLanguagesMenu } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} before={<CodeBlockLanguagesMenu />}></Wrapper>
}
```

## Props 参数

##### disabled <Badge type="danger" text="boolean" />

是否禁用该菜单，默认为 `false`

##### languages <Badge type="danger" text="HljsLanguageType[]" />

自定义可选择的语言列表，默认是全量的值，全量值请参考 `HljsLanguages` 的值

##### popoverProps <Badge type="danger" text="Omit<NonNullable<MenuPropsType['popoverProps']>, 'onShow' | 'onShowing' | 'onShown' | 'onHide' | 'onHiding' | 'onHidden'>" />

浮层属性配置，参考 `Menu` 的 `popoverProps` 属性

##### shortcut <Badge type="danger" text="{ [key: MenuDataType['value']]: (e: KeyboardEvent) => boolean }" />

菜单快捷键实现，继承自 `Menu` 组件的同名属性，具体使用可参考 [Menu 组件的 shortcut](/guide/menu#shortcut)
