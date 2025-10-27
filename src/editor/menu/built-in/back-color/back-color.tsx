import { useEditor } from '@/hooks/use-editor'
import { useCallback, useMemo, useRef } from 'react'
import classNames from 'classnames'
import { Icon } from '@/core/icon'
import { Button } from '@/core/button'
import { MenuRefType } from '../../props'
import Menu from '../../menu'
import { BackColorMenuPropsType } from './props'
import styles from './style.module.less'

const defaultColors: string[] = ['#000000', '#505050', '#808080', '#BBBBBB', '#CCCCCC', '#EEEEEE', '#F7F7F7', '#FFFFFF', '#EC1A0A', '#FF9900', '#FFFF00', '#07C160', '#00FFFF', '#0B73DE', '#9C00FF', '#FF00FF', '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE', '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD', '#e45649', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5', '#CE0000', '#E79439', '#EFC631', '#50a14f', '#4A7B8C', '#03A8F3', '#634AA5', '#A54A7B', '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842', '#630000', '#7B3900', '#986801', '#295218', '#083139', '#003163', '#21104A', '#4A1031']

export default function BackColorMenu({ colors = defaultColors, ...props }: BackColorMenuPropsType) {
  const { state, t, dark } = useEditor()

  //菜单组件实例
  const menuRef = useRef<MenuRefType | null>(null)

  //颜色是否激活
  const isActive = useCallback(
    (item: string) => {
      return state.editor.value?.commands.isBackColor?.(item) ?? false
    },
    [state.editor]
  )
  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    if (!state.editor.value.selection.collapsed() && !state.editor.value.getFocusNodesBySelection('text').length) {
      return true
    }
    if (state.editor.value.selection.collapsed() && (!!state.editor.value.commands.getAttachment?.() || !!state.editor.value.commands.getMath?.())) {
      return true
    }
    if (!!state.editor.value.commands.getCodeBlock?.()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])

  //设置颜色
  const setBackColor = (val: string) => {
    if (!state.editor.value || state.editor.value.commands.isBackColor?.(val)) {
      return
    }
    state.editor.value.commands.setBackColor?.(val)
    menuRef.current?.hidePopover()
  }
  //移除颜色
  const unsetBackColor = () => {
    if (!state.editor.value) {
      return
    }
    state.editor.value.commands.removeTextStyle?.(['backgroundColor', 'background'])
    menuRef.current?.hidePopover()
  }

  return (
    <Menu
      ref={menuRef}
      disabled={isDisabled}
      active={false}
      popover
      popoverProps={{ width: props.popoverProps?.width, maxHeight: props.popoverProps?.maxHeight, minWidth: props.popoverProps?.minWidth, animation: props.popoverProps?.animation, arrow: props.popoverProps?.arrow, placement: props.popoverProps?.placement, trigger: props.popoverProps?.trigger, zIndex: props.popoverProps?.zIndex }}
      customPopover={
        <div
          className={classNames(styles['kaitify-colors-panel'], {
            [styles['kaitify-dark']]: dark
          })}
        >
          <div className={styles['kaitify-colors-header']}>
            <Button onClick={unsetBackColor} block large>
              <Icon name='kaitify-icon-remove' />
              <span className={styles['kaitify-colors-header-text']}>{t('默认颜色')}</span>
            </Button>
          </div>
          <div className={styles['kaitify-colors-content']}>
            {colors.map(item => (
              <div
                key={item}
                className={classNames(styles['kaitify-colors-el'], {
                  [styles['kaitify-color-el-active']]: isActive(item)
                })}
              >
                <div style={{ background: item }} onClick={() => setBackColor(item)} />
              </div>
            ))}
          </div>
        </div>
      }
    >
      <Icon name='kaitify-icon-brush' />
    </Menu>
  )
}
