import { useMemo } from 'react'
import { KNode } from '@kaitify/core'
import { useEditor } from '@/hooks/use-editor'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { WrapUpMenuPropsType } from './props'

export default function WrapUpMenu(props: WrapUpMenuPropsType) {
  const { state } = useEditor()

  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused() || !props.match) {
      return true
    }
    const matchNode = state.editor.value.getMatchNodeBySelection(props.match)
    if (!matchNode || !matchNode.isBlock() || matchNode.void || matchNode.fixed || matchNode.nested) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])

  //方法
  const onOperate = () => {
    if (!props.match) {
      return
    }
    const matchNode = state.editor.value?.getMatchNodeBySelection(props.match)
    if (!matchNode || !matchNode.isBlock() || matchNode.void || matchNode.fixed || matchNode.nested) {
      return
    }
    const paragraph = KNode.create({
      type: 'block',
      tag: state.editor.value?.blockRenderTag,
      children: [
        {
          type: 'closed',
          tag: 'br'
        }
      ]
    })
    state.editor.value?.addNodeBefore(paragraph, matchNode)
    state.editor.value?.setSelectionBefore(paragraph, 'all')
    state.editor.value?.updateView()
  }

  return (
    <Menu disabled={isDisabled} active={false} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-wrap-up' />
    </Menu>
  )
}
