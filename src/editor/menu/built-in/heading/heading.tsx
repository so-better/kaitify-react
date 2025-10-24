import { useCallback, useMemo, useRef } from 'react'
import { HeadingLevelType } from '@kaitify/core'
import { useWrapperContext } from '@/hooks/use-wrapper-context'
import { MenuDataType, MenuRefType } from '../../props'
import Menu from '../../menu'
import { HeadingMenuPropsType } from './props'

export default function HeadingMenu(props: HeadingMenuPropsType) {
  const { state, t } = useWrapperContext()

  //菜单组件实例
  const menuRef = useRef<MenuRefType | null>(null)
  //选项
  const options = useMemo<MenuDataType[]>(() => {
    const baseOptions: MenuDataType[] = [
      {
        label: t('一级标题'),
        value: 1
      },
      {
        label: t('二级标题'),
        value: 2
      },
      {
        label: t('三级标题'),
        value: 3
      },
      {
        label: t('四级标题'),
        value: 4
      },
      {
        label: t('五级标题'),
        value: 5
      },
      {
        label: t('六级标题'),
        value: 6
      }
    ]
    return [
      ...(props.data || baseOptions),
      {
        label: t('正文'),
        value: 0
      }
    ]
  }, [props.data])

  //选项对应的字体大小
  const fontSizeMap: Record<number, string> = {
    0: '14px',
    1: '24px',
    2: '22px',
    3: '20px',
    4: '18px',
    5: '16px',
    6: '15px'
  }

  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])
  //选项是否激活
  const isActive = useCallback(
    (value: HeadingLevelType) => {
      //正文处理
      if (value === 0) {
        if (isActive(1) || isActive(2) || isActive(3) || isActive(4) || isActive(5) || isActive(6)) {
          return false
        }
        return true
      }
      return state.editor.value?.commands.allHeading?.(value) ?? false
    },
    [state.editor]
  )
  //选择的值
  const selectedData = useMemo<MenuDataType>(() => {
    return options.find(item => isActive(item.value as HeadingLevelType)) ?? options[options.length - 1]
  }, [options, isActive])

  //选择选项
  const onSelect = (item: MenuDataType) => {
    if (isActive(item.value as HeadingLevelType)) {
      state.editor.value?.commands.unsetHeading?.(item.value as HeadingLevelType)
    } else {
      state.editor.value?.commands.setHeading?.(item.value as HeadingLevelType)
    }
  }

  return (
    <Menu ref={menuRef} disabled={isDisabled} active={false} popover data={options} itemActive={item => isActive(item.value as HeadingLevelType)} shortcut={props.shortcut} popoverProps={{ width: props.popoverProps?.width, maxHeight: props.popoverProps?.maxHeight ?? 240, minWidth: props.popoverProps?.minWidth ?? 120, animation: props.popoverProps?.animation, arrow: props.popoverProps?.arrow, placement: props.popoverProps?.placement, trigger: props.popoverProps?.trigger, zIndex: props.popoverProps?.zIndex }} onSelect={onSelect} customLabel={option => <span style={{ fontSize: fontSizeMap[option.value as number] }}>{option.label}</span>}>
      {selectedData.label ?? ''}
    </Menu>
  )
}
