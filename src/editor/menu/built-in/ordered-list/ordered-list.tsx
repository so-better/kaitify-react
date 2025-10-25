import { useCallback, useMemo, useRef } from 'react'
import { OrderedListType } from '@kaitify/core'
import { useEditor } from '@/hooks/use-editor'
import { Icon } from '@/core/icon'
import { Button } from '@/core/button'
import { MenuRefType } from '../../props'
import Menu from '../../menu'
import { OrderedListMenuPropsType } from './props'
import styles from './style.module.less'

export default function OrderedListMenu(props: OrderedListMenuPropsType) {
  const { state } = useEditor()
  //有序列表序标列表
  const listTypes: OrderedListType[] = ['decimal', 'lower-alpha', 'upper-alpha', 'lower-roman', 'upper-roman', 'lower-greek', 'cjk-ideographic']

  //菜单组件实例
  const menuRef = useRef<MenuRefType | null>(null)

  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])
  //选项是否激活
  const itemActive = useCallback(
    (item: OrderedListType) => {
      return (
        state.editor.value?.commands.allList?.({
          ordered: true,
          listType: item
        }) ?? false
      )
    },
    [state.editor]
  )
  //菜单是否激活
  const isActive = useMemo(() => {
    return (
      state.editor.value?.commands.allList?.({
        ordered: true
      }) ?? false
    )
  }, [state.editor])

  //选择选项
  const onSelect = (item: OrderedListType) => {
    if (itemActive(item)) {
      state.editor.value?.commands.unsetList?.({
        ordered: true,
        listType: item
      })
    } else {
      state.editor.value?.commands.setList?.({
        ordered: true,
        listType: item
      })
    }
    menuRef.current?.hidePopover()
  }

  return (
    <Menu
      ref={menuRef}
      disabled={isDisabled}
      active={isActive}
      popover
      popoverProps={{ width: props.popoverProps?.width ?? 160, maxHeight: props.popoverProps?.maxHeight, minWidth: props.popoverProps?.minWidth, animation: props.popoverProps?.animation, arrow: props.popoverProps?.arrow, placement: props.popoverProps?.placement, trigger: props.popoverProps?.trigger, zIndex: props.popoverProps?.zIndex }}
      customPopover={
        <div className={styles['kaitify-ordered-list']}>
          {listTypes.map(item => (
            <div key={item} className={styles['kaitify-ordered-list-item']}>
              <Button className={styles['kaitify-ordered-list-item-button']} active={itemActive(item)} onClick={() => onSelect(item)}>
                <Icon name={'kaitify-icon-list-' + item} />
              </Button>
            </div>
          ))}
        </div>
      }
    >
      <Icon name='kaitify-icon-list-decimal' />
    </Menu>
  )
}
