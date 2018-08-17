let message;

if (process.env.NODE_ENV !== 'production') {

    const zh = {
        PATH_START: 'path必须以/开头，当前组件path为：',
        PARENT_END: '嵌套路由中的父组件path必须以/结尾，当前path为：',
        BASENAME: '已设置过basename，请勿重复设置',
    };

    const en = {
        PATH_START: 'path must starts with \'/\'. Current path is: ',
        PARENT_END: 'In nested routes, parent route must has a path ends with \'/\'. Current path is: ',
        BASENAME: 'basename has been set. Please don\'t override it. ',
    };

    message = navigator.language.startsWith('zh-') ? zh : en;

} else {

    message = {
        PATH_START: '',
        PARENT_END: '',
        BASENAME: '',
    };
}

export const {
    PATH_START,
    PARENT_END,
    BASENAME,
} = message;
