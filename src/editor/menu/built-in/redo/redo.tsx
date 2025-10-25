import { useMemo } from 'react'
import { useWrapperContext } from '@/hooks/use-wrapper-context'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { RedoMenuPropsType } from './props'

export default function RedoMenu(props: RedoMenuPropsType) {
  const { state } = useWrapperContext()

  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    if (!state.editor.value.commands.canRedo?.()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])

  //方法
  const onOperate = () => {
    state.editor.value?.commands.redo?.()
  }
  return (
    <Menu disabled={isDisabled} active={false} onOperate={onOperate}>
      <Icon name='kaitify-icon-redo' />
    </Menu>
  )
}
