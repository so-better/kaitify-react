import { useMemo, useRef, useState } from 'react'
import { SetLinkOptionType, UpdateLinkOptionType } from '@kaitify/core'
import { useEditor } from '@/hooks/use-editor'
import { Checkbox } from '@/core/checkbox'
import { Button } from '@/core/button'
import { Icon } from '@/core/icon'
import { MenuRefType } from '../../props'
import Menu from '../../menu'
import { LinkMenuPropsType } from './props'
import styles from './style.module.less'

export default function LinkMenu(props: LinkMenuPropsType) {
  const { state, t } = useEditor()

  //菜单组件实例
  const menuRef = useRef<MenuRefType | null>(null)
  //链接数据
  const [formData, setFormData] = useState<SetLinkOptionType>({
    href: '',
    text: '',
    newOpen: false
  })
  //更新链接数据
  const [updateData, setUpdateData] = useState<UpdateLinkOptionType>({
    href: '',
    newOpen: false
  })

  //是否激活
  const isActive = useMemo(() => {
    return !!state.editor.value?.commands.getLink?.()
  }, [state.editor])
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
    if (state.editor.value.commands.hasLink?.() && !isActive) {
      return true
    }
    if (state.editor.value.commands.hasCodeBlock?.()) {
      return true
    }
    return props.disabled ?? false
  }, [state.editor, props.disabled])

  //浮层显示
  const menuShow = () => {
    const linkNode = state.editor.value?.commands.getLink?.()
    if (linkNode) {
      setUpdateData({
        href: linkNode.marks!.href as string,
        newOpen: linkNode.marks!.target == '_blank'
      })
    } else {
      setFormData({
        href: '',
        text: '',
        newOpen: false
      })
    }
  }
  //插入链接
  const insert = async () => {
    if (!formData.href) {
      return
    }
    if (state.editor.value?.selection.collapsed()) {
      if (!formData.text) {
        return
      }
      state.editor.value.commands.setLink?.({
        href: formData.href,
        text: formData.text,
        newOpen: formData.newOpen
      })
    } else {
      state.editor.value?.commands.setLink?.({
        href: formData.href,
        newOpen: formData.newOpen
      })
    }
    menuRef.current?.hidePopover()
  }
  //更新链接
  const update = async () => {
    if (!updateData.href) {
      return
    }
    state.editor.value?.commands.updateLink?.({
      href: updateData.href,
      newOpen: updateData.newOpen
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
        <div className={styles['kaitify-link']}>
          {isActive ? (
            // 修改链接
            <>
              <input value={updateData.href} onChange={e => setUpdateData(oldValue => ({ ...oldValue, href: e.target.value }))} placeholder={t('链接地址')} type='url' />
              <div className={styles['kaitify-link-footer']}>
                <Checkbox checked={updateData.newOpen} onChange={v => setUpdateData(oldValue => ({ ...oldValue, newOpen: v }))} label={t('新窗口打开')} />
                <Button onClick={update} disabled={!updateData.href}>
                  {t('更新')}
                </Button>
              </div>
            </>
          ) : (
            // 插入链接
            <>
              {state.editor.value?.selection.collapsed() && <input value={formData.text} onChange={e => setFormData(oldValue => ({ ...oldValue, text: e.target.value }))} placeholder={t('链接文字')} type='text' />}
              <input value={formData.href} onChange={e => setFormData(oldValue => ({ ...oldValue, href: e.target.value }))} placeholder={t('链接地址')} type='url' />
              <div className={styles['kaitify-link-footer']}>
                <Checkbox checked={formData.newOpen} onChange={v => setFormData(oldValue => ({ ...oldValue, newOpen: v }))} label={t('新窗口打开')} />
                <Button onClick={insert} disabled={!formData.href || (state.editor.value?.selection.collapsed() && !formData.text)}>
                  {t('插入')}
                </Button>
              </div>
            </>
          )}
        </div>
      }
    >
      <Icon name='kaitify-icon-link' />
    </Menu>
  )
}

{
  /* <template>
  <Menu ref="menuRef" :disabled="isDisabled" :active="isActive" popover :popover-props="{ width: popoverProps?.width ?? 300, maxHeight: popoverProps?.maxHeight, minWidth: popoverProps?.minWidth, animation: popoverProps?.animation, arrow: popoverProps?.arrow, placement: popoverProps?.placement, trigger: popoverProps?.trigger, zIndex: popoverProps?.zIndex }" @popover-show="menuShow">
    <Icon name="kaitify-icon-link" />
    <template #popover>
      <div class="kaitify-link">
        <!-- 修改链接 -->
        <template v-if="isActive">
          <input v-model.trim="updateData.href" :placeholder="t('链接地址')" type="url" />
          <div class="kaitify-link-footer">
            <Checkbox v-model="updateData.newOpen" :label="t('新窗口打开')" />
            <Button @click="update" :disabled="!updateData.href">{{ t('更新') }}</Button>
          </div>
        </template>
        <!-- 插入链接 -->
        <template v-else>
          <input v-if="state.editor?.selection.collapsed()" v-model.trim="formData.text" :placeholder="t('链接文字')" type="text" />
          <input v-model.trim="formData.href" :placeholder="t('链接地址')" type="url" />
          <div class="kaitify-link-footer">
            <Checkbox v-model="formData.newOpen" :label="t('新窗口打开')" />
            <Button @click="insert" :disabled="!formData.href || (state.editor?.selection.collapsed() && !formData.text)">{{ t('插入') }}</Button>
          </div>
        </template>
      </div>
    </template>
  </Menu>
</template>
<script setup lang="ts">

</script>
<style src="./style.less" scoped></style> */
}
