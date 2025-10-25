import { useMemo } from 'react'
import { useEditor } from '@/hooks/use-editor'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { ClearFormatMenuPropsType } from './props'

export default function ClearFormatMenu(props: ClearFormatMenuPropsType) {
  const { state } = useEditor()

  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    return props.disabled
  }, [state.editor, props.disabled])

  //方法
  const onOperate = () => {
    state.editor.value?.commands.clearFormat?.()
  }

  return (
    <Menu disabled={isDisabled} active={false} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-format-clear' />
    </Menu>
  )
}
