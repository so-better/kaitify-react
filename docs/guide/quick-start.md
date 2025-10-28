---
title: 快速上手
---

# 快速上手

## 构建一个编辑器

直接使用 `kaitify-react` 提供的 `Wrapper` 组件来渲染编辑器

```tsx
import { useState } from 'react'
import { Wrapper } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} placeholder='输入正文内容...'></Wrapper>
}
```

## 基本组件

我们提供了如下的基本组件，可以很好的帮助我们在 `React` 项目中使用 `kaitify-react`

##### Wrapper

`Wrapper` 组件是编辑器的核心组件，它直接渲染一个编辑器，是对 `kaitify` 的二次包装，无需我们使用原生 `js` 的方式去构建编辑器

具体的属性配置和使用方法，参考 [Wrapper 组件](/guide/wrapper)

```tsx
import { useState } from 'react'
import { Wrapper } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} placeholder='输入正文内容...'></Wrapper>
}
```

##### Bubble

`Bubble` 气泡栏组件是编辑器内置的组件，它会跟随编辑器光标进行浮动显示，我们可以通过直接引入 `Bubble` 组件并在 `Wrapper` 组件的 `default` 插槽中放置来使用

具体的属性配置和使用方法，参考 [Bubble 组件](/guide/bubble)

```tsx
import { useState } from 'react'
import { Wrapper, Bubble } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return (
    <Wrapper value={content} onChange={v => setContent(v)} placeholder='输入正文内容...'>
      <Bubble visible={true}>我是气泡栏</Bubble>
    </Wrapper>
  )
}
```

##### Menu

`Menu` 菜单组件是编辑器内置的组件，它提供了一个基本的菜单按钮的样式，可以节省我们的工作，Menu 组件必须在 `Wrapper` 组件的插槽中使用

具体的属性配置和使用方法，参考 [Menu 组件](/guide/menu)

```tsx
import { useState } from 'react'
import { Wrapper,Menu } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} placeholder='输入正文内容...' before={<Menu>菜单按钮</Menu>}></Wrapper>
}
</script>
```
