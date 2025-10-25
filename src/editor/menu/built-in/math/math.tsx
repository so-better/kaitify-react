import { useMemo, useRef, useState } from 'react'
import { useEditor } from '@/hooks/use-editor'
import { Button } from '@/core/button'
import { Icon } from '@/core/icon'
import { MenuRefType } from '../../props'
import Menu from '../../menu'
import { MathMenuPropsType } from './props'
import styles from './style.module.less'

//  \sum_{i=1}^{n} i = \frac{n(n+1)}{2}

export default function MathMenu(props: MathMenuPropsType) {
  const { state, t } = useEditor()

  //菜单组件实例
  const menuRef = useRef<MenuRefType | null>(null)
  //数学公式内容
  const [mathText, setMathText] = useState('')
  //是否激活
  const isActive = useMemo(() => {
    return !!state.editor.value?.commands.getMath?.()
  }, [state.editor])

  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    if (state.editor.value.commands.hasAttachment?.()) {
      return true
    }
    if (state.editor.value.commands.hasLink?.()) {
      return true
    }
    if (state.editor.value.commands.hasCodeBlock?.()) {
      return true
    }
    if (state.editor.value.commands.hasMath?.() && !isActive) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])

  //浮层显示
  const menuShow = () => {
    const mathNode = state.editor.value?.commands.getMath?.()
    setMathText(mathNode ? (mathNode.marks!['kaitify-math'] as string) || '' : '')
  }
  //插入数学公式
  const insert = () => {
    if (!mathText) {
      return
    }
    state.editor.value?.commands.setMath?.(mathText)
    menuRef.current?.hidePopover()
  }
  //更新数学公式
  const update = async () => {
    if (!mathText) {
      return
    }
    state.editor.value?.commands.updateMath?.(mathText)
    menuRef.current?.hidePopover()
  }

  return (
    <Menu
      ref={menuRef}
      disabled={isDisabled}
      active={isActive}
      popover
      popoverProps={{ width: props.popoverProps?.width ?? 300, maxHeight: props.popoverProps?.maxHeight, minWidth: props.popoverProps?.minWidth, animation: props.popoverProps?.animation, arrow: props.popoverProps?.arrow, placement: props.popoverProps?.placement, trigger: props.popoverProps?.trigger, zIndex: props.popoverProps?.zIndex, onShow: menuShow }}
      customPopover={
        <div className={styles['kaitify-math']}>
          <textarea className={styles['kaitify-math-textarea']} value={mathText} onChange={e => setMathText(e.target.value)} placeholder={t('输入Latex数学公式')} />
          <div className={styles['kaitify-math-footer']}>
            {isActive ? (
              <Button key='update' disabled={!mathText} onClick={update}>
                {t('更新')}
              </Button>
            ) : (
              <Button key='insert' disabled={!mathText} onClick={insert}>
                {t('插入')}
              </Button>
            )}
          </div>
        </div>
      }
    >
      <Icon name='kaitify-icon-mathformula' />
    </Menu>
  )
}
