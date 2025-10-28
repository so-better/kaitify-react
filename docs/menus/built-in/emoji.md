---
title: emoji 表情
---

# emoji 表情

插入表情

## 使用方法

- 引入组件

```ts
import { EmojiMenu } from '@kaitify/react'
```

- 在 `Wrapper` 包裹器插槽中使用

```tsx
import { useState } from 'react'
import { Wrapper, EmojiMenu } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} before={<EmojiMenu />}></Wrapper>
}
```

## Props 参数

##### disabled <Badge type="danger" text="boolean" />

是否禁用该菜单，默认为 `false`

##### data <Badge type="danger" text="string[]" />

自定义可选择的 `emoji` 表情列表，默认数据如下：

['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '😉', '😍', '😘', '😗', '😚', '🥰', '😋', '😜', '🤪', '🤨', '😭', '😢', '😔', '😞', '😰', '😱', '😨', '😳', '😡', '😠', '🤬', '👍', '👎', '👏', '🙌', '👐', '🤝', '✌', '🤞', '🤘', '❤️', '💕', '💖', '💗', '💘', '💔', '❣', '🖤', '💙', '💚', '🍏', '🍎', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🍕', '🍔', '🍟', '🌭', '🍗', '🍞', '🚗', '🚕', '🚙', '🚌', '🚑', '🚓', '🚚', '🚲', '🚜', '🚂', '✈️', '🚀', '🎉', '🎊', '🎁', '🔥', '🌈', '⭐', '💡', '⏰', '📅', '📌', '🎶', '🎵']

##### popoverProps <Badge type="danger" text="Omit<NonNullable<MenuPropsType['popoverProps']>, 'onShow' | 'onShowing' | 'onShown' | 'onHide' | 'onHiding' | 'onHidden'>" />

浮层属性配置，参考 `Menu` 的 `popoverProps` 属性
