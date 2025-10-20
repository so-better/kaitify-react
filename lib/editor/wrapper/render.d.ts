import { Editor, KNodeRenderOptionType } from '@kaitify/core';
import { default as React } from 'react';
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
export declare const createReactNodes: (editor: Editor) => React.ReactElement<{
    style: import('@kaitify/core').KNodeStylesType;
    key: number;
}, string | React.JSXElementConstructor<any>>[];
