import { useMemo } from 'react'
import { useWrapperContext } from '@/hooks/use-wrapper-context'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { StrikethroughMenuPropsType } from './props'

export default function StrikethroughMenu(props: StrikethroughMenuPropsType) {
  const { state } = useWrapperContext()

  //是否激活
  const isActive = useMemo(() => {
    return state.editor.value?.commands.isStrikethrough?.() ?? false
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
      state.editor.value?.commands.unsetStrikethrough?.()
    } else {
      state.editor.value?.commands.setStrikethrough?.()
    }
  }

  return (
    <Menu disabled={isDisabled} active={isActive} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-strikethrough' />
    </Menu>
  )
}
