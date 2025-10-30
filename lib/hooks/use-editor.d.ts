import { StateType } from '../editor/wrapper';
/**
 * 上下文数据类型
 */
export type EditorContextType = {
    /**
     * 编辑器状态数据
     */
    state: StateType;
    /**
     * 编辑器是否禁用
     */
    disabled: boolean;
    /**
     * 编辑器内鼠标是否按下
     */
    isMouseDown: boolean;
    /**
     * 编辑器元素
     */
    el: HTMLDivElement | null;
    /**
     * 翻译函数
     */
    t: (key: string) => string;
    /**
     * 是否深色模式
     */
    dark: boolean;
};
export declare const EditorContext: import('react').Context<EditorContextType>;
export declare const useEditor: () => EditorContextType;
