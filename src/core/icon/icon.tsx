import classNames from 'classnames'
import { Icon as IconifyIcon } from '@iconify/react'
import { IconPropsType } from './props'
import styles from './style.module.less'

/**
 * 图标组件
 */
export default function Icon(props: IconPropsType) {
  if (props.name.startsWith('kaitify-icon-')) {
    return <i className={classNames(styles['kaitify-icon'], props.name)} style={{ fontSize: props.size }} />
  }
  return <IconifyIcon mode='svg' icon={props.name} className={styles['kaitify-icon']} style={{ fontSize: props.size }} />
}
