import { useMemo } from 'react'
import { useEditor } from '@/hooks'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { UndoMenuPropsType } from './props'

export default function UndoMenu(props: UndoMenuPropsType) {
  const { state } = useEditor()

  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    if (!state.editor.value.commands.canUndo?.()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])

  //方法
  const onOperate = () => {
    state.editor.value?.commands.undo?.()
  }

  return (
    <Menu disabled={isDisabled} active={false} onOperate={onOperate}>
      <Icon name='kaitify-icon-undo' />
    </Menu>
  )
}
