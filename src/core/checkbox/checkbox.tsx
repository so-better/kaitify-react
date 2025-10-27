import React from 'react'
import classNames from 'classnames'
import { useEditor } from '@/hooks'
import { CheckboxPropsType } from './props'
import styles from './style.module.less'

/**
 * 复选框
 */
export default function Checkbox(props: CheckboxPropsType) {
  const { dark } = useEditor()

  //复选框变更
  const onChange = (e: React.ChangeEvent) => {
    if (props.disabled) {
      return
    }
    const checked = (e.target as HTMLInputElement).checked
    props.onChange?.(checked)
  }

  return (
    <label
      className={classNames(styles['kaitify-checkbox'], {
        [styles['kaitify-disabled']]: props.disabled,
        [styles['kaitify-dark']]: dark
      })}
    >
      <span
        className={classNames(styles['kaitify-checkbox-el'], {
          [styles['kaitify-checkbox-active']]: props.checked
        })}
      >
        <input type='checkbox' onChange={onChange} disabled={props.disabled} />
      </span>
      <span className={styles['kaitify-checkbox-label']}>{props.label}</span>
    </label>
  )
}
