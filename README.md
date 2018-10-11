# Less Router &middot; [![NpmVersion](https://img.shields.io/npm/v/less-router.svg)](https://www.npmjs.com/package/less-router) [![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/less-router.svg)](https://bundlephobia.com/result?p=less-router) [![npm](https://img.shields.io/npm/dt/less-router.svg)](https://www.npmjs.com/package/less-router) [![Travis (.org)](https://img.shields.io/travis/kuu12/less-router.svg)](https://travis-ci.org/kuu12/less-router/)

Less Router is a minimal and fully functional router for React.
 [[中文文档]](https://github.com/kuu12/less-router/blob/master/README.cn.md) [[Live Demo]](https://kuu12.github.io/less-router/)

- **Simple API:** Start using in 5 minutes.
- **Cachable:** By adding `autoCache` property, Route changes won't make component unmount/remount but hide/show.
- **Support most features in *React Router V4*:** Dynamic routing, recursive paths, no match (404), and other features.
- **Minimal:** Less than 3kB(gzipped), while *React Router V4* takes 8kB.
- **Reliable:** All features have been tested.

# Installation
```shell
npm install --save less-router
```

# Usage

- [Basic and URL parameters](#basic-and-url-parameters)
- [Change Route](#change-route)
- [Matching Rules](#matching-rules)
- [Basename](#basename)
- [Props](#props)
- [Using Cache](#using-cache)
- [Dynamic Routing](#dynamic-routing)
- [Not Found](#not-found)
- [Render First Matched Route](#render-first-matched-route)
- [API Reference](#api-reference)

## Basic and URL parameters
Just wrap your route component and root component.
```javascript
import Routing from 'less-router';
const Component = ({ router, nickname }) => (
  <div>
    Hello, {nickname}
  </div>
);
export default Routing(Component);
```
And use the wrapped component.
```javascript
import ComponentRoute from './component';
// ...
<ComponentRoute
  // Notice the ':nickname' part, it will be treated as a variable.
  path="/somepath/:nickname"
  title="Welcome"
/>
```
Don't forget the root component.
```javascript
import Routing from 'less-router'
class App extends React.Component {
}
export default Routing(App);
```
Root component doesn't need `path` property.
```javascript
import AppRoute from './app';
ReactDOM.render(
  <AppRoute />,
  document.querySelector('#root-id'),
);
```

> Working with ***React Hot Loader***:
> Both `react-hot-loader` and `less-router` need to wrap the root component. `Routing` **should be** outside of `hot(module)`.
> ```javascript
> import Routing from 'less-router';
> import { hot } from 'react-hot-loader';
>
> class App extends React.Component {
> }
> export default Routing(hot(module)(App)); // Works well!
> // export default hot(module)(Routing(App)); // Got errors..
> ```

## Change route
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
Property `router` is automatically injected by `Routing`.

## Matching Rules

`/users` matches
- [x] `/users`
- [x] `/users/`
- [ ] `/users/123`

`/users/` matches
- [x] `/users`
- [x] `/users/`
- [x] `/users/123`

`/users/:id` matches
- [ ] `/users`
- [ ] `/users/`
- [x] `/users/123`

> **About Query String:** query string is not part of `location.pathname`, *Less Router* would do nothing on it.
> If you want to deal with it, see [https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript](https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript)

## Basename
If your app deploys on `https://www.freehost.com/my-username/my-app/`, you should specific the basename in the first routing component.

```javascript
ReactDOM.render(
  <AppRoute basename="/my-username/my-app" />,
  document.querySelector('#root-id'),
);
```
When using `props.router.push(pathname)` or `props.router.replace(pathname)`, just forget the basename, it will be added automatically.

## Props
*Less Router* reserve serveral props:
- **Input to wrapped `ComponentRoute`:** `path` `title` `parentPath` `autoCache` `notFound`
- **Inject to origin `Component`:** `router` `path` `pathname` and [URL parameters](#basic-and-url-parameters)

Other props will straightly pass into origin `Component`:
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

## Using Cache
Add an `autoCache` property.
```javascript
<ComponentRoute
  path="/list"
  title="A Long List"
  autoCache
/>
```
This component will keep alive. Route changes won't make it destroy or remount, that means `componentDidMount` just run once.
If you want to invoke `componentDidMount` again, use `clearCache`.

```javascript
// On other route.
await router.clearCache('/list'); // Cache clearing is asynchronous
router.push('/list'); // Enter list component again.
```

## Dynamic Routing
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
Pass `props.path` into `parentPath` property, you will never need to write down this value manually.

```javascript
import Routing from 'less-router';
const Child = () => (
  <div>
  </div>
);
export default Routing(Child);
```

**NOTICE:** `ParentRoute`'s path **must** ends with `/`, otherwise it won't matches `/parent/child`. `ParentRoute` go missing and `ChildRoute` no longer exists.
```javascript
<ParentRoute
  path="/parent/" // correct
  // path = "/parent" // incorrect
/>
```
See previous section [Matching Rules](#matching-rules)

## Not Found
```javascript
<ComponentRoute
  notFound
  title="Not Found"
/>
```
`notFound` also supports dynamic routing.
```javascript
import Routing from 'less-router';
import ChildRoute from './child';
const Parent = ({ path }) => (
  <div>
    <ChildRoute
      notFound
      title="Not Found"
      parentPath={path}
    />
  </div>
);
export default Routing(Parent);
```

## Render First Matched Route

```javascript
<PurchasedRoute
  path="/movies/purchased"
/>
<MovieRoute
  path="/movies/:title"
/>
```

Both of `path` match `https://www.example.com/movies/purchased`. But obviously, we only want to render the first route component.

Let's put them to the same group, only the first match route component will be rendered.

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

## API Reference
See [Advance Guide](https://github.com/kuu12/less-router/blob/master/GUIDE.md).

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
