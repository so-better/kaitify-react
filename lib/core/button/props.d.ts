import { ReactNode } from 'react';
/**
 * 按钮组件的属性类型
 */
export type ButtonPropsType = {
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 是否激活
     */
    active?: boolean;
    /**
     * 是否块级展示
     */
    block?: boolean;
    /**
     * 是否更大的按钮
     */
    large?: boolean;
    /**
     * 默认插槽
     */
    children?: ReactNode;
    /**
     * 点击
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
