import { forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef } from 'react'
import { Instance, createPopper } from '@popperjs/core'
import { event as DapEvent } from 'dap-util'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { Teleport } from '@/core/teleport'
import { useEditor } from '@/hooks'
import { BubblePropsType, BubbleRefType } from './props'
import styles from './style.module.less'

/**
 * 气泡栏组件
 */
const Bubble = forwardRef<BubbleRefType, BubblePropsType>((props, ref) => {
  //唯一id
  const uid = useId()
  //上下文数据
  const { state, disabled, isMouseDown, el, dark } = useEditor()

  //气泡元素
  const elRef = useRef<HTMLDivElement | null>(null)
  //popperjs实例
  const popperInstance = useRef<Instance | null>(null)

  //是否显示气泡栏
  const shouldVisible = useMemo<boolean>(() => {
    if (disabled) {
      return false
    }
    if (isMouseDown && props.hideOnMousedown) {
      return false
    }
    return props.visible ?? false
  }, [disabled, isMouseDown, props.hideOnMousedown, props.visible])

  //销毁popperjs实例
  const destroyPopperjs = () => {
    if (popperInstance.current) {
      popperInstance.current.destroy()
      popperInstance.current = null
    }
  }
  //获取编辑器内的光标位置
  const getVirtualDomRect = () => {
    if (!state.editor.value || !el) {
      return null
    }
    if (state.editor.value.selection.focused()) {
      if (props.match) {
        const node = state.editor.value.getMatchNodeBySelection(props.match)
        if (node) {
          const dom = state.editor.value.findDom(node)
          return dom.getBoundingClientRect()
        }
      }
      const selection = window.getSelection()
      if (!selection || !selection.rangeCount) return el.getBoundingClientRect()
      const range = selection.getRangeAt(0)
      const rects = range.getClientRects()
      if (rects.length) {
        const rect = rects[rects.length - 1]
        return {
          top: rect.top,
          left: rect.left,
          right: rect.left + rect.width,
          bottom: rect.top + rect.height,
          width: rect.width,
          height: rect.height,
          x: rect.left,
          y: rect.top,
          toJSON: () => {}
        } as DOMRect
      }
    }
    return el.getBoundingClientRect()
  }
  //更新气泡位置
  const updatePosition = () => {
    if (!props.visible || !elRef.current || !state.editor) {
      return
    }
    const domRect = getVirtualDomRect()!
    //销毁当前popperjs实例
    destroyPopperjs()
    //重新创建popperjs实例
    popperInstance.current = createPopper(
      {
        getBoundingClientRect: () => domRect
      },
      elRef.current,
      {
        placement: 'bottom-start',
        modifiers: [
          //控制浮层的位置计算方式，包括使用 GPU 加速、是否启用自适应等
          {
            name: 'computeStyles',
            options: {
              adaptive: true, //启用自适应
              gpuAcceleration: false //关闭GPU加速
            }
          },
          //如果弹出框在预设的位置被页面边界或其他限制遮挡，popperjs会自动尝试翻转到其他位置。它会检查可用的视窗空间并自动调整位置，确保内容不会超出视窗或被遮挡。
          {
            name: 'flip',
            options: {
              enabled: true,
              fallbackPlacements: ['bottom', 'bottom-end', 'top-start', 'top', 'top-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']
            }
          },
          //控制offset为0
          {
            name: 'offset',
            options: {
              offset: [0, 5]
            }
          },
          //确保浮层不会超出指定的边界区域，通常用于当浮层过大或目标位置变化时自动修正浮层位置
          {
            name: 'preventOverflow',
            options: {
              enabled: true,
              boundary: 'viewport',
              padding: 5
            }
          }
        ]
      }
    )
  }
  //滚动监听
  const onScroll = (el: HTMLElement) => {
    DapEvent.on(el, `scroll.kaitify_bubble_${uid}`, () => {
      if (props.visible) {
        updatePosition()
      }
    })
    if (el.parentNode) {
      onScroll(el.parentNode as HTMLElement)
    }
  }
  //移除滚动监听
  const removeScroll = (el: HTMLElement) => {
    DapEvent.off(el, `scroll.kaitify_bubble_${uid}`)
    if (el.parentNode) {
      removeScroll(el.parentNode as HTMLElement)
    }
  }

  //气泡栏显示前
  const onShow = () => {
    props.onShow?.(elRef.current as HTMLElement)
  }
  //气泡栏显示时
  const onShowing = () => {
    updatePosition()
    props.onShowing?.(elRef.current as HTMLElement)
  }
  //气泡栏显示后
  const onShown = () => {
    props.onShown?.(elRef.current as HTMLElement)
  }
  //气泡栏隐藏前
  const onHide = () => {
    props.onHide?.(elRef.current as HTMLElement)
  }
  //气泡栏隐藏时
  const onHiding = () => {
    props.onHiding?.(elRef.current as HTMLElement)
  }
  //气泡栏隐藏后
  const onHidden = () => {
    destroyPopperjs()
    props.onHidden?.(elRef.current as HTMLElement)
  }

  useImperativeHandle(ref, () => ({
    elRef,
    popperInstance
  }))

  //监听光标变化
  useEffect(() => {
    //更新气泡位置
    updatePosition()
  }, [state.selection])

  //监听编辑器实例
  useEffect(() => {
    if (el) {
      //设置滚动监听
      onScroll(el)
    }
  }, [el])

  useEffect(() => {
    return () => {
      destroyPopperjs()
      if (el) {
        removeScroll(el)
      }
    }
  }, [])

  return (
    <Teleport>
      <CSSTransition
        in={shouldVisible}
        timeout={50}
        classNames={{
          enter: styles['kaitify-bubble-enter'],
          enterActive: styles['kaitify-bubble-enter-active'],
          exit: styles['kaitify-bubble-exit'],
          exitActive: styles['kaitify-bubble-exit-active']
        }}
        unmountOnExit
        nodeRef={elRef}
        onEnter={onShow}
        onEntering={onShowing}
        onEntered={onShown}
        onExit={onHide}
        onExiting={onHiding}
        onExited={onHidden}
      >
        <div
          ref={elRef}
          className={classNames(
            styles['kaitify-bubble'],
            {
              [styles['kaitify-dark']]: dark
            },
            props.className
          )}
          style={{ zIndex: 5, ...props.style }}
        >
          {props.children}
        </div>
      </CSSTransition>
    </Teleport>
  )
})

export default Bubble
