import classNames from 'classnames'
import { CheckboxPropsType } from './props'
import styles from './style.module.less'
import React from 'react'

/**
 * 复选框
 */
export default function Checkbox(props: CheckboxPropsType) {
  //复选框变更
  const onChange = (e: React.ChangeEvent) => {
    if (props.disabled) {
      return
    }
    const checked = (e.target as HTMLInputElement).checked
    props.onChange?.(checked)
  }

  return (
    <label className={styles['kaitify-checkbox']} data-disabled={props.disabled}>
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
