import { useCallback, useMemo, useRef } from 'react'
import { useWrapperContext } from '@/hooks/use-wrapper-context'
import { MenuDataType, MenuRefType } from '../../props'
import Menu from '../../menu'
import { FontFamilyMenuPropsType } from './props'

export default function FontFamilyMenu({
  data = [
    {
      label: '黑体',
      value: '黑体,黑体-简'
    },
    {
      label: '华文仿宋',
      value: '华文仿宋'
    },
    {
      label: '楷体',
      value: '楷体,楷体-简'
    },
    {
      label: '华文楷体',
      value: '华文楷体'
    },
    {
      label: '宋体',
      value: '宋体,宋体-简'
    },
    {
      label: 'Arial',
      value: 'Arial'
    },
    {
      label: 'Consolas',
      value: 'Consolas,monospace'
    }
  ],
  ...props
}: FontFamilyMenuPropsType) {
  const { state, t } = useWrapperContext()

  //菜单组件实例
  const menuRef = useRef<MenuRefType | null>(null)

  //选项
  const options = useMemo<MenuDataType[]>(() => {
    return [
      {
        label: t('默认字体'),
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
    return props.disabled
  }, [state.editor, props.disabled])
  //选项是否激活
  const isActive = useCallback(
    (item: MenuDataType) => {
      return state.editor.value?.commands.isFontFamily?.(item.value as string) ?? false
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
      state.editor.value?.commands.removeTextStyle?.(['fontFamily'])
    } else if (isActive(item)) {
      state.editor.value?.updateRealSelection()
    } else {
      state.editor.value?.commands.setFontFamily?.(item.value as string)
    }
  }

  return (
    <Menu ref={menuRef} disabled={isDisabled} active={false} popover data={options} itemActive={isActive} shortcut={props.shortcut} popoverProps={{ width: props.popoverProps?.width, maxHeight: props.popoverProps?.maxHeight ?? 240, minWidth: props.popoverProps?.minWidth ?? 90, animation: props.popoverProps?.animation, arrow: props.popoverProps?.arrow, placement: props.popoverProps?.placement, trigger: props.popoverProps?.trigger, zIndex: props.popoverProps?.zIndex }} onSelect={onSelect}>
      {selectedData.label ?? ''}
    </Menu>
  )
}
