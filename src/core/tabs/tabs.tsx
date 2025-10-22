import { useState } from 'react'
import classNames from 'classnames'
import { TabsPropsType } from './props'
import styles from './style.module.less'

export default function Tabs({ data = [], ...props }: TabsPropsType) {
  //当前选项
  const [current, setCurrent] = useState<string | number>(props.defaultValue)

  return (
    <div className={styles['kaitify-tabs']}>
      <div className={styles['kaitify-tabs-header']}>
        {data.map(item => (
          <div
            key={item.value}
            className={classNames(styles['kaitify-tabs-header-item'], {
              [styles['kaitify-tabs-header-item-active']]: item.value === current
            })}
            onClick={() => setCurrent(item.value)}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className={styles['kaitify-tabs-content']}>{typeof props.children === 'function' ? props.children(current) : props.children}</div>
    </div>
  )
}
