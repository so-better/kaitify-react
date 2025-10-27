import { useMemo } from 'react'
import { useEditor } from '@/hooks'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { DecreaseIndentMenuPropsType } from './props'

export default function DecreaseIndentMenu(props: DecreaseIndentMenuPropsType) {
  const { state } = useEditor()

  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    if (!state.editor.value.commands.canUseIndent?.()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])

  //方法
  const onOperate = () => {
    state.editor.value?.commands.setDecreaseIndent?.()
  }

  return (
    <Menu disabled={isDisabled} active={false} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-indent-decrease' />
    </Menu>
  )
}
