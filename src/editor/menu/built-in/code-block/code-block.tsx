import { useMemo } from 'react'
import { useEditor } from '@/hooks/use-editor'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { CodeBlockMenuPropsType } from './props'

export default function CodeBlockMenu(props: CodeBlockMenuPropsType) {
  const { state } = useEditor()

  //是否激活
  const isActive = useMemo(() => {
    return state.editor.value?.commands.allCodeBlock?.() ?? false
  }, [state.editor])
  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])

  //方法
  const onOperate = () => {
    if (isActive) {
      state.editor.value?.commands.unsetCodeBlock?.()
    } else {
      state.editor.value?.commands.setCodeBlock?.()
    }
  }

  return (
    <Menu disabled={isDisabled} active={isActive} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-code-block' />
    </Menu>
  )
}
