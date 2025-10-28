import { useEditor } from '@/hooks'
import { file as DapFile } from 'dap-util'
import { ImageMenuPropsType } from './props'
import React, { useMemo, useRef, useState } from 'react'
import { MenuRefType } from '../../props'
import { SetImageOptionType, UpdateImageOptionType } from '@kaitify/core'
import { Tabs, TabsPropsType } from '@/core/tabs'
import Menu from '../../menu'
import { Icon } from '@/core/icon'
import styles from './style.module.less'
import { Button } from '@/core/button'
import classNames from 'classnames'

export default function ImageMenu({
  tabs = {
    data: ['remote', 'upload'],
    default: 'remote'
  },
  ...props
}: ImageMenuPropsType) {
  const { state, t, dark } = useEditor()

  //菜单组件实例
  const menuRef = useRef<MenuRefType | null>(null)

  //远程图片数据
  const [remoteData, setRemoteData] = useState<Omit<SetImageOptionType, 'width'>>({
    src: '',
    alt: ''
  })
  //更新图片数据
  const [updateData, setUpdateData] = useState<UpdateImageOptionType>({
    src: '',
    alt: ''
  })

  //选项卡数据
  const tabData = useMemo<TabsPropsType['data']>(() => {
    return tabs.data.map(item => {
      return [
        {
          label: t('远程地址'),
          value: 'remote'
        },
        {
          label: t('本地上传'),
          value: 'upload'
        }
      ].find(v => v.value == item)!
    })
  }, [tabs.data])
  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
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
  //是否激活
  const isActive = useMemo(() => {
    return !!state.editor.value?.commands.getImage?.()
  }, [state.editor])

  //浮层显示
  const menuShowing = () => {
    const imageNode = state.editor.value?.commands.getImage?.()
    if (imageNode) {
      setUpdateData({
        src: imageNode.marks!.src as string,
        alt: (imageNode.marks!.alt as string) || ''
      })
    } else {
      setRemoteData({
        src: '',
        alt: ''
      })
    }
  }
  //选择本地图片
  const fileChange = async (e: React.ChangeEvent) => {
    const file = (e.currentTarget as HTMLInputElement).files?.[0]
    if (!file) {
      return
    }
    const url = typeof props.customUpload == 'function' ? await props.customUpload(file) : await DapFile.dataFileToBase64(file)
    if (!url) {
      return
    }
    state.editor.value?.commands.setImage?.({
      src: url,
      alt: file.name || t('图片'),
      width: typeof props.width == 'number' ? `${props.width}px` : props.width
    })
    menuRef.current?.hidePopover()
  }
  //插入远程图片
  const insert = async () => {
    if (!remoteData.src) {
      return
    }
    state.editor.value?.commands.setImage?.({
      src: remoteData.src,
      alt: remoteData.alt,
      width: typeof props.width == 'number' ? `${props.width}px` : props.width
    })
    menuRef.current?.hidePopover()
  }
  //更新图片
  const update = async () => {
    if (!updateData.src) {
      return
    }
    state.editor.value?.commands.updateImage?.({
      src: updateData.src,
      alt: updateData.alt
    })
    menuRef.current?.hidePopover()
  }

  return (
    <Menu
      ref={menuRef}
      disabled={isDisabled}
      active={isActive}
      popover
      popoverProps={{ width: props.popoverProps?.width ?? 300, maxHeight: props.popoverProps?.maxHeight, minWidth: props.popoverProps?.minWidth, animation: props.popoverProps?.animation, arrow: props.popoverProps?.arrow, placement: props.popoverProps?.placement, trigger: props.popoverProps?.trigger, zIndex: props.popoverProps?.zIndex, onShowing: menuShowing }}
      customPopover={
        isActive ? (
          <div
            className={classNames(styles['kaitify-image-update'], {
              [styles['kaitify-dark']]: dark
            })}
          >
            <input value={updateData.alt} onChange={e => setUpdateData(oldValue => ({ ...oldValue, alt: e.target.value }))} placeholder={t('图片名称')} type='text' />
            <input value={updateData.src} onChange={e => setUpdateData(oldValue => ({ ...oldValue, src: e.target.value }))} placeholder={t('图片地址')} type='url' />
            <div className={styles['kaitify-image-update-footer']}>
              <Button onClick={update} disabled={!updateData.src}>
                {t('更新')}
              </Button>
            </div>
          </div>
        ) : (
          <Tabs defaultValue={tabs.default} data={tabData}>
            {current => (
              <>
                {current === 'remote' && (
                  <div
                    className={classNames(styles['kaitify-image-remote'], {
                      [styles['kaitify-dark']]: dark
                    })}
                  >
                    <input value={remoteData.alt} onChange={e => setRemoteData(oldValue => ({ ...oldValue, alt: e.target.value }))} placeholder={t('图片名称')} type='text' />
                    <input value={remoteData.src} onChange={e => setRemoteData(oldValue => ({ ...oldValue, src: e.target.value }))} placeholder={t('图片地址')} type='url' />
                    <div className={styles['kaitify-image-remote-footer']}>
                      <Button onClick={insert} disabled={!remoteData.src}>
                        {t('插入')}
                      </Button>
                    </div>
                  </div>
                )}
                {current === 'upload' && (
                  <div
                    className={classNames(styles['kaitify-image-upload'], {
                      [styles['kaitify-dark']]: dark
                    })}
                  >
                    <input type='file' accept='*' onChange={fileChange} />
                    <Icon name='kaitify-icon-upload' />
                  </div>
                )}
              </>
            )}
          </Tabs>
        )
      }
    >
      <Icon name='kaitify-icon-image' />
    </Menu>
  )
}
