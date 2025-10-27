import { useMemo } from 'react'
import { useEditor } from '@/hooks'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { TableMergeCellMenuPropsType } from './props'

export default function TableMergeCellMenu(props: TableMergeCellMenuPropsType) {
  const { state } = useEditor()

  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    if (!state.editor.value.commands.getTable?.()) {
      return true
    }
    if (!state.editor.value.commands.canMergeTableCells?.(props.direction)) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])

  //方法
  const onOperate = () => {
    state.editor.value?.commands.mergeTableCell?.(props.direction)
  }

  return (
    <Menu disabled={isDisabled} active={false} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name={`kaitify-icon-merge-cells-${props.direction}`} />
    </Menu>
  )
}
