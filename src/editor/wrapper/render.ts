import { Editor, getNodeRenderOptions, KNodeRenderOptionType } from '@kaitify/core'
import React, { ReactNode } from 'react'

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
export const createReactNodes = (editor: Editor) => {
  return editor.stackNodes.map(item => createReactNode(getNodeRenderOptions(editor, item)))
}
