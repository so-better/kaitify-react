import { ReactNode } from 'react';
export type TeleportPropsType = {
    /**
     * 目标容器
     */
    to?: string | HTMLElement;
    /**
     * 子元素
     */
    children?: ReactNode;
};
