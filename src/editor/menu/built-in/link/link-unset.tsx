import { useMemo } from 'react'
import { useWrapperContext } from '@/hooks/use-wrapper-context'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { LinkUnsetMenuPropsType } from './props'

export default function LinkUnsetMenu(props: LinkUnsetMenuPropsType) {
  const { state } = useWrapperContext()

  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    if (!state.editor.value.commands.getLink?.()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])
  //方法
  const onOperate = () => {
    state.editor.value?.commands.unsetLink?.()
  }

  return (
    <Menu disabled={isDisabled} active={false} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-unlink' />
    </Menu>
  )
}
