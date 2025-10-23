import { useWrapperContext } from '@/hooks/use-wrapper-context'
import { BlockquoteMenuPropsType } from './props'
import { useMemo } from 'react'
import Menu from '../../menu'
import { Icon } from '@/core/icon'

export default function BlockquoteMenu(props: BlockquoteMenuPropsType) {
  const { state } = useWrapperContext()

  //是否激活
  const isActive = useMemo(() => {
    return state.editor.value?.commands.allBlockquote?.() ?? false
  }, [state.editor])
  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    return props.disabled
  }, [state.editor, props.disabled])

  //方法
  const onOperate = () => {
    if (isActive) {
      state.editor.value?.commands.unsetBlockquote?.()
    } else {
      state.editor.value?.commands.setBlockquote?.()
    }
  }

  return (
    <Menu disabled={isDisabled} active={isActive} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-quote' />
    </Menu>
  )
}
