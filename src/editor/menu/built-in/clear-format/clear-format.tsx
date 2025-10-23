import { useWrapperContext } from '@/hooks/use-wrapper-context'
import { ClearFormatMenuPropsType } from './props'
import { useMemo } from 'react'
import Menu from '../../menu'
import { Icon } from '@/core/icon'

export default function ClearFormatMenu(props: ClearFormatMenuPropsType) {
  const { state } = useWrapperContext()

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
