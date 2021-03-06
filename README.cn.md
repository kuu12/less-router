# Less Router &middot; [![NpmVersion](https://img.shields.io/npm/v/less-router.svg)](https://www.npmjs.com/package/less-router) [![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/less-router.svg)](https://bundlephobia.com/result?p=less-router) [![npm](https://img.shields.io/npm/dt/less-router.svg)](https://www.npmjs.com/package/less-router) [![Travis (.org)](https://img.shields.io/travis/kuu12/less-router.svg)](https://travis-ci.org/kuu12/less-router/)

### 更少的API，更多的优雅和更简单地学习。

[README in English](https://github.com/kuu12/less-router/blob/master/README.md)

[在线演示](https://kuu12.github.io/less-router/)

# 特性

### 简单的API
花3-5分钟即可开始使用。

### 可缓存
加入`autoCache`属性后，组件将不会被卸载或重新加载，而是隐藏或显示。

### 支持 *React Router V4* 的大多数特性
动态路由、递归路由、404页面等等。

### 极限体积
Gzip压缩后仅有3kB，而 *React Router V4* 是8kB。

### 稳定
所有特性都经过自动化测试。

# 安装
```shell
npm install --save less-router
```

# 使用

- [基本使用及URL参数](#基本使用及url参数)
- [改变路由](#改变路由)
- [匹配规则](#匹配规则)
- [Basename](#basename)
- [Props传递](#props传递)
- [使用缓存](#使用缓存)
- [动态路由](#动态路由)
- [404页面](#404页面)
- [只渲染第一个匹配的路由](#只渲染第一个匹配的路由)
- [API参考](#api参考)

## 基本使用及URL参数
用Routing函数包装路由组件，以及项目根组件
```javascript
import Routing from 'less-router';
const Component = ({ router, nickname }) => (
  <div>
    你好, {nickname}
  </div>
);
export default Routing(Component);
```
使用已包装的组件
```javascript
import ComponentRoute from './component';
// ...
<ComponentRoute
  // nickname会从URL取值并注入到组件的属性中
  path="/somepath/:nickname"
  title="欢迎"
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
import AppRoute from './app';
ReactDOM.render(
  <AppRoute />,
  document.querySelector('#root-id'),
);
```

> 兼容 ***React Hot Loader***:
> `react-hot-loader`和`less-router`都需要对根组件进行包装。此时，`Routing`**必须**放在`hot(module)`外面。
> ```javascript
> import Routing from 'less-router';
> import { hot } from 'react-hot-loader';
>
> class App extends React.Component {
> }
> export default Routing(hot(module)(App)); // 正常运作
> // export default hot(module)(Routing(App)); // 会报错
> ```

## 改变路由
```javascript
import Routing from 'less-router';
const Component = ({ router }) => (
  <div>
    <button onClick={() => router.push('/home')}>
      进入 Home
    </button>
    <button onClick={() => router.replace('/home')}>
      重定向到 Home
    </button>
    <button onClick={() => router.back()}>
      返回
    </button>
    <button onClick={() => router.forward()}>
      前进
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

`/users/:id` 匹配
- [ ] `/users`
- [ ] `/users/`
- [x] `/users/123`

> **关于Query String：** query string 不属于`location.pathname`，*Less Router* 会忽略它。
> 如果你需要从query string中获取参数，参见 [https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript](https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript)

## Basename
假如你的项目准备部署在`https://www.freehost.com/my-username/my-app/`，你需要在**根组件**的`basename`属性中声明

```javascript
ReactDOM.render(
  <AppRoute basename="/my-username/my-app" />,
  document.querySelector('#root-id'),
);
```
之后使用`props.router.push(pathname)`或者`props.router.replace(pathname)`时，路由会自动为你加上basename。

## Props传递
*Less Router* 保留数个props
- **传给已包装的组件：** `path` `title` `parentPath` `autoCache` `notFound`
- **注入到原始组件：** `router` `path` `pathname` 以及 [URL参数](#基本使用及url参数)

其他props会直接传给原始组件:
```javascript
<ComponentRoute
  path="/somepath"
  title="Example"
  aaa="111"
  bbb="222"
/>
```
```javascript
import Routing from 'less-router';
const Component = ({ aaa, bbb }) => (
  <div>
    {aaa} {bbb}
  </div>
);
export default Routing(Component);
```

## 使用缓存
加入`autoCache`属性
```javascript
<ComponentRoute
  path="/list"
  title="一个长列表"
  autoCache
/>
```
改变路由后，这个组件不会被销毁。再次回到此路由时，也不会触发`componentDidMount`。
如果你在`componentDidMount`里写了网络请求的逻辑，想再次进入此路由时刷新页面，那在此之前先清除缓存。

```javascript
// 现在在其他路由中
await router.clearCache('/list'); // 清除'/list'路由的缓存。注意这是一个异步操作
router.push('/list'); // 再次进入'/list'路由
```

## 动态路由
```javascript
import Routing from 'less-router';
import ChildRoute from './child';
const Parent = ({ router, path, pathname }) => (
  <div>
    <ChildRoute
      parentPath={path}
      path="/child"
    />
    <button onClick={() => router.push(pathname + '/child')}>
      Show Child
    </button>
  </div>
);
export default Routing(Parent);
```

将`props.path`传入`parentPath`即可，无需手动输入`parentPath`的值。

```javascript
import Routing from 'less-router';
const Child = () => (
  <div>
  </div>
);
export default Routing(Child);
```

**留意:** `ParentRoute`的`path`**必须**以`/`结尾，否则进入`/parent/child`路由后，`ParentRoute`会消失，`ChildRoute`也跟着消失。
```javascript
<ParentRoute
  path="/parent/" // 正确
//path = "/parent" // 错误
/>
```
复习 [匹配规则](#匹配规则)

## 404页面
```javascript
<ComponentRoute
  notFound
  title="未找到该路径"
/>
```
`notFound`支持动态路由，可以使该组件只在某个路径下时才触发
```javascript
import Routing from 'less-router';
import ChildRoute from './child';
const Parent = ({ path }) => (
  <div>
    <ChildRoute
      notFound
      title="未找到该路径"
      parentPath={path}
    />
  </div>
);
export default Routing(Parent);
```

## 只渲染第一个匹配的路由

```javascript
<PurchasedRoute
  path="/movies/purchased"
/>
<MovieRoute
  path="/movies/:title"
/>
```

两个`path`都能匹配`https://www.example.com/movies/purchased`。但显然我们只想匹配第一个路由，

这时可以使用分组功能，同一分组只有第一个匹配的组件会被渲染。

```javascript
<PurchasedRoute
  path="/movies/purchased"
  group="123"
/>
<MovieRoute
  path="/movies/:title"
  group="123"
/>
```

## API参考
查阅 [高级指南](https://github.com/kuu12/less-router/blob/master/GUIDE.md).

### Routing

A higher-order component. Receving a component and return a new component with route features.
The initial rendered component will be treated as root route.

### Component With Route Features

Wrapped Component settings.

- path
- title
- parentPath
- autoCache
- basename
- notFound

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
