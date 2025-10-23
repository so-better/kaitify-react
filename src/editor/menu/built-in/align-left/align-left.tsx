import { useWrapperContext } from '@/hooks/use-wrapper-context'
import { AlignLeftMenuPropsType } from './props'
import { useMemo } from 'react'
import Menu from '../../menu'
import { Icon } from '@/core/icon'

export default function AlignCenterMenu(props: AlignLeftMenuPropsType) {
  const { state } = useWrapperContext()

  //是否激活
  const isActive = useMemo(() => {
    return state.editor.value?.commands.isAlign?.('left') ?? false
  }, [state.editor])

  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    return props.disabled
  }, [state.editor])

  //方法
  const onOperate = () => {
    if (isActive) {
      state.editor.value?.commands.unsetAlign?.('left')
    } else {
      state.editor.value?.commands.setAlign?.('left')
    }
  }

  return (
    <Menu disabled={isDisabled} active={isActive} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-align-left' />
    </Menu>
  )
}
