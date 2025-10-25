import { useMemo } from 'react'
import { useEditor } from '@/hooks/use-editor'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { AlignJustifyMenuPropsType } from './props'

export default function AlignJustifyMenu(props: AlignJustifyMenuPropsType) {
  const { state } = useEditor()

  //是否激活
  const isActive = useMemo(() => {
    return state.editor.value?.commands.isAlign?.('justify') ?? false
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
      state.editor.value?.commands.unsetAlign?.('justify')
    } else {
      state.editor.value?.commands.setAlign?.('justify')
    }
  }

  return (
    <Menu disabled={isDisabled} active={isActive} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-align-justify' />
    </Menu>
  )
}
