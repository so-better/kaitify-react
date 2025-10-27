import { useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import { useEditor } from '@/hooks'
import { Icon } from '@/core/icon'
import { MenuRefType } from '../../props'
import Menu from '../../menu'
import { TableGridType, TableMenuPropsType } from './props'
import styles from './style.module.less'

export default function TableMenu({ maxRows = 10, maxColumns = 10, ...props }: TableMenuPropsType) {
  const { state, dark } = useEditor()

  //菜单组件实例
  const menuRef = useRef<MenuRefType | null>(null)

  //获取表格尺寸数据
  const getTableGrids = () => {
    const grids: TableGridType[][] = []
    for (let i = 1; i <= maxRows; i++) {
      let row: TableGridType[] = []
      for (let j = 1; j <= maxColumns; j++) {
        row.push({
          x: i,
          y: j,
          inside: false //是否被选中
        })
      }
      grids.push(row)
    }
    return grids
  }

  const [tableGrids, setTableGrids] = useState<TableGridType[][]>(getTableGrids())

  //表格规格
  const specification = useMemo<TableGridType>(() => {
    return tableGrids
      .flat()
      .filter(item => {
        return item.inside
      })
      .sort((a, b) => {
        if (a.x > b.x && a.y > b.y) {
          return -1
        }
        if (a.x > b.x) {
          return -1
        }
        if (a.y > b.y) {
          return -1
        }
        return 1
      })[0]
  }, [tableGrids])

  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    if (state.editor.value.commands.hasTable?.()) {
      return true
    }
    if (state.editor.value.commands.hasCodeBlock?.()) {
      return true
    }
    if (state.editor.value.commands.hasAttachment?.()) {
      return true
    }
    if (state.editor.value.commands.hasMath?.()) {
      return true
    }
    if (state.editor.value.commands.hasCodeBlock?.()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])

  //改变表格大小
  const changeTableSize = (data: TableGridType) => {
    for (let i = 0; i < tableGrids.length; i++) {
      const grid = tableGrids[i]
      for (let j = 0; j < grid.length; j++) {
        setTableGrids(oldValue => [...oldValue.slice(0, i), [...oldValue[i].slice(0, j), { ...oldValue[i][j], inside: grid[j].x <= data.x && grid[j].y <= data.y }, ...oldValue[i].slice(j + 1)], ...oldValue.slice(i + 1)])
      }
    }
  }
  //插入表格
  const insert = async (data: TableGridType) => {
    if (maxRows < 1 || maxColumns < 1) {
      return
    }
    state.editor.value?.commands.setTable?.({
      rows: data.x,
      columns: data.y
    })
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
          className={classNames(styles['kaitify-table'], {
            [styles['kaitify-dark']]: dark
          })}
        >
          <table>
            <tbody>
              {tableGrids.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((column, colIndex) => (
                    <td
                      key={`${rowIndex}-${colIndex}`}
                      className={classNames({
                        [styles['kaitify-table-inside']]: column.inside
                      })}
                      onMouseEnter={() => changeTableSize(column)}
                      onClick={() => insert(column)}
                    >
                      <span />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {specification && (
            <div className={styles['kaitify-table-footer']}>
              {specification.x} x {specification.y}
            </div>
          )}
        </div>
      }
    >
      <Icon name='kaitify-icon-table' />
    </Menu>
  )
}
