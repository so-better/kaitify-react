import { useCallback, useMemo, useRef } from 'react'
import { useEditor } from '@/hooks'
import { MenuDataType, MenuRefType } from '../../props'
import Menu from '../../menu'
import { LineHeightMenuPropsType } from './props'

export default function LineHeightMenu({
  data = [
    {
      label: '1',
      value: 1
    },
    {
      label: '1.15',
      value: 1.15
    },
    {
      label: '2',
      value: 2
    },
    {
      label: '2.5',
      value: 2.5
    },
    {
      label: '3',
      value: 3
    }
  ],
  ...props
}: LineHeightMenuPropsType) {
  const { state, t } = useEditor()

  //菜单组件实例
  const menuRef = useRef<MenuRefType | null>(null)

  //选项
  const options = useMemo<MenuDataType[]>(() => {
    return [
      {
        label: t('默认行高'),
        value: ''
      },
      ...data
    ]
  }, [data])

  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])
  //选项是否激活
  const isActive = useCallback(
    (item: MenuDataType) => {
      return state.editor.value?.commands.isLineHeight?.(item.value) ?? false
    },
    [state.editor]
  )
  //选择的值
  const selectedData = useMemo<MenuDataType>(() => {
    return options.find(item => isActive(item)) || options[0]
  }, [options, isActive])

  //选择选项
  const onSelect = (item: MenuDataType) => {
    if (isActive(item)) {
      state.editor.value?.updateRealSelection()
    } else {
      state.editor.value?.commands.setLineHeight?.(item.value)
    }
  }

  return (
    <Menu ref={menuRef} disabled={isDisabled} active={false} popover data={options} itemActive={isActive} shortcut={props.shortcut} popoverProps={{ width: props.popoverProps?.width, maxHeight: props.popoverProps?.maxHeight ?? 240, minWidth: props.popoverProps?.minWidth ?? 80, animation: props.popoverProps?.animation, arrow: props.popoverProps?.arrow, placement: props.popoverProps?.placement, trigger: props.popoverProps?.trigger, zIndex: props.popoverProps?.zIndex }} onSelect={onSelect}>
      {selectedData.label ?? ''}
    </Menu>
  )
}
