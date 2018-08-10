const zh = {
    PATH_MUST_STARTS_WITH_SLASH: 'path必须以/开头，当前组件path为：',
    PARENT_PATH_MUST_ENDS_WITH_SLASH: '嵌套路由中的父组件path必须以/结尾，当前path为：',
    BASENAME_HAS_BEEN_SET: '已设置过basename，请勿重复设置',
};

const en = {
    PATH_MUST_STARTS_WITH_SLASH: 'path must starts with \'/\'. Current path is: ',
    PARENT_PATH_MUST_ENDS_WITH_SLASH: 'In nested routes, parent route must has a path ends with \'/\'. Current path is: ',
    BASENAME_HAS_BEEN_SET: 'basename has been set. Please don\'t override it. ',
};

export const {
    PATH_MUST_STARTS_WITH_SLASH,
    PARENT_PATH_MUST_ENDS_WITH_SLASH,
    BASENAME_HAS_BEEN_SET,
} = navigator.language.startsWith('zh-') ? zh : en;
