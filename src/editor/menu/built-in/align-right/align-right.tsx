import { useWrapperContext } from '@/hooks/use-wrapper-context'
import { AlignRightMenuPropsType } from './props'
import { useMemo } from 'react'
import Menu from '../../menu'
import { Icon } from '@/core/icon'

export default function AlignCenterMenu(props: AlignRightMenuPropsType) {
  const { state } = useWrapperContext()

  //是否激活
  const isActive = useMemo(() => {
    return state.editor.value?.commands.isAlign?.('right') ?? false
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
      state.editor.value?.commands.unsetAlign?.('right')
    } else {
      state.editor.value?.commands.setAlign?.('right')
    }
  }

  return (
    <Menu disabled={isDisabled} active={isActive} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-align-right' />
    </Menu>
  )
}
