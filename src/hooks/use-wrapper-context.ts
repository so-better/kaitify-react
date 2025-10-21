import { StateType } from '@/editor/wrapper'
import { translate } from '@/locale'
import { createContext, useContext } from 'react'

export const WrapperContext = createContext<{
  state: StateType
}>({
  state: {
    el: null,
    locale: 'zh-CN',
    t: (key: string) => translate('zh-CN', key),
    disabled: false,
    isMouseDown: false
  }
})

export const useWrapperContext = () => useContext(WrapperContext)
