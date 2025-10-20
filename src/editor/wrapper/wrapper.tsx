import { Editor, Selection } from "@kaitify/core";
import { ReactNode, useEffect, useRef, useState } from "react";
import { data } from "dap-util";
import classNames from "classnames";
import { Teleport } from "@/core/teleport";
import { WrapperPropsType } from "./props";
import styles from "./style.module.less"
import { WrapperContext, WrapperContextType } from "../../hooks/use-wrapper-context";

/**
 * 编辑器编辑区域组件
 */
export default function Wrapper(props: WrapperPropsType) {
  //dom
  const elRef = useRef<HTMLDivElement | null>(null)
  //编辑器实例
  const editor = useRef<Editor | null>(null)
  //编辑器响应式光标对象
  const [selection, setSelection] = useState<Selection>(new Selection())
  //是否编辑器内部修改值
  const [internalModification, setInternalModification] = useState<boolean>(false)
  //是否鼠标按下
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)

  //渲染插槽
  const renderSlot = (value?: ReactNode | ((props: WrapperContextType) => ReactNode)) => {
    if (typeof value === 'function') {
      return value({
        editor: editor.current,
        selection: selection,
        disabled: props.disabled ?? false,
        isMouseDown: isMouseDown
      })
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
      onChange: (v) => {
        setInternalModification(true)
        props.onChange?.(v)
      },
      onSelectionUpdate(selection) {
        setSelection(() => {
          const newSel = new Selection()
          newSel.start = selection.start
          newSel.end = selection.end
          return newSel
        })
        props.onSelectionUpdate?.apply(this, [selection])
      },
    })
    props.onCreated?.(editor.current)
  }

  //监听编辑器的值
  useEffect(() => {
    if (editor.current) {
      //内部改变
      if (internalModification) {
        setInternalModification(false)
      }
      //外部改变，进行视图更新
      else {
        editor.current.review(props.value ?? '').then(() => {
          if (!props.disabled && props.autofocus) {
            editor.current?.setSelectionAfter()
            editor.current?.updateRealSelection()
          }
        })
      }
    }
  }, [props.value])

  //监听以下属性变化，对编辑器进行更新
  useEffect(
    () => {
      if (editor.current) {
        editor.current.setEditable(props.disabled ?? false)
        editor.current.setDark(props.dark ?? false)
        editor.current.allowCopy = props.allowCopy ?? true
        editor.current.allowCut = props.allowCut ?? true
        editor.current.allowPaste = props.allowPaste ?? true
        editor.current.allowPasteHtml = props.allowPasteHtml ?? false
        editor.current.priorityPasteFiles = props.priorityPasteFiles ?? false
      }
    }, [props.disabled, props.dark, props.allowCopy, props.allowCut, props.allowPaste, props.allowPasteHtml, props.priorityPasteFiles]
  )

  //创建编辑器
  useEffect(() => {
    createEditor()
  }, [elRef.current])

  return <WrapperContext.Provider value={{
    editor: editor.current,
    selection: selection,
    disabled: props.disabled ?? false,
    isMouseDown: isMouseDown
  }}>
    <>
      {/* before */}
      {!!props.appendBeforeTo ? <Teleport to={props.appendBeforeTo}>
        {renderSlot(props.before)}
      </Teleport > : renderSlot(props.before)}
      {/* 编辑区域 */}
      <div ref={elRef} className={classNames(styles['kaitify-border'], props.className)} style={props.style} onMouseDown={() => setIsMouseDown(true)} onMouseUp={() => setIsMouseDown(false)} />
      {/* after */}
      {!!props.appendAfterTo ? <Teleport to={props.appendAfterTo}>
        {renderSlot(props.after)}
      </Teleport > : renderSlot(props.after)}
      {/* 插槽 */}
      {renderSlot(props.children)}
    </>
  </WrapperContext.Provider >

}