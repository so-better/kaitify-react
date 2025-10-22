import { PopoverPropsType } from '@/core/popover'
import { ReactNode } from 'react'

/**
 * 菜单可选数据的类型
 */
export type MenuDataType = {
  /**
   * 显示的文字
   */
  label: string
  /**
   * 表示的值
   */
  value: string | number
  /**
   * 左侧显示的图标
   */
  icon?: string
}

/**
 * 菜单组件的属性类型
 */
export type MenuPropsType = {
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否激活
   */
  active?: boolean
  /**
   * 选项禁用
   */
  itemDisabled?: (item: MenuDataType) => boolean
  /**
   * 选项是否激活
   */
  itemActive?: (item: MenuDataType) => boolean
  /**
   * 是否有浮层
   */
  popover?: boolean
  /**
   * 浮层属性
   */
  popoverProps?: Omit<PopoverPropsType, 'disabled' | 'delay' | 'refer' | 'children'>
  /**
   * 可选数据
   */
  data?: MenuDataType[]
  /**
   * 快捷键设置
   */
  shortcut?: ((e: KeyboardEvent) => boolean) | { [key: MenuDataType['value']]: (e: KeyboardEvent) => boolean }
  /**
   * 非浮层类型的菜单按钮点击触发的事件
   */
  onOperate?: () => void
  /**
   * 浮层类型的菜单按钮点击选项触发的事件
   */
  onSelect?: (value: MenuDataType) => void
  /**
   * 默认插槽
   */
  children: ReactNode
  /**
   * 自定义浮层内容
   */
  customPopover?: ReactNode
  /**
   * 自定义选项图标
   */
  customIcon?: ReactNode | ((option: MenuDataType) => ReactNode)
  /**
   * 自定义选项内容
   */
  customLabel?: ReactNode | ((option: MenuDataType) => ReactNode)
}

/**
 * 菜单组件实例类型
 */
export type MenuRefType = {
  showPopover: () => void
  hidePopover: () => void
}
