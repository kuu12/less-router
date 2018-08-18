# less-router

### Less API, more graceful and flatter learning curve.

[![NpmVersion](https://img.shields.io/npm/v/less-router.svg)](https://www.npmjs.com/package/less-router)
[![npm](https://img.shields.io/npm/dt/less-router.svg)](https://www.npmjs.com/package/less-router)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/less-router@1.6.2.svg)](https://www.npmjs.com/package/less-router)

[中文 README](https://github.com/kuu12/less-router/blob/master/README.cn.md)

# Features

#### Simple API
Start using in 5 minutes.

#### Cachable
By adding `autoCache` property, Route changes won't destroy/remount component but hide/show it.

#### Support most features in *React Router V4*
Dynamic routing, recursive paths, no match (404), and other features.

#### Minimal
Less than 3KB(gzipped), while *React Router V4* takes 8KB.

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
<Component
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
import App from './app';
ReactDOM.render(
  <App />,
  document.querySelector('#root-id'),
);
```

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
  <App basename="/my-username/my-app" />,
  document.querySelector('#root-id'),
);
```
When using `props.router.push(pathname)` or `props.router.replace(pathname)`, just forget the basename, it will be added automatically.

## Props
*Less Router* reserve serveral props:
- **Input to wrapped `Component`:** `path` `title` `parentPath` `autoCache` `NotFound`
- **Inject to origin `Component`:** `router` `path` `pathname` and [URL parameters](#basic-and-url-parameters)

Other props will straightly pass into origin `Component`:
```javascript
<Component
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
<Component
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
import ChildComponent from './child';
const ParentComponent = ({ router, path, pathname }) => (
  <div>
    <ChildComponent
      parentPath={path}
      path="/child"
    />
    <button onClick={() => router.push(pathname + '/child')}>
      Show Child
    </button>
  </div>
);
export default Routing(ParentComponent);
```
Pass `props.path` into `parentPath` property, you will never need to write down this value manually.

```javascript
import Routing from 'less-router';
const ChildComponent = () => (
  <div>
  </div>
);
export default Routing(ChildComponent);
```

**NOTICE:** `ParentComponent`'s path **must** ends with `/`, otherwise it won't matches `/parent/child`. `ParentComponent` go missing and `ChildComponent` no longer exists.
```javascript
<ParentComponent
  path="/parent/" // Right
  // path = "/parent" // Wrong
/>
```
See previous section [Matching Rules](#matching-rules)

## Not Found
```javascript
<Component
  NotFound
  title="Not Found"
/>
```
`NotFound` also supports dynamic routing.
```javascript
const ParentComponent = ({ path }) => (
  <div>
    <ChildComponent
      NotFound
      title="Not Found"
      parentPath={path}
    />
  </div>
);
```

## Render First Matched Route

```javascript
<Purchased
  path="/movies/purchased"
/>
<Movie
  path="/movies/:title"
/>
```

Both `path` can match `https://www.example.com/movies/purchased`. But obviously, we only want to render the first route component. Let's make some changes.

```javascript
<Routing>
  <Purchased
    path="/movies/purchased"
  />
  <Movie
    path="/movies/:title"
  />
</Routing>
```

## API Reference

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
