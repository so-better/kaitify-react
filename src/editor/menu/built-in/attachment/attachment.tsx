import React, { useMemo, useRef, useState } from 'react'
import { file as DapFile } from 'dap-util'
import { SetAttachmentOptionType, UpdateAttachmentOptionType } from '@kaitify/core'
import { Tabs, TabsPropsType } from '@/core/tabs'
import { Button } from '@/core/button'
import { Icon } from '@/core/icon'
import { useEditor } from '@/hooks/use-editor'
import Menu from '../../menu'
import { MenuRefType } from '../../props'
import { AttachmentMenuPropsType } from './props'
import styles from './style.module.less'

export default function AttachmentMenu({
  tabs = {
    data: ['remote', 'upload'],
    default: 'remote'
  },
  ...props
}: AttachmentMenuPropsType) {
  const { state, t } = useEditor()
  //菜单组件实例
  const menuRef = useRef<MenuRefType | null>(null)
  //远程附件数据
  const [remoteData, setRemoteData] = useState<Omit<SetAttachmentOptionType, 'icon'>>({
    url: '',
    text: ''
  })
  //更新附件数据
  const [updateData, setUpdateData] = useState<UpdateAttachmentOptionType>({
    url: '',
    text: ''
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
  //是否激活
  const isActive = useMemo(() => {
    return !!state.editor.value?.commands.getAttachment?.()
  }, [state.editor])
  //是否禁用
  const isDisabled = useMemo(() => {
    if (!state.editor.value?.selection.focused()) {
      return true
    }
    if (state.editor.value.commands.hasMath?.()) {
      return true
    }
    if (state.editor.value.commands.hasCodeBlock?.()) {
      return true
    }
    if (state.editor.value.commands.hasLink?.()) {
      return true
    }
    if (state.editor.value.commands.hasAttachment?.() && !isActive) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled, isActive])

  //浮层显示
  const menuShow = () => {
    const info = state.editor.value?.commands.getAttachmentInfo?.()
    if (info) {
      updateData.text = info.text
      updateData.url = info.url
    } else {
      remoteData.text = ''
      remoteData.url = ''
    }
  }
  //选择本地文件
  const fileChange = async (e: React.ChangeEvent) => {
    const file = (e.currentTarget as HTMLInputElement).files?.[0]
    if (!file || !state.editor.value) {
      return
    }
    const url = typeof props.customUpload == 'function' ? await props.customUpload(file) : await DapFile.dataFileToBase64(file)
    if (!url) {
      return
    }
    state.editor.value.commands.setAttachment?.({
      url: url,
      text: file.name || t('附件'),
      icon: props.iconUrl
    })
    menuRef.current?.hidePopover()
  }
  //插入远程附件
  const insert = async () => {
    if (!remoteData.url || !remoteData.text || !state.editor.value) {
      return
    }
    state.editor.value.commands.setAttachment?.({
      url: remoteData.url,
      text: remoteData.text,
      icon: props.iconUrl
    })
    menuRef.current?.hidePopover()
  }
  //更新远程附件
  const update = async () => {
    if (!updateData.url || !updateData.text || !state.editor.value) {
      return
    }
    state.editor.value.commands.updateAttachment?.({
      url: updateData.url,
      text: updateData.text
    })
    menuRef.current?.hidePopover()
  }

  return (
    <Menu
      ref={menuRef}
      disabled={isDisabled}
      active={isActive}
      popover
      popoverProps={{ width: props.popoverProps?.width ?? 300, maxHeight: props.popoverProps?.maxHeight, minWidth: props.popoverProps?.minWidth, animation: props.popoverProps?.animation, arrow: props.popoverProps?.arrow, placement: props.popoverProps?.placement, trigger: props.popoverProps?.trigger, zIndex: props.popoverProps?.zIndex, onShow: menuShow }}
      customPopover={
        isActive ? (
          <div className={styles['kaitify-attachment-update']}>
            <input value={updateData.text} onChange={e => setUpdateData(oldValue => ({ ...oldValue, text: e.target.value }))} placeholder={t('附件名称')} type='text' />
            <input value={updateData.url} onChange={e => setUpdateData(oldValue => ({ ...oldValue, url: e.target.value }))} placeholder={t('附件地址')} type='url' />
            <div className={styles['kaitify-attachment-update-footer']}>
              <Button onClick={update} disabled={!updateData.url || !updateData.text}>
                {t('更新')}
              </Button>
            </div>
          </div>
        ) : (
          <Tabs defaultValue={tabs.default} data={tabData}>
            {current => (
              <>
                {current === 'remote' && (
                  <div className={styles['kaitify-attachment-remote']}>
                    <input value={remoteData.text} onChange={e => setRemoteData(oldValue => ({ ...oldValue, text: e.target.value }))} placeholder={t('附件名称')} type='text' />
                    <input value={remoteData.url} onChange={e => setRemoteData(oldValue => ({ ...oldValue, url: e.target.value }))} placeholder={t('附件地址')} type='url' />
                    <div className={styles['kaitify-attachment-remote-footer']}>
                      <Button onClick={insert} disabled={!remoteData.url || !remoteData.text}>
                        {t('插入')}
                      </Button>
                    </div>
                  </div>
                )}
                {current === 'upload' && (
                  <div className={styles['kaitify-attachment-upload']}>
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
      <Icon name='kaitify-icon-attachment' />
    </Menu>
  )
}
