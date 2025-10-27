import { useMemo } from 'react'
import { useEditor } from '@/hooks'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { VideoLoopMenuPropsType } from './props'

export default function VideoLoopMenu(props: VideoLoopMenuPropsType) {
  const { state } = useEditor()

  //是否激活
  const isActive = useMemo(() => {
    const videoNode = state.editor.value?.commands.getVideo?.()
    if (!videoNode) {
      return false
    }
    return videoNode.hasMarks() && videoNode.marks!.hasOwnProperty('loop')
  }, [state.editor])
  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    if (!state.editor.value.commands.getVideo?.()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])

  //方法
  const onOperate = () => {
    if (isActive) {
      state.editor.value?.commands.updateVideo?.({
        loop: false
      })
    } else {
      state.editor.value?.commands.updateVideo?.({
        loop: true
      })
    }
  }

  return (
    <Menu disabled={isDisabled} active={isActive} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-loop' />
    </Menu>
  )
}
