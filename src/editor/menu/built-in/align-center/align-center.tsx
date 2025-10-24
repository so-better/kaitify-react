import { useMemo } from 'react'
import { useWrapperContext } from '@/hooks/use-wrapper-context'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { AlignCenterMenuPropsType } from './props'

export default function AlignCenterMenu(props: AlignCenterMenuPropsType) {
  const { state } = useWrapperContext()

  //是否激活
  const isActive = useMemo(() => {
    return state.editor.value?.commands.isAlign?.('center') ?? false
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
      state.editor.value?.commands.unsetAlign?.('center')
    } else {
      state.editor.value?.commands.setAlign?.('center')
    }
  }

  return (
    <Menu disabled={isDisabled} active={isActive} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-align-center' />
    </Menu>
  )
}
