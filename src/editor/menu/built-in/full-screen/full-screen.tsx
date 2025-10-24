import { useEffect, useMemo, useRef, useState } from 'react'
import { useWrapperContext } from '@/hooks/use-wrapper-context'
import { Icon } from '@/core/icon'
import Menu from '../../menu'
import { FullScreenMenuPropsType } from './props'

export default function FullScreenMenu({ zIndex = 100, ...props }: FullScreenMenuPropsType) {
  const { state } = useWrapperContext()

  //绑定的全屏dom
  const targetDom = useRef<HTMLElement | null>(null)

  //是否全屏
  const [isFullScreen, setIsFullScreen] = useState(false)

  //是否激活
  const isActive = useMemo(() => {
    return !!targetDom.current && isFullScreen
  }, [targetDom.current, isFullScreen])

  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])

  //方法
  const onOperate = () => {
    if (isActive) {
      if (targetDom.current) {
        targetDom.current.style.setProperty('position', '')
        targetDom.current.style.setProperty('left', '')
        targetDom.current.style.setProperty('top', '')
        targetDom.current.style.setProperty('z-index', '')
        targetDom.current.style.setProperty('width', '')
        targetDom.current.style.setProperty('height', '')
        setIsFullScreen(false)
      }
    } else {
      if (targetDom.current) {
        targetDom.current.style.setProperty('position', 'fixed', 'important')
        targetDom.current.style.setProperty('left', '0px', 'important')
        targetDom.current.style.setProperty('top', '0px', 'important')
        targetDom.current.style.setProperty('z-index', `${zIndex}`, 'important')
        targetDom.current.style.setProperty('width', '100vw', 'important')
        targetDom.current.style.setProperty('height', '100vh', 'important')
        setIsFullScreen(true)
      }
    }
  }

  useEffect(() => {
    targetDom.current = document.body.querySelector(props.target)
    return () => {
      targetDom.current = null
    }
  }, [])

  return (
    <Menu disabled={isDisabled} active={isActive} onOperate={onOperate} shortcut={props.shortcut}>
      <Icon name='kaitify-icon-full-screen' />
    </Menu>
  )
}
