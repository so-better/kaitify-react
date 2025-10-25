import { StateType } from '@/editor/wrapper'
import { translate } from '@/locale'
import { createContext, useContext } from 'react'

/**
 * 上下文数据类型
 */
export type EditorContextType = {
  /**
   * 编辑器状态数据
   */
  state: StateType
  /**
   * 编辑器是否禁用
   */
  disabled: boolean
  /**
   * 编辑器内鼠标是否按下
   */
  isMouseDown: boolean
  /**
   * 编辑器元素
   */
  el: HTMLDivElement | null
  /**
   * 翻译函数
   */
  t: (key: string) => string
}

export const EditorContext = createContext<EditorContextType>({
  state: {
    editor: {},
    selection: {}
  },
  disabled: false,
  isMouseDown: false,
  el: null,
  t: (key: string) => translate('zh-CN', key)
})

export const useEditor = () => useContext(EditorContext)
