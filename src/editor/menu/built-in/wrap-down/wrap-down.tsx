import { useMemo } from 'react'
import { KNode } from '@kaitify/core'
import { useEditor } from '@/hooks'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { WrapDownMenuPropsType } from './props'

export default function WrapDownMenu(props: WrapDownMenuPropsType) {
  const { state } = useEditor()

  //是否禁用
  const isDisabled = useMemo(() => {
    const matchNode = state.editor.value?.getMatchNodeBySelection(props.match)
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
    state.editor.value?.addNodeAfter(paragraph, matchNode)
    state.editor.value?.setSelectionBefore(paragraph, 'all')
    state.editor.value?.updateView()
  }

  return (
    <Menu disabled={isDisabled} active={false} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-wrap-down' />
    </Menu>
  )
}
