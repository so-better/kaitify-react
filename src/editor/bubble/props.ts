import { KNodeMatchOptionType } from '@/index'
import { Instance } from '@popperjs/core'
import { CSSProperties, ReactNode } from 'react'

/**
 * 气泡栏组件的属性类型
 */
export type BubblePropsType = {
  /**
   * 是否显示
   */
  visible: boolean
  /**
   * 指定条件，每次更新气泡位置时会光标是否在符合条件的节点下，如果符合则根据该节点的真实dom进行定位
   */
  match?: KNodeMatchOptionType
  /**
   * 鼠标按下时是否不显示气泡栏
   */
  hideOnMousedown?: boolean
  /**
   * 默认插槽
   */
  children?: ReactNode
  /**
   * 样式
   */
  style?: CSSProperties
  /**
   * 样式类名
   */
  className?: string
  /**
   * 气泡栏显示前触发的事件
   */
  onShow?: (el: Element) => void
  /**
   * 气泡栏显示时触发的事件
   */
  onShowing?: (el: Element) => void
  /**
   * 气泡栏显示后触发的事件
   */
  onShown?: (el: Element) => void
  /**
   * 气泡栏隐藏前触发的事件
   */
  onHide?: (el: Element) => void
  /**
   * 气泡栏隐藏时触发的事件
   */
  onHiding?: (el: Element) => void
  /**
   * 气泡栏隐藏后触发的事件
   */
  onHidden?: (el: Element) => void
}

/**
 * 气泡栏组件实例类型
 */
export type BubbleRefType = {
  elRef: React.MutableRefObject<HTMLDivElement | null>
  popperInstance: React.MutableRefObject<Instance | null>
}
