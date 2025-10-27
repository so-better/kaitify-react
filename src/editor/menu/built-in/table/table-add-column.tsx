import { useMemo } from 'react'
import { useEditor } from '@/hooks'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { TableAddColumnMenuPropsType } from './props'

export default function TableAddColumnMenu(props: TableAddColumnMenuPropsType) {
  const { state } = useEditor()

  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    if (!state.editor.value.commands.getTable?.()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])

  //方法
  const onOperate = () => {
    state.editor.value?.commands.addTableColumn?.(props.type ?? 'right')
  }

  return (
    <Menu disabled={isDisabled} active={false} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name={`kaitify-icon-insert-column-${props.type ?? 'right'}`} />
    </Menu>
  )
}
