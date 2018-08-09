# less-router

### 更少的API，更多的优雅和更简单地学习。

[README in English](https://github.com/kuu12/less-router/blob/master/README.md)

# 特性

#### 没有`<Link>`组件, 没有`<Switch>`, 没有黑匣子般的钩子
You can get full control of all routing behaviors, by using javascript, a turing complete language, rather than an obscure DML.

#### 可缓存
加入`autoCache`属性后, 组件将不会被销毁或重新绑定，而是隐藏或显示。

#### 支持*React Router V4*的大多数特性
动态路由、递归路由、404页面等等。

#### 极限体积
Gzip压缩后仅有3KB，而*React Router V4*是7KB.

# 安装
```shell
npm install --save less-router
```

# 使用

- [基本使用及URL参数](#基本使用及URL参数)
- [改变路由](#改变路由)
- [匹配规则](#匹配规则)
- [Basename](#Basename)
- [使用缓存](#使用缓存)
- [动态路由](#动态路由)
- [404页面](#404页面)
- [API参考](#API参考)

## 基本使用及URL参数
用Routing函数包装路由组件，以及项目根组件
```javascript
import Routing from 'less-router';
const Component = ({ router, nickname }) => (
  <div>
    Hello, {nickname}
  </div>
);
export default Routing(Component);
```
使用已包装的组件
```javascript
<Component
  // Notice the ':nickname' part, it will be treated as a variable.
  path="/somepath/:nickname" 
  title="Welcome"
/>
```
根组件也需要包装
```javascript
import Routing from 'less-router'
class App extends React.Component {
}
export default Routing(App);
```
根组件不需要传入`path`属性
```javascript
import App from './app';
ReactDOM.render(
  <App />,
  document.querySelector('#root-id'),
);
```

## 改变路由
```javascript
import Routing from 'less-router';
const Component = ({ router }) => (
  <div>
    <button onClick={() => router.push('/home')}>
      Move to Home
    </button>
    <button onClick={() => router.replace('/home')}>
      Redirect to Home
    </button>
    <button onClick={() => router.back()}>
      Back
    </button>
    <button onClick={() => router.forward()}>
      Forward
    </button>
  </div>
);
export default Routing(Component);
```
`router`属性是由`Routing`自动注入的。

## 匹配规则

`/users` 匹配
- [x] `/users`
- [x] `/users/`
- [ ] `/users/123`

`/users/` 匹配
- [x] `/users`
- [x] `/users/`
- [x] `/users/123`

> **关于Query String:** query string 不属于`location.pathname`，*Less Router*会忽略它。
> 如果你需要从query string中获取参数，参见 [https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript](https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript)

## Basename
假如你的项目准备部署在`https://www.freehost.com/my-username/my-app/`，你需要在**根组件**的basename属性中声明

```javascript
ReactDOM.render(
  <App basename="/my-username/my-app" />,
  document.querySelector('#root-id'),
);
```
之后使用`this.props.router.push(pathname)`或者`this.props.router.replace(pathname)`时，路由会自动为你加上basename

## 使用缓存
加入`autoCache`属性
```javascript
<Component
  path="/list"
  title="A Long List"
  autoCache
/>
```

Now the component won't be remounting. But usually we make requests in `componentDidMount`, to invoked `componentDidMount` again, we should `clearCache` before entering a route.
```javascript
await this.props.router.clearCache('/somepath');
this.props.router.push('/somepath');
```

## 动态路由
```javascript
import Routing from 'less-router';
import ChildComponent from './child';
const ParentComponent = ({ path }) => (
  <div>
    <ChildComponent
      parentPath={path}
      path="/child"
    />
  </div>
);
export default Routing(ParentComponent);
```

```javascript
import Routing from 'less-router';
const ChildComponent = () => (
  <div>
  </div>
);
export default Routing(ChildComponent);
```

## 404页面
```javascript
<Component
  NotFound
  title="未找到该路径"
/>
```
`NotFound`支持动态路由，可以使该组件只在某个路径下时才触发
```javascript
const ParentComponent = ({ path }) => (
  <div>
    <ChildComponent
      NotFound
      title="未找到该路径"
      parentPath={path}
    />
  </div>
);
```

## API参考

### Routing

A higher-order component. Receving a component and return a new component with route features.
The initial rendered component will be treated as root route.

### Component With Route Features

Wrapped Component settings.

- path
- title
- parentPath
- autoFocus
- basename
- NotFound

### Props injected to Origin Component

- router
- path
- pathname
- URL Parameters
- Passthrough props

### Property `router`

- push
- replace
- clearCache
- back
- forward
- go
- pathname
