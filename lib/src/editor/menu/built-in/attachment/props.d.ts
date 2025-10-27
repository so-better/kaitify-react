import { MenuPropsType } from '../../props';
export type AttachmentMenuPropsType = {
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * tabs配置
     */
    tabs?: {
        data: ('remote' | 'upload')[];
        default: 'remote' | 'upload';
    };
    /**
     * 浮层属性
     */
    popoverProps?: Omit<NonNullable<MenuPropsType['popoverProps']>, 'onShow' | 'onShowing' | 'onShown' | 'onHide' | 'onHiding' | 'onHidden'>;
    /**
     * 附件logo图片地址
     */
    iconUrl?: string;
    /**
     * 自定义上传方法
     */
    customUpload?: (file: File) => string | Promise<string>;
};
