import classNames from 'classnames'
import { useEditor } from '@/hooks'
import { ButtonPropsType } from './props'
import styles from './style.module.less'

/**
 * 菜单按钮组件
 */
export default function Button(props: ButtonPropsType) {
  const { dark } = useEditor()

  return (
    <button
      className={classNames(styles['kaitify-button'], props.className, {
        [styles['kaitify-button-active']]: props.active,
        [styles['kaitify-button-block']]: props.block,
        [styles['kaitify-button-large']]: props.large,
        [styles['kaitify-dark']]: dark
      })}
      style={props.style}
      disabled={props.disabled}
      type='button'
      role='button'
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
