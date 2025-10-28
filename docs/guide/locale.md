---
title: 国际化支持
---

# 国际化支持

`kaitify-react` 默认为中文环境，即显示的相关文字都是中文

同时支持英文和日语、韩语环境，即显示的相关文字都是英文、日语、韩语

## 中文环境

`Wrapper` 组件的 `locale` 属性设置为 `zh-CN` 或者不设置

```tsx
import { useState } from 'react'
import { Wrapper } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper locale='zh-CN' value={content} onChange={v => setContent(v)} placeholder='输入正文内容...'></Wrapper>
}
```

## 英文环境

`Wrapper` 组件的 `locale` 属性设置为 `en-US`

```tsx
import { useState } from 'react'
import { Wrapper } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper locale='en-US' value={content} onChange={v => setContent(v)} placeholder='输入正文内容...'></Wrapper>
}
```

## 韩语环境

`Wrapper` 组件的 `locale` 属性设置为 `ko-KR`

```tsx
import { useState } from 'react'
import { Wrapper } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper locale='ko-KR' value={content} onChange={v => setContent(v)} placeholder='输入正文内容...'></Wrapper>
}
```

## 日语环境

`Wrapper` 组件的 `locale` 属性设置为 `ja-JP`

```tsx
import { useState } from 'react'
import { Wrapper } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper locale='ja-JP' value={content} onChange={v => setContent(v)} placeholder='输入正文内容...'></Wrapper>
}
```

编辑器自身可能体现不出来中英文环境的差别，`kaitify-react` 提供了内置的 `Menu`，当设置 `locale` 为 `en-US` 后，这些内置 `Menu` 中的汉字都会转为英文，其他语言同理
