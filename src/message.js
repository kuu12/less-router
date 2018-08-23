let message;

const en = {
    PATH_START: 'path must starts with / . Current path is: ',
    PARENT_END: 'In nested routes, parent route must has a path ends with \'/\'. Current path is: ',
    PATH_NOT_FOUND: 'clearCache could not find this path, please check your typein: ',
};

const zh = {
    PATH_START: 'path必须以/开头，当前组件path为：',
    PARENT_END: '嵌套路由中的父组件path必须以/结尾，当前path为：',
    PATH_NOT_FOUND: 'clearCache找不到这个path，请检查拼写是否正确：',
};

if ('production' === process.env.NODE_ENV) {
    message = en;
} else {
    message = navigator.language.startsWith('zh-') ? zh : en;
}

export const {
    PATH_START,
    PARENT_END,
    PATH_NOT_FOUND,
} = message;
