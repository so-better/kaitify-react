# @kaitify/react

[![npm](https://img.shields.io/npm/v/@kaitify/react)](https://www.npmjs.com/package/@kaitify/react)
[![license](https://img.shields.io/npm/l/@kaitify/react)](https://github.com/so-better/kaitify-react/blob/main/LICENSE)

基于 `@kaitify/core` 开发的 React 富文本编辑器核心库，使用 `React` 作视图渲染，提供开箱即用的编辑器组件与内置菜单。

## 简介

`kaitify-react` 是一套基于 `kaitify` 富文本编辑器核心库进行开发和设计的富文本编辑器，使用 `React` 框架作视图渲染，并提供相关的组件供开发者使用。

- 最低支持 React 18
- 采用 `ReactNode` 进行视图渲染，与 React 生态深度结合
- 提供 `Wrapper`、`Bubble`、`Menu` 等核心组件，以及丰富的内置菜单

## 特性

- 基于 `@kaitify/core`，继承完整的富文本编辑能力
- React 原生视图渲染，响应式状态管理
- 内置 `Bubble` 气泡栏组件，跟随光标浮动
- 内置 `Menu` 菜单组件，提供统一的 UI 样式
- 提供 `useEditor` Hook，在子组件中便捷访问编辑器状态
- 支持中文、英文、韩语、日语多语言环境
- 提供丰富的内置菜单组件，可直接使用

## 安装

```bash
# npm
npm install @kaitify/react

# 安装指定版本
npm install @kaitify/react@0.0.1-beta.16
```

```bash
# yarn
yarn add @kaitify/react

# 安装指定版本
yarn add @kaitify/react@0.0.1-beta.16
```

```bash
# pnpm
pnpm install @kaitify/react

# 安装指定版本
pnpm install @kaitify/react@0.0.1-beta.16
```

### CDN

```html
<!-- 引入固定版本 -->
<script src="https://unpkg.com/@kaitify/react@0.0.1-beta.16/lib/kaitify-react.umd.js"></script>
<!-- 始终引入最新版本 -->
<script src="https://unpkg.com/@kaitify/react/lib/kaitify-react.umd.js"></script>
```

## 快速上手

```tsx
import { useState } from 'react'
import { Wrapper } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} options={{ placeholder: '输入正文内容...' }}></Wrapper>
}
```

## 核心组件

### Wrapper

编辑器核心组件，自动创建编辑器实例，通过 `value` / `onChange` 实现受控模式。

```tsx
import { useState } from 'react'
import { Wrapper } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} options={{ placeholder: '输入正文内容...' }}></Wrapper>
}
```

主要 Props：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `string` | 编辑器内容 |
| `onChange` | `(value: string) => void` | 内容变化事件 |
| `locale` | `LocaleType` | 语言环境，默认 `zh-CN` |
| `before` | `ReactNode \| ((state: StateType) => ReactNode)` | 编辑器前面的内容 |
| `after` | `ReactNode \| ((state: StateType) => ReactNode)` | 编辑器后面的内容 |
| `children` | `ReactNode \| ((state: StateType) => ReactNode)` | 用于渲染气泡栏 |
| `options` | `Omit<EditorConfigureOptionType, 'el' \| 'value' \| 'onChange' \| 'onUpdateView'>` | 编辑器配置 |

### Bubble

气泡栏组件，跟随编辑器光标浮动显示，必须放置在 `Wrapper` 的 `children` 中。

```tsx
import { useState } from 'react'
import { Wrapper, Bubble } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return (
    <Wrapper value={content} onChange={v => setContent(v)} options={{ placeholder: '输入正文内容...' }}>
      <Bubble visible={true}>我是气泡栏</Bubble>
    </Wrapper>
  )
}
```

### Menu

菜单按钮组件，提供统一的 UI 样式，必须在 `Wrapper` 的插槽中使用。

```tsx
import { useState } from 'react'
import { Wrapper, Menu } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} options={{ placeholder: '输入正文内容...' }} before={<Menu>菜单按钮</Menu>}></Wrapper>
}
```

### Divider

分隔线组件。

```tsx
import { Divider } from '@kaitify/react'

;<Divider />
```

### Checkbox

复选框组件。

```tsx
import { Checkbox } from '@kaitify/react'

;<Checkbox />
```

### Tabs

选项卡组件。

```tsx
import { Tabs } from '@kaitify/react'

;<Tabs />
```

### Icon

图标组件。

```tsx
import { Icon } from '@kaitify/react'

;<Icon value="icon-name" />
```

## useEditor Hook

在 `Wrapper` 的子组件中，可通过 `useEditor` Hook 获取编辑器上下文数据。

```tsx
import { useEditor } from '@kaitify/react'

function Toolbar() {
  const { state, wrapperRef, isMouseDown } = useEditor()
  const editor = state.editor.value

  return <button onClick={() => editor?.commands.bold()}>加粗</button>
}
```

返回值说明：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `state` | `StateType` | 编辑器状态（含 `editor.value` 和 `selection.value`） |
| `wrapperRef` | `MutableRefObject<HTMLDivElement \| null>` | 编辑器 DOM 元素 |
| `isMouseDown` | `boolean` | 编辑器内鼠标是否按下 |
| `t` | `(key: string) => string` | 国际化翻译函数 |

## 内置菜单

可直接从 `@kaitify/react` 引入以下内置菜单组件使用：

`AlignCenterMenu` `AlignJustifyMenu` `AlignLeftMenu` `AlignRightMenu` `AttachmentMenu` `BackColorMenu` `BlockquoteMenu` `BoldMenu` `ClearFormatMenu` `CodeMenu` `CodeBlockMenu` `CodeBlockLanguagesMenu` `ColorMenu` `DecreaseIndentMenu` `EmojiMenu` `FontFamilyMenu` `FontSizeMenu` `FullScreenMenu` `HeadingMenu` `HorizontalMenu` `ImageMenu` `IncreaseIndentMenu` `ItalicMenu` `LineHeightMenu` `LinkMenu` `LinkUnsetMenu` `MathMenu` `OrderedListMenu` `RedoMenu` `StrikethroughMenu` `SubscriptMenu` `SuperscriptMenu` `TableMenu` `TableUnsetMenu` `TableDeleteRowMenu` `TableDeleteColumnMenu` `TableAddRowMenu` `TableAddColumnMenu` `TableMergeCellMenu` `TaskMenu` `UnderlineMenu` `UndoMenu` `UnorderedListMenu` `VideoMenu` `VideoControlsMenu` `VideoMutedMenu` `VideoLoopMenu` `WrapDownMenu` `WrapUpMenu`

## 国际化

通过 `Wrapper` 组件的 `locale` 属性设置语言环境，支持以下取值：

| 值 | 语言 |
| --- | --- |
| `zh-CN` | 中文简体（默认） |
| `en-US` | 英文 |
| `ko-KR` | 韩语 |
| `ja-JP` | 日语 |

```tsx
import { useState } from 'react'
import { Wrapper } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper locale='en-US' value={content} onChange={v => setContent(v)} options={{ placeholder: '输入正文内容...' }}></Wrapper>
}
```

## 文档

完整文档请访问：[@kaitify/react 官方文档](https://www.so-better.cn/docs/kaitify-react/)

## License

[MIT](./LICENSE)
