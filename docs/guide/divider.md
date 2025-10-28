---
title: Divider 菜单分隔线
---

# Divider 菜单分隔线

`Divider` 组件是 `kaitify-react` 的一个 `UI` 组件，该组件与编辑器具体的功能无关，它仅仅是为了排列多个 `Menu` 组件时，能够更好的为 `Menu` 组件划区

因此，`Divider` 组件是放置在 `Menu` 组件之间的

## 基本使用

```tsx
import { useState } from 'react'
import { Wrapper, Menu, Divider } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return (
    <Wrapper
      value={content}
      onChange={v => setContent(v)}
      placeholder='输入正文内容...'
      before={
        <>
          <Menu>菜单1</Menu>
          <Menu>菜单2</Menu>
          <Menu>菜单3</Menu>
          <Divider />
          <Menu>菜单4</Menu>
          <Menu>菜单5</Menu>
          <Menu>菜单6</Menu>
          <Divider />
          <Menu>菜单7</Menu>
          <Menu>菜单8</Menu>
        </>
      }
    ></Wrapper>
  )
}
```
