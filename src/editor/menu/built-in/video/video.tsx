import React, { useMemo, useRef, useState } from 'react'
import { file as DapFile } from 'dap-util'
import { useEditor } from '@/hooks/use-editor'
import { SetVideoOptionType } from '@kaitify/core'
import { Tabs, TabsPropsType } from '@/core/tabs'
import { Checkbox } from '@/core/checkbox'
import { Button } from '@/core/button'
import { Icon } from '@/core/icon'
import { MenuRefType } from '../../props'
import Menu from '../../menu'
import { VideoMenuPropsType } from './props'
import styles from './style.module.less'
import classNames from 'classnames'

export default function VideoMenu({
  tabs = {
    data: ['remote', 'upload'],
    default: 'remote'
  },
  ...props
}: VideoMenuPropsType) {
  const { state, t, dark } = useEditor()

  //菜单组件实例
  const menuRef = useRef<MenuRefType | null>(null)
  //远程视频数据
  const [remoteData, setRemoteData] = useState<SetVideoOptionType>({
    src: '',
    autoplay: false
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
  }, [tabs])
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

  //选择本地视频
  const fileChange = async (e: React.ChangeEvent) => {
    const file = (e.currentTarget as HTMLInputElement).files?.[0]
    if (!file) {
      return
    }
    const url = typeof props.customUpload == 'function' ? await props.customUpload(file) : await DapFile.dataFileToBase64(file)
    if (!url) {
      return
    }
    state.editor.value?.commands.setVideo?.({
      src: url,
      width: typeof props.width == 'number' ? `${props.width}px` : props.width,
      autoplay: remoteData.autoplay
    })
    menuRef.current?.hidePopover()
  }
  //插入远程视频
  const insert = async () => {
    if (!remoteData.src) {
      return
    }
    state.editor.value?.commands.setVideo?.({
      src: remoteData.src,
      width: typeof props.width == 'number' ? `${props.width}px` : props.width,
      autoplay: remoteData.autoplay
    })
    menuRef.current?.hidePopover()
  }

  return (
    <Menu
      ref={menuRef}
      disabled={isDisabled}
      active={false}
      popover
      popoverProps={{ width: props.popoverProps?.width ?? 300, maxHeight: props.popoverProps?.maxHeight, minWidth: props.popoverProps?.minWidth, animation: props.popoverProps?.animation, arrow: props.popoverProps?.arrow, placement: props.popoverProps?.placement, trigger: props.popoverProps?.trigger, zIndex: props.popoverProps?.zIndex }}
      customPopover={
        <Tabs defaultValue={tabs.default} data={tabData}>
          {current => (
            <>
              {current === 'remote' && (
                <div
                  className={classNames(styles['kaitify-video-remote'], {
                    [styles['kaitify-dark']]: dark
                  })}
                >
                  <input value={remoteData.src} onChange={e => setRemoteData(oldValue => ({ ...oldValue, src: e.target.value }))} placeholder={t('视频地址')} type='url' />
                  <div className={styles['kaitify-video-remote-footer']}>
                    <Checkbox checked={remoteData.autoplay} onChange={v => setRemoteData(oldValue => ({ ...oldValue, autoplay: v }))} label={t('是否自动播放')} />
                    <Button onClick={insert} disabled={!remoteData.src}>
                      {t('插入')}
                    </Button>
                  </div>
                </div>
              )}
              {current === 'upload' && (
                <div className={styles['kaitify-video-upload']}>
                  <div className={styles['kaitify-video-upload-wrapper']}>
                    <input type='file' accept='video/*' onChange={fileChange} />
                    <Icon name='kaitify-icon-upload' />
                  </div>
                  <div className={styles['kaitify-video-upload-footer']}>
                    <Checkbox checked={remoteData.autoplay} onChange={v => setRemoteData(oldValue => ({ ...oldValue, autoplay: v }))} label={t('是否自动播放')} />
                  </div>
                </div>
              )}
            </>
          )}
        </Tabs>
      }
    >
      <Icon name='kaitify-icon-video' />
    </Menu>
  )
}
