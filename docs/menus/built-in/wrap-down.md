---
title: wrap-down 向下换行
---

# wrap-down 向下换行

在匹配的节点位置向下换行

## 使用方法

```tsx
import { useState } from 'react'
import { Wrapper, WrapDownMenu } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} before={<WrapDownMenu />}></Wrapper>
}
```

## Props 参数

##### disabled <Badge type="danger" text="boolean" />

是否禁用该菜单，默认为 `false`

##### match <Badge type="danger" text="KNodeMatchOptionType" />

匹配相关的节点，如果匹配上了，则会在点击菜单时向下换行，关于该属性的释义，同 [kaitify 中的 Editor 的 getMatchNodeBySelection 方法中的入参](https://www.so-better.cn/docs/kaitify-core/apis/editor-function#getmatchnodebyselection)

##### shortcut <Badge type="danger" text="(e: KeyboardEvent) => boolean" />

菜单快捷键实现，继承自 `Menu` 组件的同名属性，具体使用可参考 [Menu 组件的 shortcut](/guide/menu#shortcut)
