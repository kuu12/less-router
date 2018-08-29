let message;

const en = {
    PATH_START: 'path must starts with / . Current path is: ',
    PARENT_END: 'In nested routes, parent route must has a path ends with \'/\'. Current path is: ',
    PATH_NOT_FOUND: 'clearCache could not find this path, please check your typein: ',
};
const en_dev = {
    ROOT: `Exclusive Routing couldn't be the root component.\nIncorrect: ${root_0()}\nCorrect: ${root_1()}`,
};

const zh = {
    PATH_START: 'path必须以/开头，当前组件path为：',
    PARENT_END: '嵌套路由中的父组件path必须以/结尾，当前path为：',
    PATH_NOT_FOUND: 'clearCache找不到这个path，请检查拼写是否正确：',
};
const zh_dev = {
    ROOT: `多选一的Routing不能作为根组件。\n错误的写法：${root_0()}\n正确的写法：${root_1()}`,
};

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

if ('production' === process.env.NODE_ENV) {
    message = en;
} else {
    message = navigator.language.startsWith('zh-')
        ? { ...zh, ...zh_dev }
        : { ...en, ...en_dev };
}

export const {
    PATH_START,
    PARENT_END,
    PATH_NOT_FOUND,
    ROOT,
} = message;
