import classNames from 'classnames'
import { useEditor } from '@/hooks'
import styles from './style.module.less'

/**
 * 分隔线
 */
export default function Divider() {
  const { dark } = useEditor()
  return (
    <div
      className={classNames(styles['kaitify-divider'], {
        [styles['kaitify-dark']]: dark
      })}
    />
  )
}
