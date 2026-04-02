import { LocaleType } from '@/locale'
import { Editor, Selection, EditorConfigureOptionType } from '@kaitify/core'
import { CSSProperties, MutableRefObject, ReactNode } from 'react'

/**
 * 编辑器参数类型
 */
export type WrapperPropsType = {
  /**
   * 编辑器的值
   */
  value?: string
  /**
   * 样式
   */
  style?: CSSProperties
  /**
   * 样式类
   */
  className?: string
  /**
   * 语言环境
   */
  locale?: LocaleType
  /**
   * 子元素，用于渲染气泡栏组件
   */
  children?: ReactNode | ((state: StateType) => ReactNode)
  /**
   * before插槽挂载的元素，如果不设置，则就放置在编辑器前面
   */
  appendBeforeTo?: string | HTMLElement
  /**
   * after插槽挂载的元素，如果不设置，则就放置在编辑器后面
   */
  appendAfterTo?: string | HTMLElement
  /**
   * before插槽
   */
  before?: ReactNode | ((state: StateType) => ReactNode)
  /**
   * after插槽
   */
  after?: ReactNode | ((state: StateType) => ReactNode)
  /**
   * 编辑器值改变事件
   */
  onChange?: (value: string) => void
  /**
   * 编辑器配置参数
   */
  options?: Omit<EditorConfigureOptionType, 'el' | 'value' | 'onChange' | 'onUpdateView'>
}

/**
 * 编辑器状态对象
 */
export type StateType = {
  editor: {
    value?: Editor
  }
  selection: {
    value?: Selection
  }
}

/**
 * 编辑器实例对象
 */
export type WrapperRefType = {
  wrapperRef: MutableRefObject<HTMLDivElement | null>
  state: StateType
}
