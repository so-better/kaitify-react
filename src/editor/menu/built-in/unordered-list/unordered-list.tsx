import { useCallback, useMemo, useRef } from 'react'
import { UnorderListType } from '@kaitify/core'
import { useEditor } from '@/hooks'
import { Button } from '@/core/button'
import { Icon } from '@/core/icon'
import { MenuRefType } from '../../props'
import Menu from '../../menu'
import { UnorderedListMenuPropsType } from './props'
import styles from './style.module.less'

export default function UnorderedListMenu(props: UnorderedListMenuPropsType) {
  const { state } = useEditor()

  //菜单组件实例
  const menuRef = useRef<MenuRefType | null>(null)
  //有序列表序标列表
  const listTypes: UnorderListType[] = ['disc', 'square', 'circle']
  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])

  //选项是否激活
  const itemActive = useCallback(
    (item: UnorderListType) => {
      return (
        state.editor.value?.commands.allList?.({
          ordered: false,
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
        ordered: false
      }) ?? false
    )
  }, [state.editor])

  //选择选项
  const onSelect = (item: UnorderListType) => {
    if (itemActive(item)) {
      state.editor.value?.commands.unsetList?.({
        ordered: false,
        listType: item
      })
    } else {
      state.editor.value?.commands.setList?.({
        ordered: false,
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
        <div className={styles['kaitify-unordered-list']}>
          {listTypes.map(item => (
            <div key={item} className={styles['kaitify-unordered-list-item']}>
              <Button large active={itemActive(item)} onClick={() => onSelect(item)}>
                <Icon name={'kaitify-icon-list-' + item} />
              </Button>
            </div>
          ))}
        </div>
      }
    >
      <Icon name='kaitify-icon-list-disc' />
    </Menu>
  )
}
