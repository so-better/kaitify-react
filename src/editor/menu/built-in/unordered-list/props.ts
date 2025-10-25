import { MenuPropsType } from '@/editor/menu/props'

export type UnorderedListMenuPropsType = {
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 浮层属性
   */
  popoverProps?: Omit<NonNullable<MenuPropsType['popoverProps']>, 'onShow' | 'onShowing' | 'onShown' | 'onHide' | 'onHiding' | 'onHidden'>
}
