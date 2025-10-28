---
title: attacment 附件
---

# attacment 附件

插入附件 / 更新附件

## 使用方法

- 引入组件

```ts
import { AttachmentMenu } from '@kaitify/react'
```

- 在 `Wrapper` 包裹器插槽中使用

```tsx
import { useState } from 'react'
import { Wrapper, AttachmentMenu } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} before={<AttachmentMenu />}></Wrapper>
}
```

## Props 参数

##### disabled <Badge type="danger" text="boolean" />

是否禁用该菜单，默认为 `false`

##### tabs <Badge type="danger" text="{ data: ('remote' | 'upload')[]; default: 'remote' | 'upload'}" />

配置浮层内的选项卡，目前支持 `upload`（本地上传）和 `remote`（远程附件），`data` 表示选项卡的数据，`default` 表示默认展示的选项卡

##### popoverProps <Badge type="danger" text="Omit<NonNullable<MenuPropsType['popoverProps']>, 'onShow' | 'onShowing' | 'onShown' | 'onHide' | 'onHiding' | 'onHidden'>" />

浮层属性配置，参考 `Menu` 的 `popoverProps` 属性

##### iconUrl <Badge type="danger" text="string" />

全局设置的附件的 logo 图标地址

##### customUpload <Badge type="danger" text="(file: File) => string | Promise<string>" />

自定义本地附件上传的方法，该方法返回一个字符串值，表示上传后的附件文件地址，回调参数为 `File` 文件，如果不设置该方法，附件默认以 `base64` 字符串的形式插入编辑器中
