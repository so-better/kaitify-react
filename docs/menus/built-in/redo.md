---
title: redo 重做
---

# redo 重做

执行重做操作

## 使用方法

```tsx
import { useState } from 'react'
import { Wrapper, RedoMenu } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} before={<RedoMenu />}></Wrapper>
}
```

## Props 参数

##### disabled <Badge type="danger" text="boolean" />

是否禁用该菜单，默认为 `false`
