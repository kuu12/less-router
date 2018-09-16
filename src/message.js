let PATH_START = 'path must starts with / . Current path is: ';
let PARENT_END = 'In nested routes, parent route must has a path ends with \'/\'. Current path is: ';
let PATH_NOT_FOUND = 'clearCache could not find this path, please check your typein: ';
let NOT_FOUND = '404 Not Found';

if (/^zh-/.test(navigator.language)) {
    NOT_FOUND = '404 找不到页面';

}


if ('development' == process.env.NODE_ENV) {

    if (/^zh-/.test(navigator.language)) {
        PATH_START = 'path必须以/开头，当前组件path为：';
        PARENT_END = '嵌套路由中的父组件path必须以/结尾，当前path为：';
        PATH_NOT_FOUND = 'clearCache找不到这个path，请检查拼写是否正确：';
    }
}

export {
    PATH_START,
    PARENT_END,
    PATH_NOT_FOUND,
    NOT_FOUND,
};
