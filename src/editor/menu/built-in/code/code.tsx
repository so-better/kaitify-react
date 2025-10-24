import { useWrapperContext } from '@/hooks/use-wrapper-context'
import { CodeMenuPropsType } from './props'
import { useMemo } from 'react'
import Menu from '../../menu'
import { Icon } from '@/core/icon'

export default function CodeMenu(props: CodeMenuPropsType) {
  const { state } = useWrapperContext()

  //是否激活
  const isActive = useMemo(() => {
    return state.editor.value?.commands.allCode?.() ?? false
  }, [state.editor])

  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    if (state.editor.value.commands.hasAttachment?.()) {
      return true
    }
    if (state.editor.value.commands.hasMath?.()) {
      return true
    }
    if (state.editor.value.commands.hasLink?.()) {
      return true
    }
    if (state.editor.value.commands.hasCodeBlock?.()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])

  //方法
  const onOperate = () => {
    if (isActive) {
      state.editor.value?.commands.unsetCode?.()
    } else {
      state.editor.value?.commands.setCode?.()
    }
  }

  return (
    <Menu disabled={isDisabled} active={isActive} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-code' />
    </Menu>
  )
}
