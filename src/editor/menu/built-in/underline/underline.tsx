import { useMemo } from 'react'
import { useEditor } from '@/hooks/use-editor'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { UnderlineMenuPropsType } from './props'

export default function UnderlineMenu(props: UnderlineMenuPropsType) {
  const { state } = useEditor()

  //是否激活
  const isActive = useMemo(() => {
    return state.editor.value?.commands.isUnderline?.() ?? false
  }, [state.editor])

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

  //方法
  const onOperate = () => {
    if (isActive) {
      state.editor.value?.commands.unsetUnderline?.()
    } else {
      state.editor.value?.commands.setUnderline?.()
    }
  }

  return (
    <Menu disabled={isDisabled} active={isActive} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-underline' />
    </Menu>
  )
}
