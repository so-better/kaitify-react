import { Editor, KNodeMarksType, KNodeRenderOptionType } from '@kaitify/core';
import { default as React, ReactNode } from 'react';
export declare const ATTR_MAP: Record<string, string>;
/**
 * 替换 attrs 的属性名为 React 识别的形式
 */
export declare const normalizeAttrs: (attrs: KNodeMarksType) => KNodeMarksType;
/**
 * 生成ReactNode
 */
export declare const createReactNode: (options: KNodeRenderOptionType) => React.ReactElement<{
    style: import('@kaitify/core').KNodeStylesType;
    key: number;
}, string | React.JSXElementConstructor<any>>;
/**
 * 创建ReactNode数组
 */
export declare const createReactNodes: (editor: Editor) => ReactNode[];
