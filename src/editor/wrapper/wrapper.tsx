import { Editor } from '@kaitify/core'
import { forwardRef, ReactNode, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { data } from 'dap-util'
import classNames from 'classnames'
import { translate } from '@/locale'
import { Teleport } from '@/core/teleport'
import { WrapperContext } from '@/hooks/use-wrapper-context'
import { StateType, WrapperPropsType, WrapperRefType } from './props'
import styles from './style.module.less'

/**
 * 编辑器编辑区域组件
 */
const Wrapper = forwardRef<WrapperRefType, WrapperPropsType>((props, ref) => {
  //dom
  const elRef = useRef<HTMLDivElement | null>(null)
  //编辑器实例
  const editor = useRef<Editor | undefined>(undefined)
  //是否编辑器内部修改值
  const [internalModification, setInternalModification] = useState<boolean>(false)
  //是否鼠标按下
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  //编辑器更新标记
  const [updateKey, setUpdateKey] = useState<number>(0)
  //编辑器响应式对象
  const state = useMemo<StateType>(() => {
    return {
      editor: {
        value: editor.current
      },
      selection: {
        value: editor.current?.selection
      }
    }
  }, [updateKey, props.locale, editor.current])

  //渲染插槽
  const renderSlot = (value?: ReactNode | ((props: StateType) => ReactNode)) => {
    if (typeof value === 'function') {
      return value(state)
    }
    return value
  }

  //创建编辑器
  const createEditor = async () => {
    if (!elRef.current || editor.current || data.get(elRef.current, 'kaitify-init')) {
      return
    }
    editor.current = await Editor.configure({
      el: elRef.current,
      value: props.value ?? '',
      placeholder: props.placeholder,
      dark: props.dark,
      editable: !props.disabled,
      autofocus: props.autofocus,
      allowCopy: props.allowCopy,
      allowCut: props.allowCut,
      allowPaste: props.allowPaste,
      allowPasteHtml: props.allowPasteHtml,
      priorityPasteFiles: props.priorityPasteFiles,
      textRenderTag: props.textRenderTag,
      blockRenderTag: props.blockRenderTag,
      emptyRenderTags: props.emptyRenderTags,
      extraKeepTags: props.extraKeepTags,
      extensions: [...(props.extensions ?? [])],
      formatRules: props.formatRules,
      onDomParseNode: props.onDomParseNode,
      onPasteKeepMarks: props.onPasteKeepMarks,
      onPasteKeepStyles: props.onPasteKeepStyles,
      onPasteText: props.onPasteText,
      onPasteHtml: props.onPasteHtml,
      onPasteImage: props.onPasteImage,
      onPasteVideo: props.onPasteVideo,
      onPasteFile: props.onPasteFile,
      onDetachMentBlockFromParent: props.onDetachMentBlockFromParent,
      onBeforePatchNodeToFormat: props.onBeforePatchNodeToFormat,
      onInsertParagraph: props.onInsertParagraph,
      onDeleteComplete: props.onDeleteComplete,
      onKeydown: props.onKeydown,
      onKeyup: props.onKeyup,
      onFocus: props.onFocus,
      onBlur: props.onBlur,
      onBeforeUpdateView: props.onBeforeUpdateView,
      onAfterUpdateView: props.onAfterUpdateView,
      onChange: v => {
        setInternalModification(true)
        props.onChange?.(v)
      },
      onSelectionUpdate(selection) {
        setUpdateKey(oldValue => oldValue + 1)
        props.onSelectionUpdate?.apply(this, [selection])
      }
    })
    props.onCreated?.(editor.current)
  }

  useImperativeHandle(ref, () => ({
    elRef,
    state
  }))

  //监听编辑器的值
  useEffect(() => {
    if (editor.current) {
      //内部改变
      if (internalModification) {
        setInternalModification(false)
        setUpdateKey(oldValue => oldValue + 1)
      }
      //外部改变，进行视图更新
      else {
        editor.current.review(props.value ?? '').then(() => {
          if (!props.disabled && props.autofocus) {
            editor.current?.setSelectionAfter()
            editor.current?.updateRealSelection()
            setUpdateKey(oldValue => oldValue + 1)
          }
        })
      }
    }
  }, [props.value])

  //监听以下属性变化，对编辑器进行更新
  useEffect(() => {
    if (editor.current) {
      editor.current.setEditable(props.disabled ?? false)
      editor.current.setDark(props.dark ?? false)
      editor.current.allowCopy = props.allowCopy ?? true
      editor.current.allowCut = props.allowCut ?? true
      editor.current.allowPaste = props.allowPaste ?? true
      editor.current.allowPasteHtml = props.allowPasteHtml ?? false
      editor.current.priorityPasteFiles = props.priorityPasteFiles ?? false
      setUpdateKey(oldValue => oldValue + 1)
    }
  }, [props.disabled, props.dark, props.allowCopy, props.allowCut, props.allowPaste, props.allowPasteHtml, props.priorityPasteFiles])

  //创建编辑器
  useEffect(() => {
    createEditor()
  }, [elRef.current])

  return (
    <WrapperContext.Provider
      value={{
        state,
        isMouseDown,
        disabled: props.disabled ?? false,
        el: elRef.current,
        locale: props.locale ?? 'zh-CN',
        t: (key: string) => translate(props.locale ?? 'zh-CN', key)
      }}
    >
      <>
        {/* before */}
        {!!props.appendBeforeTo ? <Teleport to={props.appendBeforeTo}>{renderSlot(props.before)}</Teleport> : renderSlot(props.before)}
        {/* 编辑区域 */}
        <div ref={elRef} className={classNames(styles['kaitify-border'], props.className)} style={props.style} onMouseDown={() => setIsMouseDown(true)} onMouseUp={() => setIsMouseDown(false)} />
        {/* after */}
        {!!props.appendAfterTo ? <Teleport to={props.appendAfterTo}>{renderSlot(props.after)}</Teleport> : renderSlot(props.after)}
        {/* 插槽 */}
        {renderSlot(props.children)}
      </>
    </WrapperContext.Provider>
  )
})

export default Wrapper
