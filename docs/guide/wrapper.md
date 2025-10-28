---
title: Wrapper 包裹器
---

# Wrapper 包裹器

`Wrapper` 组件是 `kaitify-react` 的核心组件，顾名思义，它作为一个包裹器，在组件加载时，自动帮助我们创建一个编辑器实例，无需我们手动调用底层的方法去构建编辑器

## 基本使用

使用 `value` / `onChange` 来使得编辑器受控，通过 `placeholder` 属性设置占位符内容

```tsx
import { useState } from 'react'
import { Wrapper } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} placeholder='输入正文内容...'></Wrapper>
}
```

使用 `disabled` 来禁用编辑器，此时编辑器不可编辑

```tsx
import { useState } from 'react'
import { Wrapper } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper disabled value={content} onChange={v => setContent(v)} placeholder='输入正文内容...'></Wrapper>
}
```

使用 `autofocus` 来设置编辑器在初始化后自动聚焦

```tsx
import { useState } from 'react'
import { Wrapper } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper autofocus value={content} onChange={v => setContent(v)} placeholder='输入正文内容...'></Wrapper>
}
```

使用 `dark` 来设置编辑器为深色风格

```tsx
import { useState } from 'react'
import { Wrapper } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper dark value={content} onChange={v => setContent(v)} placeholder='输入正文内容...'></Wrapper>
}
```

编辑器的宽度和高度可以直接通过 `css` 样式来设置

```tsx
import { useState } from 'react'
import { Wrapper } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper style={{ width: 500, height: 500 }} value={content} onChange={v => setContent(v)} placeholder='输入正文内容...'></Wrapper>
}
```

## Props 参数

`Wrapper` 包裹器提供除了以上提到的属性以外， 具体完整的属性如下：

##### value <Badge type="danger" text="string" />

编辑器的字符串内容

##### style <Badge type="danger" text="CSSProperties" />

编辑器的样式

##### className <Badge type="danger" text="string" />

编辑器的样式类

##### disabled <Badge type="danger" text="boolean" />

是否禁用编辑器，禁用后编辑器不可编辑，默认为 `false`

##### locale <Badge type="danger" text="LocaleType" />

编辑器语言环境，取值范围是 `zh-CN` `en-US` `ko-KR` `ja-JP`，分别表示中文简体和英文语言、韩语、日语环境，默认为 `zh-CN`

##### children <Badge type="danger" text="ReactNode | ((state: StateType) => ReactNode)" />

编辑器的子元素，用于渲染气泡栏组件

##### appendBeforeTo <Badge type="danger" text="string | HTMLElement" />

`before` 插槽挂载的元素，如果不设置，则就放置在编辑器前面

##### appendAfterTo <Badge type="danger" text="string | HTMLElement" />

`after` 插槽挂载的元素，如果不设置，则就放置在编辑器后面

##### before <Badge type="danger" text=" ReactNode | ((state: StateType) => ReactNode)" />

展示在编辑器前面的内容

##### after <Badge type="danger" text=" ReactNode | ((state: StateType) => ReactNode)" />

展示在编辑器后面的内容

##### autofocus <Badge type="danger" text="boolean" />

编辑器渲染后是否自动聚焦，默认为 `false`

##### placeholder <Badge type="danger" text="string" />

编辑器内容仅有一个默认的段落时，用来占位的内容

##### dark <Badge type="danger" text="boolean" />

编辑器是否呈现深色风格，默认为 `false`，此属性对编辑器相关的所有组件都有影响

##### allowCopy <Badge type="danger" text="boolean" />

是否允许复制操作，默认为 `true`

##### allowPaste <Badge type="danger" text="boolean" />

是否允许粘贴操作，默认为 `true`

##### allowCut <Badge type="danger" text="boolean" />

是否允许剪切操作，默认为 `true`

##### allowPasteHtml <Badge type="danger" text="boolean" />

是否允许粘贴 `html`，即粘贴内容时是否携带样式，默认为 `false`

##### priorityPasteFiles <Badge type="danger" text="boolean" />

剪切板同时存在文件和 `html/text` 时，是否优先粘贴文件，默认为 `false`

##### textRenderTag <Badge type="danger" text="string" />

自定义编辑器内渲染文本节点的真实标签，默认为 `span`

##### blockRenderTag <Badge type="danger" text="string" />

自定义编辑内渲染默认块级节点的真实标签，即段落标签，默认为 `p`

##### emptyRenderTags <Badge type="danger" text="string[]" />

自定义编辑器内定义需要置空的标签

##### extraKeepTags <Badge type="danger" text="string[]" />

自定义编辑器内额外保留的标签

##### extensions <Badge type="danger" text="Extension[]" />

自定义插件数组

##### formatRules <Badge type="danger" text="RuleFunctionType[]" />

自定义节点数组格式化规则

##### onChange <Badge type="danger" text="(value: string) => void" />

编辑器值发生变更时触发的事件，回调参数为编辑器的字符串值，与 `value` 一起组成受控模式

##### onCreated <Badge type="danger" text="(editor: Editor) => void" />

编辑器创建完成后触发的事件，回调参数是编辑器实例对象

##### onDomParseNode <Badge type="danger" text="(this: Editor, node: KNode) => KNode" />

自定义 `dom` 转为非文本节点的后续处理

##### onPasteKeepMarks <Badge type="danger" text="(this: Editor, node: KNode) => KNodeMarksType" />

节点粘贴保留标记的自定义方法

##### onPasteKeepStyles <Badge type="danger" text="(this: Editor, node: KNode) => KNodeStylesType" />

节点粘贴保留样式的自定义方法

##### onPasteText <Badge type="danger" text="(this: Editor, text: string) => boolean | Promise<boolean>" />

编辑器粘贴纯文本时触发，如果返回 `true` 则表示继续使用默认逻辑，返回 `false` 则不走默认逻辑，需要进行自定义处理

##### onPasteHtml <Badge type="danger" text="(this: Editor, nodes: KNode[], html: string) => boolean | Promise<boolean>" />

编辑器粘贴 `html` 内容时触发，如果返回 `true` 则表示继续使用默认逻辑，返回 `false` 则不走默认逻辑，需要进行自定义处理

##### onPasteImage <Badge type="danger" text="(this: Editor, file: File) => boolean | Promise<boolean>" />

编辑器粘贴图片时触发，如果返回 `true` 则表示继续使用默认逻辑，返回 `false` 则不走默认逻辑，需要进行自定义处理

##### onPasteVideo <Badge type="danger" text="(this: Editor, file: File) => boolean | Promise<boolean>" />

编辑器粘贴视频时触发，如果返回 `true` 则表示继续使用默认逻辑，返回 `false` 则不走默认逻辑，需要进行自定义处理

##### onPasteFile <Badge type="danger" text="(this: Editor, file: File) => void | Promise<void>" />

编辑器粘贴除了图片和视频以外的文件时触发，需要自定义处理

##### onDetachMentBlockFromParent <Badge type="danger" text="(this: Editor, node: KNode) => boolean" />

在删除和换行操作中块节点节点从其父节点中抽离出去成为与父节点同级的节点后触发，如果返回 `true` 则表示继续使用默认逻辑，会将该节点转为段落，返回 `false` 则不走默认逻辑，需要自定义处理

##### onBeforePatchNodeToFormat <Badge type="danger" text="(this: Editor, node: KNode) => KNode" />

编辑器 `updateView` 执行时，通过比对新旧节点数组获取需要格式化的节点，在这些节点被格式化前，触发此方法，回调参数即当前需要被格式化的节点，该方法返回一个节点，返回的节点将会被格式化，如果你不需要任何特殊处理，返回入参提供的节点即可

##### onSelectionUpdate <Badge type="danger" text="(this: Editor, selection: Selection) => void" />

编辑器光标发生变化触发的事件，回调参数为编辑器的 `Selection` 对象实例

##### onInsertParagraph <Badge type="danger" text="(this: Editor, node: KNode) => void" />

编辑器进行换行时触发的事件，回调参数为换行后光标所在的块节点

##### onDeleteComplete <Badge type="danger" text="(this: Editor) => void" />

编辑器执行删除操作完成的时候触发的事件

##### onKeydown <Badge type="danger" text="(this: Editor, event: KeyboardEvent) => void"  />

编辑器内键盘按下触发的事件，回调参数为 `KeyboardEvent`

##### onKeyup <Badge type="danger" text="(this: Editor, event: KeyboardEvent) => void"  />

编辑器内键盘松开触发的事件，回调参数为 `KeyboardEvent`

##### onFocus <Badge type="danger" text="(this: Editor, event: FocusEvent) => void"  />

编辑器获取光标触发的事件，回调参数为 `FocusEvent`

##### onBlur <Badge type="danger" text="(this: Editor, event: FocusEvent) => void"  />

编辑器失去光标触发的事件，回调参数为 `FocusEvent`

##### onBeforeUpdateView <Badge type="danger" text="(this: Editor) => void"  />

编辑器视图更新前触发的事件

##### onAfterUpdateView <Badge type="danger" text="(this: Editor) => void"  />

编辑器视图更新后触发的事件

> 上述的属性部分继承于 kaitify 的 Editor 构建属性（同名属性），如果需要深入了解，可以去查看 kaitify 的文档

## API 组件属性/方法

`Wrapper` 提供了部分属性/方法可以通过组件实例来调用

##### elRef <Badge type="danger" text="React.MutableRefObject<HTMLDivElement | null>" />

获取组件实例即编辑器的 `dom` 元素

```tsx
import { useRef, useState } from 'react'
import { Wrapper, WrapperRefType } from '@kaitify/react'

export default function App() {
  const wrapperRef = useRef<WrapperRefType | null>(null)
  const [content, setContent] = useState('<p>hello</p>')

  useEffect(() => {
    //获取编辑器的dom元素
    console.log(wrapperRef.current?.elRef.current)
  }, [])

  return <Wrapper ref={wrapperRef} value={content} onChange={v => setContent(v)} placeholder='输入正文内容...'></Wrapper>
}
```

##### state <Badge type="danger" text="StateType" />

`Wrapper` 组件内部返回的关于编辑器状态的相关数据，包含 `editor` `selection` 两个属性，分别表示当前编辑器的 `Editor` 实例，当前编辑器的 `Selection` 实例

该数据是响应式的数据，所以我们每次通过该数据的 `editor` 属性调用 `kaitify` 编辑器的方法都是响应式的效果

```tsx
import { useRef, useState } from 'react'
import { Wrapper, WrapperRefType } from '@kaitify/react'

export default function App() {
  const wrapperRef = useRef<WrapperRefType | null>(null)
  const [content, setContent] = useState('<p>hello</p>')

  useEffect(() => {
    //获取编辑器的实例
    console.log(wrapperRef.current?.state.editor.value)
  }, [wrapperRef.current?.state.editor])

  return <Wrapper ref={wrapperRef} value={content} onChange={v => setContent(v)} placeholder='输入正文内容...'></Wrapper>
}
```
