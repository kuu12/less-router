let PATH_START = 'path must starts with / . Current path is: ';
let PARENT_END = 'In nested routes, parent route must has a path ends with \'/\'. Current path is: ';
let PATH_NOT_FOUND = 'clearCache could not find this path, please check your typein: ';
let ROOT;

if ('development' === process.env.NODE_ENV) {
    ROOT = `Exclusive Routing couldn't be the root component.\nIncorrect: ${root_0()}\nCorrect: ${root_1()}`;

    if (navigator.language.startsWith('zh-')) {
        PATH_START = 'path必须以/开头，当前组件path为：';
        PARENT_END = '嵌套路由中的父组件path必须以/结尾，当前path为：';
        PATH_NOT_FOUND = 'clearCache找不到这个path，请检查拼写是否正确：';

        ROOT = `多选一的Routing不能作为根组件。\n错误的写法：${root_0()}\n正确的写法：${root_1()}`;
    }
}

function root_0() {
    return `
ReactDOM.render(
  <Routing>
    <FooRoute path="/foo" />
    <BarRoute path="/bar" />
  </Routing>,
  domElement,
);
`;
}
function root_1() {
    return `
const App = () => (
  <Routing>
    <FooRoute path="/foo" />
    <BarRoute path="/bar" />
  </Routing>
);
const AppRoute = Routing(App);
ReactDOM.render(
  <App />,
  domElement,
);
`;
}

export {
    PATH_START,
    PARENT_END,
    PATH_NOT_FOUND,
    ROOT,
};
