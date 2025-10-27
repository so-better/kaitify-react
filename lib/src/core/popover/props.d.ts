import { Instance } from '@popperjs/core';
import { ReactNode } from 'react';
/**
 * 浮层位置类型
 */
export type PopoverPlacementType = 'auto' | 'auto-start' | 'auto-end' | 'bottom-start' | 'bottom' | 'bottom-end' | 'top-start' | 'top' | 'top-end' | 'left-start' | 'left' | 'left-end' | 'right-start' | 'right' | 'right-end';
/**
 * 浮层组件属性类型
 */
export type PopoverPropsType = {
    /**
     * 浮层宽度
     */
    width?: string | number;
    /**
     * 浮层最小宽度
     */
    minWidth?: string | number;
    /**
     * 浮层最大高度
     */
    maxHeight?: string | number;
    /**
     * 浮层位置
     */
    placement?: PopoverPlacementType;
    /**
     * 是否显示三角形
     */
    arrow?: boolean;
    /**
     * 触发浮层的方式
     */
    trigger?: 'hover' | 'click' | 'custom';
    /**
     * 浮层显示动画
     */
    animation?: 'fade' | 'translate';
    /**
     * 浮层层级
     */
    zIndex?: number;
    /**
     * 显示延迟时间
     */
    delay?: number;
    /**
     * 是否禁用浮层
     */
    disabled?: boolean;
    /**
     * 目标元素插槽
     */
    refer: ReactNode;
    /**
     * 浮层内容插槽
     */
    children: ReactNode;
    /**
     * 浮层显示前触发的事件
     */
    onShow?: (el: Element) => void;
    /**
     * 浮层显示时触发的事件
     */
    onShowing?: (el: Element) => void;
    /**
     * 浮层显示后触发的事件
     */
    onShown?: (el: Element) => void;
    /**
     * 浮层隐藏前触发的事件
     */
    onHide?: (el: Element) => void;
    /**
     * 浮层隐藏时触发的事件
     */
    onHiding?: (el: Element) => void;
    /**
     * 浮层隐藏后触发的事件
     */
    onHidden?: (el: Element) => void;
};
/**
 * 浮层组件实例类型
 */
export type PopoverRefType = {
    visible: boolean;
    showPopover: () => void;
    hidePopover: () => void;
    popperInstance: React.MutableRefObject<Instance | undefined>;
    update: () => Promise<void>;
    realPlacement: PopoverPlacementType;
};
