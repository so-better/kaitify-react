import { useMemo } from 'react'
import { useEditor } from '@/hooks/use-editor'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { VideoMutedMenuPropsType } from './props'

export default function VideoMutedMenu(props: VideoMutedMenuPropsType) {
  const { state } = useEditor()

  //是否激活
  const isActive = useMemo(() => {
    const videoNode = state.editor.value?.commands.getVideo?.()
    if (!videoNode) {
      return false
    }
    return videoNode.hasMarks() && videoNode.marks!.hasOwnProperty('muted')
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
        muted: false
      })
    } else {
      state.editor.value?.commands.updateVideo?.({
        muted: true
      })
    }
  }

  return (
    <Menu disabled={isDisabled} active={isActive} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-muted' />
    </Menu>
  )
}
