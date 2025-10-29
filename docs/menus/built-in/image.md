---
title: image 图片
---

# image 图片

插入图片 / 更新图片

## 使用方法

```tsx
import { useState } from 'react'
import { Wrapper, ImageMenu } from '@kaitify/react'

export default function App() {
  const [content, setContent] = useState('<p>hello</p>')
  return <Wrapper value={content} onChange={v => setContent(v)} before={<ImageMenu />}></Wrapper>
}
```

## Props 参数

##### disabled <Badge type="danger" text="boolean" />

是否禁用该菜单，默认为 `false`

##### tabs <Badge type="danger" text="{ data: ('remote' | 'upload')[]; default: 'remote' | 'upload'}" />

配置浮层内的选项卡，目前支持 `upload`（本地上传）和 `remote`（远程图片），`data` 表示选项卡的数据，`default` 表示默认展示的选项卡

##### popoverProps <Badge type="danger" text="Omit<NonNullable<MenuPropsType['popoverProps']>, 'onShow' | 'onShowing' | 'onShown' | 'onHide' | 'onHiding' | 'onHidden'>" />

浮层属性配置，参考 `Menu` 的 `popoverProps` 属性

##### width <Badge type="danger" text="string | number" />

初始图片宽度

##### customUpload <Badge type="danger" text="(file: File) => string | Promise<string>" />

自定义本地图片上传的方法，该方法返回一个字符串值，表示上传后的图片文件地址，回调参数为 `File` 文件，如果不设置该方法，图片默认以 `base64` 字符串的形式插入编辑器中
