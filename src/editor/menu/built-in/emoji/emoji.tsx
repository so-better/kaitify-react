import { useMemo, useRef } from 'react'
import { Icon } from '@/core/icon'
import { useEditor } from '@/hooks/use-editor'
import { MenuRefType } from '../../props'
import Menu from '../../menu'
import { EmojiMenuPropsType } from './props'
import styles from './style.module.less'

/**
 * ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '😉', '😍', '😘', '😗', '😚', '🥰', '😋', '😜', '🤪', '🤨', '😭', '😢', '😔', '😞', '😰', '😱', '😨', '😳', '😡', '😠', '🤬', '👍', '👎', '👏', '🙌', '👐', '🤝', '✌', '🤞', '🤘', '❤️', '💕', '💖', '💗', '💘', '💔', '❣', '🖤', '💙', '💚', '🍏', '🍎', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🍕', '🍔', '🍟', '🌭', '🍗', '🍞', '🚗', '🚕', '🚙', '🚌', '🚑', '🚓', '🚚', '🚲', '🚜', '🚂', '✈️', '🚀', '🎉', '🎊', '🎁', '🔥', '🌈', '⭐', '💡', '⏰', '📅', '📌', '🎶', '🎵']
 */
const defaultEmoji: string[] = [
  '\u{1F600}',
  '\u{1F603}',
  '\u{1F604}',
  '\u{1F601}',
  '\u{1F606}',
  '\u{1F605}',
  '\u{1F602}',
  '\u{1F923}',
  '\u{1F60A}',
  '\u{1F607}',
  '\u{1F609}',
  '\u{1F60D}',
  '\u{1F618}',
  '\u{1F617}',
  '\u{1F61A}',
  '\u{1F970}',
  '\u{1F60B}',
  '\u{1F61C}',
  '\u{1F92A}',
  '\u{1F928}',
  '\u{1F62D}',
  '\u{1F622}',
  '\u{1F614}',
  '\u{1F61E}',
  '\u{1F630}',
  '\u{1F631}',
  '\u{1F628}',
  '\u{1F633}',
  '\u{1F621}',
  '\u{1F620}',
  '\u{1F92C}',
  '\u{1F44D}',
  '\u{1F44E}',
  '\u{1F44F}',
  '\u{1F64C}',
  '\u{1F450}',
  '\u{1F91D}',
  '\u{270C}',
  '\u{1F91E}',
  '\u{1F918}',
  '\u{2764}\u{FE0F}',
  '\u{1F495}',
  '\u{1F496}',
  '\u{1F497}',
  '\u{1F498}',
  '\u{1F494}',
  '\u{2763}',
  '\u{1F5A4}',
  '\u{1F499}',
  '\u{1F49A}',
  '\u{1F34F}',
  '\u{1F34E}',
  '\u{1F34C}',
  '\u{1F349}',
  '\u{1F347}',
  '\u{1F353}',
  '\u{1F352}',
  '\u{1F351}',
  '\u{1F355}',
  '\u{1F354}',
  '\u{1F35F}',
  '\u{1F32D}',
  '\u{1F357}',
  '\u{1F35E}',
  '\u{1F697}',
  '\u{1F695}',
  '\u{1F699}',
  '\u{1F68C}',
  '\u{1F691}',
  '\u{1F693}',
  '\u{1F69A}',
  '\u{1F6B2}',
  '\u{1F69C}',
  '\u{1F682}',
  '\u{2708}\u{FE0F}',
  '\u{1F680}',
  '\u{1F389}',
  '\u{1F38A}',
  '\u{1F381}',
  '\u{1F525}',
  '\u{1F308}',
  '\u{2B50}',
  '\u{1F4A1}',
  '\u{23F0}',
  '\u{1F4C5}',
  '\u{1F4CC}',
  '\u{1F3B6}',
  '\u{1F3B5}'
]

export default function EmojiMenu({ data = defaultEmoji, ...props }: EmojiMenuPropsType) {
  const { state } = useEditor()

  //菜单组件实例
  const menuRef = useRef<MenuRefType | null>(null)
  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])

  //插入标签
  const setEmoji = (val: string) => {
    state.editor.value?.insertText(val)
    state.editor.value?.updateView()
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
        <div className={styles['kaitify-emoji-panel']}>
          {data.map((item, index) => (
            <div key={index} className={styles['kaitify-emoji-el']}>
              <div onClick={() => setEmoji(item)}>{item}</div>
            </div>
          ))}
        </div>
      }
    >
      <Icon name='kaitify-icon-emoji' />
    </Menu>
  )
}
