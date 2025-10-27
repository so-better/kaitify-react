import { forwardRef, ReactNode, useEffect, useId, useImperativeHandle, useRef, useState } from 'react'
import { event as DapEvent, common as DapCommon } from 'dap-util'
import classNames from 'classnames'
import { Popover, PopoverRefType } from '@/core/popover'
import { Icon } from '@/core/icon'
import { Button } from '@/core/button'
import { useEditor } from '@/hooks'
import { MenuDataType, MenuPropsType, MenuRefType } from './props'
import styles from './style.module.less'

/**
 * 菜单组件
 */
const Menu = forwardRef<MenuRefType, MenuPropsType>(
  (
    {
      data = [],
      popover = false,
      popoverProps = {
        width: 'auto',
        placement: 'bottom-start',
        arrow: false,
        trigger: 'click',
        animation: 'translate'
      },
      ...props
    }: MenuPropsType,
    ref
  ) => {
    const uid = useId()
    const { el, dark } = useEditor()
    //popover组件实例
    const popoverRef = useRef<PopoverRefType | null>(null)
    //popover浮层是否显示
    const [popoverVisible, setPopoverVisible] = useState(false)

    //关闭浮层
    const hidePopover = () => {
      popoverRef.current?.hidePopover()
    }
    //显示浮层
    const showPopover = () => {
      popoverRef.current?.showPopover()
    }
    //浮层选项数据点击
    const onSelect = (item: MenuDataType) => {
      if (props.disabled || props.itemDisabled?.(item)) {
        return
      }
      props.onSelect?.(item)
      hidePopover()
    }
    //按钮点击
    const onOperate = () => {
      if (props.disabled || popover) {
        return
      }
      props.onOperate?.()
    }

    //渲染插槽
    const renderSlot = (option: MenuDataType, value?: ReactNode | ((option: MenuDataType) => ReactNode)) => {
      if (typeof value === 'function') {
        return value(option)
      }
      return value
    }

    useImperativeHandle(ref, () => ({
      showPopover,
      hidePopover
    }))

    //设置快捷键
    useEffect(() => {
      if (el && props.shortcut) {
        DapEvent.off(el, `keydown.kaitify_menu_${uid}`)
        DapEvent.on(el, `keydown.kaitify_menu_${uid}`, e => {
          //popover的菜单
          if (popover && DapCommon.isObject(props.shortcut)) {
            const shortcut = props.shortcut as { [key: MenuDataType['value']]: (e: KeyboardEvent) => boolean }
            data.forEach(item => {
              if (typeof shortcut[item.value] == 'function') {
                if (shortcut[item.value](e as KeyboardEvent)) {
                  onSelect(item)
                }
              }
            })
          } else if (typeof props.shortcut == 'function') {
            if (props.shortcut(e as KeyboardEvent)) {
              onOperate()
            }
          }
        })
      }
    }, [el])

    useEffect(() => {
      return () => {
        if (el) {
          DapEvent.off(el, `keydown.kaitify_menu_${uid}`)
        }
      }
    }, [])

    return (
      <div className={styles['kaitify-menu']}>
        <Popover
          ref={popoverRef}
          delay={100}
          disabled={props.disabled || !popover}
          zIndex={popoverProps.zIndex ?? 10}
          animation={popoverProps.animation ?? 'translate'}
          arrow={popoverProps.arrow}
          placement={popoverProps.placement ?? 'bottom-start'}
          trigger={popoverProps.trigger ?? 'click'}
          width={popoverProps.width}
          maxHeight={popoverProps.maxHeight}
          minWidth={popoverProps.minWidth}
          onShow={el => {
            popoverProps.onShow?.(el)
            setPopoverVisible(true)
          }}
          onShowing={popoverProps.onShowing}
          onShown={popoverProps.onShown}
          onHide={el => {
            popoverProps.onHide?.(el)
            setPopoverVisible(false)
          }}
          onHiding={popoverProps.onHiding}
          onHidden={popoverProps.onHidden}
          refer={
            <Button onClick={onOperate} disabled={props.disabled} active={props.active}>
              {props.children}
              {popover && (
                <Icon
                  name='kaitify-icon-caret-down'
                  className={classNames(styles['kaitify-menu-caret'], {
                    [styles['kaitify-menu-caret-rotate']]: popoverVisible
                  })}
                />
              )}
            </Button>
          }
        >
          {/* 自定义浮层内容 */}
          {props.customPopover}
          {/* 可选浮层内容 */}
          {!props.customPopover && data.length > 0 && (
            <div
              className={classNames(styles['kaitify-menu-options'], {
                [styles['kaitify-dark']]: dark
              })}
            >
              {data.map(item => (
                <div
                  key={item.value}
                  onClick={() => onSelect(item)}
                  className={classNames(styles['kaitify-menu-option'], {
                    [styles['kaitify-menu-option-active']]: props.itemActive?.(item),
                    [styles['kaitify-disabled']]: props.itemDisabled?.(item)
                  })}
                >
                  {props.customIcon ? renderSlot(item, props.customIcon) : !!item.icon && <Icon name={item.icon} className={styles['kaitify-menu-option-icon']} />}
                  {props.customLabel ? renderSlot(item, props.customLabel) : <span>{item.label}</span>}
                </div>
              ))}
            </div>
          )}
        </Popover>
      </div>
    )
  }
)

export default Menu
