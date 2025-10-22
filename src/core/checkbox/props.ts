/**
 * 复选框组件属性类型
 */
export type CheckboxPropsType = {
  /**
   * 是否选中
   */
  checked?: boolean
  /**
   * 复选框选择事件
   */
  onChange?: (checked: boolean) => void
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * label文字
   */
  label?: string
}
