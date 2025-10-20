import { Editor, Selection } from '@kaitify/core'
import { createContext, useContext } from 'react'

/**
 * 上下文数据类型
 */
export type WrapperContextType = {
  /**
   * 编辑器实例对象
   */
  editor: Editor | null
  /**
   * 光标对象（响应的）
   */
  selection: Selection
  /**
   * 编辑器是否禁用
   */
  disabled: boolean
  /**
   * 编辑器内鼠标是否按下
   */
  isMouseDown: boolean
}

export const WrapperContext = createContext<WrapperContextType>({
  editor: null,
  selection: new Selection(),
  disabled: false,
  isMouseDown: false
})

export const useWrapperContext = () => useContext(WrapperContext)
