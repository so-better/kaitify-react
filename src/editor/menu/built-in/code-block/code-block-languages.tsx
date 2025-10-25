import { useCallback, useMemo, useRef } from 'react'
import { HljsLanguages, HljsLanguageType } from '@kaitify/core'
import { useEditor } from '@/hooks/use-editor'
import { MenuDataType, MenuRefType } from '../../props'
import Menu from '../../menu'
import { CodeBlockLanguagesMenuPropsType } from './props'

export default function CodeBlockLanguagesMenu({ languages = [...HljsLanguages], ...props }: CodeBlockLanguagesMenuPropsType) {
  const { state, t } = useEditor()
  //菜单组件实例
  const menuRef = useRef<MenuRefType | null>(null)
  //选项
  const options = useMemo<MenuDataType[]>(() => {
    return [
      {
        label: t('自动识别'),
        value: ''
      },
      ...languages.map(item => {
        return {
          label: item.charAt(0).toLocaleUpperCase() + item.slice(1),
          value: item
        }
      })
    ]
  }, [languages])

  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    if (!state.editor.value.commands.getCodeBlock?.()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])
  //选项是否激活
  const isActive = useCallback(
    (item: MenuDataType) => {
      if (!state.editor.value?.selection.focused()) {
        return false
      }
      const codeBlockNode = state.editor.value.commands.getCodeBlock?.()
      if (!codeBlockNode) {
        return false
      }
      if (item.value == '') {
        return !codeBlockNode.hasMarks() || !codeBlockNode.marks!['kaitify-hljs']
      }
      return codeBlockNode.marks!['kaitify-hljs'] === item.value
    },
    [state.editor]
  )
  //选择的值
  const selectedData = useMemo<MenuDataType | undefined>(() => {
    if (!state.editor.value?.selection.focused()) {
      return options[0]
    }
    return options.find(item => isActive(item)) ?? options[0]
  }, [state.editor, options])

  //选择选项
  const onSelect = (item: MenuDataType) => {
    state.editor.value?.commands.updateCodeBlockLanguage?.(item.value as HljsLanguageType)
  }

  return (
    <Menu ref={menuRef} disabled={isDisabled} active={false} popover data={options} itemActive={isActive} onSelect={onSelect} shortcut={props.shortcut} popoverProps={{ width: props.popoverProps?.width, maxHeight: props.popoverProps?.maxHeight ?? 240, minWidth: props.popoverProps?.minWidth ?? 80, animation: props.popoverProps?.animation, arrow: props.popoverProps?.arrow, placement: props.popoverProps?.placement, trigger: props.popoverProps?.trigger, zIndex: props.popoverProps?.zIndex }}>
      {selectedData?.label ?? ''}
    </Menu>
  )
}
