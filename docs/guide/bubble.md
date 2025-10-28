---
title: Bubble 气泡栏
---

# Bubble 气泡栏

`Bubble` 组件是 `kaitify-react` 的内置组件，必须放置在 `Wrapper` 组件的 `children` 中

## Props 参数

##### visible <Badge type="danger" text="boolean" />

是否显示气泡栏，默认为 `false`

##### match <Badge type="danger" text="KNodeMatchOptionType" />

指定气泡栏出现的位置条件，每次更新气泡位置时会判断光标是否在符合条件的节点下，如果符合则根据该节点的真实 `dom` 进行定位，否则只根据光标位置进行定位

关于该属性的释义，同 [kaitify 中的 Editor 的 getMatchNodeBySelection 方法中的入参](https://www.so-better.cn/docs/kaitify-core/apis/editor-function#getmatchnodebyselection)

##### hideOnMousedown <Badge type="danger" text="boolean" />

鼠标在编辑器内按下时是否隐藏气泡栏，默认为 `false`，如果该值为 `true`，在鼠标按下时即使 `visible` 属性是 `true`，也无法显示气泡栏

##### children <Badge type="danger" text="ReactNode" />

气泡栏的子组件

##### style <Badge type="danger" text="CSSProperties" />

气泡栏的样式

##### className <Badge type="danger" text="string" />

气泡栏的样式类

##### onShow <Badge type="danger" text="(el: Element) => void" />

气泡栏显示前触发的事件

##### onShowing <Badge type="danger" text="(el: Element) => void" />

气泡栏显示时触发的事件

##### onShown <Badge type="danger" text="(el: Element) => void" />

气泡栏显示后触发的事件

##### onHide <Badge type="danger" text="(el: Element) => void" />

气泡栏隐藏前触发的事件

##### onHiding <Badge type="danger" text="(el: Element) => void" />

气泡栏隐藏时触发的事件

##### onHidden <Badge type="danger" text="(el: Element) => void" />

气泡栏隐藏后触发的事件

## API 组件属性/方法

`Bubble` 提供了部分属性/方法可以通过组件实例来调用

##### elRef <Badge type="danger" text="React.MutableRefObject<HTMLDivElement | null>" />

获取组件实例即气泡栏的 `dom` 元素

##### popperInstance <Badge type="danger" text="React.MutableRefObject<Instance | null>" />

`popperjs` 创建的浮层实例对象
