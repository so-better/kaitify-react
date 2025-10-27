import { useMemo } from 'react'
import { useEditor } from '@/hooks'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { VideoControlsMenuPropsType } from './props'

export default function VideoControlsMenu(props: VideoControlsMenuPropsType) {
  const { state } = useEditor()

  //是否激活
  const isActive = useMemo(() => {
    const videoNode = state.editor.value?.commands.getVideo?.()
    if (!videoNode) {
      return false
    }
    return videoNode.hasMarks() && videoNode.marks!.hasOwnProperty('controls')
  }, [state.editor])
  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.commands.getVideo?.()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])

  //方法
  const onOperate = () => {
    if (isActive) {
      state.editor.value?.commands.updateVideo?.({
        controls: false
      })
    } else {
      state.editor.value?.commands.updateVideo?.({
        controls: true
      })
    }
  }

  return (
    <Menu disabled={isDisabled} active={isActive} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-controls' />
    </Menu>
  )
}
