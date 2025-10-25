import { useCallback, useMemo, useRef } from 'react'
import { useEditor } from '@/hooks/use-editor'
import { MenuDataType, MenuRefType } from '../../props'
import Menu from '../../menu'
import { FontSizeMenuPropsType } from './props'

export default function FontSizeMenu({
  data = [
    {
      label: '12px',
      value: '12px'
    },
    {
      label: '14px',
      value: '14px'
    },
    {
      label: '16px',
      value: '16px'
    },
    {
      label: '18px',
      value: '18px'
    },
    {
      label: '20px',
      value: '20px'
    },
    {
      label: '24px',
      value: '24px'
    },
    {
      label: '28px',
      value: '28px'
    },
    {
      label: '32px',
      value: '32px'
    },
    {
      label: '36px',
      value: '36px'
    },
    {
      label: '40px',
      value: '40px'
    }
  ],
  ...props
}: FontSizeMenuPropsType) {
  const { state, t } = useEditor()

  //菜单组件实例
  const menuRef = useRef<MenuRefType | null>(null)
  //选项
  const options = useMemo<MenuDataType[]>(() => {
    return [
      {
        label: t('默认字号'),
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
    if (!state.editor.value.selection.collapsed() && !state.editor.value.getFocusNodesBySelection('text').length) {
      return true
    }
    if (state.editor.value.selection.collapsed() && (!!state.editor.value.commands.getAttachment?.() || !!state.editor.value.commands.getMath?.())) {
      return true
    }
    if (!!state.editor.value.commands.getCodeBlock?.()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])
  //选项是否激活
  const isActive = useCallback(
    (item: MenuDataType) => {
      return state.editor.value?.commands.isFontSize?.(item.value as string) ?? false
    },
    [state.editor]
  )
  //选择的值
  const selectedData = useMemo<MenuDataType>(() => {
    return options.find(item => isActive(item)) ?? options[0]
  }, [options, isActive])

  //选择选项
  const onSelect = (item: MenuDataType) => {
    if (item.value == '') {
      state.editor.value?.commands.removeTextStyle?.(['fontSize'])
    } else if (isActive(item)) {
      state.editor.value?.updateRealSelection()
    } else {
      state.editor.value?.commands.setFontSize?.(item.value as string)
    }
  }

  return (
    <Menu ref={menuRef} disabled={isDisabled} active={false} popover data={options} itemActive={isActive} shortcut={props.shortcut} popoverProps={{ width: props.popoverProps?.width, maxHeight: props.popoverProps?.maxHeight ?? 240, minWidth: props.popoverProps?.minWidth ?? 80, animation: props.popoverProps?.animation, arrow: props.popoverProps?.arrow, placement: props.popoverProps?.placement, trigger: props.popoverProps?.trigger, zIndex: props.popoverProps?.zIndex }} onSelect={onSelect}>
      {selectedData.label ?? ''}
    </Menu>
  )
}
