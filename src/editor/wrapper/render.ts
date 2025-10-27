import { Editor, getNodeRenderOptions, KNodeMarksType, KNodeRenderOptionType } from '@kaitify/core'
import React, { ReactNode } from 'react'

//原生属性和react属性对照表
export const ATTR_MAP: Record<string, string> = {
  class: 'className',
  for: 'htmlFor',
  maxlength: 'maxLength',
  minlength: 'minLength',
  readonly: 'readOnly',
  tabindex: 'tabIndex',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  contenteditable: 'contentEditable',
  autofocus: 'autoFocus',
  enctype: 'encType',
  novalidate: 'noValidate',
  formnovalidate: 'formNoValidate',
  defaultchecked: 'defaultChecked',
  defaultvalue: 'defaultValue',
  frameborder: 'frameBorder',
  allowfullscreen: 'allowFullScreen',
  autoplay: 'autoPlay',
  controlslist: 'controlsList',
  crossorigin: 'crossOrigin',
  playsinline: 'playsInline',
  acceptcharset: 'acceptCharset',
  spellcheck: 'spellCheck',
  srcdoc: 'srcDoc',
  viewbox: 'viewBox',
  preserveaspectratio: 'preserveAspectRatio'
}

/**
 * 替换 attrs 的属性名为 React 识别的形式
 */
export const normalizeAttrs = (attrs: KNodeMarksType) => {
  const newAttrs: KNodeMarksType = {}
  for (const key in attrs) {
    if (!Object.prototype.hasOwnProperty.call(attrs, key)) continue
    const newKey = ATTR_MAP[key] ?? key
    newAttrs[newKey] = attrs[key]
  }
  return newAttrs
}

/**
 * 生成ReactNode
 */
export const createReactNode = (options: KNodeRenderOptionType) => {
  const children: ReactNode[] = []
  if (options.children && options.children.length) {
    options.children.forEach(item => {
      children.push(createReactNode(item))
    })
  } else if (options.textContent) {
    children.push(options.textContent)
  }
  options.attrs = normalizeAttrs(options.attrs)
  if (Object.prototype.hasOwnProperty.call(options.attrs, 'contentEditable')) {
    options.attrs['suppressContentEditableWarning'] = 'true'
  }
  return React.createElement(
    options.tag,
    {
      key: options.key,
      ...options.attrs,
      style: options.styles
    },
    children.length === 0 ? undefined : children
  )
}

/**
 * 创建ReactNode数组
 */
export const createReactNodes = (editor: Editor): ReactNode[] => {
  return editor.stackNodes.map(item => createReactNode(getNodeRenderOptions(editor, item)))
}
