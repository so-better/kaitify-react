import React, { forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { createPopper, Instance } from '@popperjs/core'
import { event as DapEvent } from 'dap-util'
import { CSSTransition } from 'react-transition-group'
import { PopoverPropsType, PopoverPlacementType, PopoverRefType } from './props'
import styles from './style.module.less'
import { Teleport } from '../teleport'

/**
 * 浮层组件
 */
const Popover = forwardRef<PopoverRefType, PopoverPropsType>(({ placement = 'bottom', trigger = 'hover', delay = 0, ...props }, ref) => {
  //唯一id
  const uid = useId()
  //是否显示
  const [visible, setVisible] = useState<boolean>(false)
  //浮层真实位置
  const [realPlacement, setRealPlacement] = useState<PopoverPlacementType>(placement)
  //目标元素
  const referRef = useRef<HTMLDivElement | null>(null)
  //三角形元素
  const arrowRef = useRef<HTMLDivElement | null>(null)
  //浮层元素
  const popoverRef = useRef<HTMLDivElement | null>(null)
  //popperjs实例
  const popperInstance = useRef<Instance | undefined>()

  //浮层剩余位置
  const popoverRemainingPlacements = useMemo<PopoverPlacementType[]>(() => {
    if (placement.startsWith('top')) {
      return (['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'] as PopoverPlacementType[]).filter(item => item != placement)
    }
    if (placement.startsWith('bottom')) {
      return (['bottom', 'bottom-start', 'bottom-end', 'top', 'top-start', 'top-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'] as PopoverPlacementType[]).filter(item => item != placement)
    }
    if (placement.startsWith('left')) {
      return (['left', 'left-start', 'left-end', 'right', 'right-start', 'right-end', 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'] as PopoverPlacementType[]).filter(item => item != placement)
    }
    return (['right', 'right-start', 'right-end', 'left', 'left-start', 'left-end', 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'] as PopoverPlacementType[]).filter(item => item != placement)
  }, [placement])

  //更新浮层位置
  const update = async () => {
    if (popperInstance.current) {
      await popperInstance.current.update()
      setRealPlacement(popperInstance.current.state.placement)
    }
  }

  //显示浮层
  const showPopover = () => {
    if (props.disabled) {
      return
    }
    //延迟显示
    if (delay > 0) {
      setTimeout(() => {
        setVisible(true)
      }, delay)
      return
    }
    //正常显示
    setVisible(true)
  }

  //隐藏浮层
  const hidePopover = () => {
    if (props.disabled) {
      return
    }
    setVisible(false)
  }

  //鼠标移入
  const handleMouseEnter = () => {
    if (trigger != 'hover') {
      return
    }
    showPopover()
  }
  //鼠标移出
  const handleMouseLeave = (e: React.MouseEvent) => {
    if (trigger != 'hover') {
      return
    }
    //移出到目标元素里
    if (referRef.current?.contains(e.relatedTarget as HTMLElement)) {
      return
    }
    //移出到浮层元素里
    if (popoverRef.current?.contains(e.relatedTarget as HTMLElement)) {
      return
    }
    hidePopover()
  }
  //点击
  const handleClick = () => {
    if (trigger != 'click') {
      return
    }
    if (visible) hidePopover()
    else showPopover()
  }

  //浮层显示时
  const onShowing = (el: Element) => {
    update()
    props.onShowing?.(el)
  }

  //监听外部改变placement，更新poperjs对象
  useEffect(() => {
    if (popperInstance.current) {
      popperInstance.current.state.options.placement = placement
      popperInstance.current.state.options.modifiers.find(mod => mod.name === 'flip').options.fallbackPlacements = popoverRemainingPlacements
      update()
    }
  }, [placement])

  useEffect(() => {
    if (referRef.current && popoverRef.current) {
      if (popperInstance.current) {
        popperInstance.current.destroy()
      }
      popperInstance.current = createPopper(referRef.current, popoverRef.current, {
        placement: placement,
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
              fallbackPlacements: popoverRemainingPlacements
            }
          },
          //控制offset为0
          {
            name: 'offset',
            options: {
              offset: [0, 0]
            }
          },
          //设置箭头元素的位置，使其始终指向目标元素
          {
            name: 'arrow',
            options: {
              element: arrowRef.current!
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
      })
    }
    return () => {
      if (popperInstance.current) {
        popperInstance.current.destroy()
        popperInstance.current = undefined
      }
    }
  }, [referRef.current, popoverRef.current])

  //点击其他地方关闭浮层
  useEffect(() => {
    DapEvent.on(document.documentElement, `click.kaitify-popover-${uid}`, e => {
      //点击目标元素
      if (referRef.current?.contains(e.target as HTMLElement)) {
        return
      }
      //点击浮层元素
      if (popoverRef.current?.contains(e.target as HTMLElement)) {
        return
      }
      //关闭浮层
      hidePopover()
    })
    return () => {
      DapEvent.off(document.documentElement, `click.kaitify-popover-${uid}`)
    }
  }, [])

  useImperativeHandle(ref, () => ({
    visible,
    showPopover,
    hidePopover,
    popperInstance,
    realPlacement,
    update
  }))

  return (
    <>
      <div ref={referRef} className={styles['kaitify-popover-refer']} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
        {props.refer}
      </div>
      <Teleport to='body'>
        <CSSTransition
          in={visible}
          timeout={{
            enter: 300,
            exit: 50
          }}
          classNames={{
            enter: styles['kaitify-popover-enter'],
            enterActive: styles['kaitify-popover-enter-active'],
            exit: styles['kaitify-popover-exit'],
            exitActive: styles['kaitify-popover-exit-active']
          }}
          unmountOnExit
          onEnter={props.onShow}
          onEntering={onShowing}
          onEntered={props.onShown}
          onExit={props.onHide}
          onExiting={props.onHiding}
          onExited={props.onHidden}
        >
          <div ref={popoverRef} className={styles['kaitify-popover']} onMouseLeave={handleMouseLeave} data-arrow={props.arrow} data-placement={realPlacement} style={{ zIndex: props.zIndex ?? 10 }}>
            {/* 主体 */}
            <div className={styles['kaitify-popover-wrapper']}>
              {/* 内容区域 */}
              <div className={styles['kaitify-popover-content']} style={{ width: props.width ?? 'auto', maxHeight: props.maxHeight ?? '', minWidth: props.minWidth ?? '' }}>
                {props.children}
              </div>
              {/* arrow */}
              {props.arrow && <div ref={arrowRef} className={styles['kaitify-popover-arrow']} data-placement={realPlacement} />}
            </div>
          </div>
        </CSSTransition>
      </Teleport>
    </>
  )
})

export default Popover
