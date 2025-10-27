import { HljsLanguageType } from '@kaitify/core';
import { MenuDataType, MenuPropsType } from '../../props';
export type CodeBlockMenuPropsType = {
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 快捷键设置
     */
    shortcut?: (e: KeyboardEvent) => boolean;
};
export type CodeBlockLanguagesMenuPropsType = {
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 语言列表
     */
    languages?: HljsLanguageType[];
    /**
     * 浮层属性
     */
    popoverProps?: Omit<NonNullable<MenuPropsType['popoverProps']>, 'onShow' | 'onShowing' | 'onShown' | 'onHide' | 'onHiding' | 'onHidden'>;
    /**
     * 快捷键设置
     */
    shortcut?: {
        [key: MenuDataType['value']]: (e: KeyboardEvent) => boolean;
    };
};
