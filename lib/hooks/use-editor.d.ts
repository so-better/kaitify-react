import { StateType } from '../editor/wrapper';
import { LocaleType } from '../locale';
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
     * 语言环境
     */
    locale: LocaleType;
};
export declare const EditorContext: import('react').Context<EditorContextType>;
export declare const useEditor: () => EditorContextType;
