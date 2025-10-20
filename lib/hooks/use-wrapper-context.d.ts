import { Editor, Selection } from '@kaitify/core';
/**
 * 上下文数据类型
 */
export type WrapperContextType = {
    /**
     * 编辑器实例对象
     */
    editor: Editor | null;
    /**
     * 光标对象（响应的）
     */
    selection: Selection;
    /**
     * 编辑器是否禁用
     */
    disabled: boolean;
    /**
     * 编辑器内鼠标是否按下
     */
    isMouseDown: boolean;
};
export declare const WrapperContext: import('react').Context<WrapperContextType>;
export declare const useWrapperContext: () => WrapperContextType;
