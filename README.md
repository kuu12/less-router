# less-router

### Less API, more graceful and flatter learning curve.

# Features

#### No `<Link>` tag, no `<Switch>`, no black box hooks
You can get full control of all routing behaviors, by using javascript, a turing complete language, rather than an obscure DML.

#### Cachable
By adding `autoCache` property, Route changes won't destroy/remounting component but hide/show it.

#### Support most features in *React Router V4*
Dynamic routing, recursive paths, no match (404), and other features.

#### Minimal
less than 3KB(gzipped), while *React Router V4* takes 7KB.

# Installation
```shell
npm install --save less-router
```

# Usage

- [Basic and URL parameters](#basic-and-url-parameters)
- [Change Route](#change-route)
- [Matching Rules](#matching-rules)
- [Basename](#basename)
- [Using Cache](#using-cache)
- [Dynamic Routing](#dynamic-routing)
- [Not Found](#not-found)

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
Root component doesn't need path property.
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

> About Query String: query string is not part of `location.pathname`, *Less Router* would do nothing on it.
> If you want to deal with it, see [https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript](https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript)

## Basename
If your app deploys on `https://www.freehost.com/my-username/my-app/`, you should specific the basename in the first routing component.

```javascript
ReactDOM.render(
  <App basename="/my-username/my-app" />,
  document.querySelector('#root-id'),
);
```
When using `this.props.router.push(pathname)` or `this.props.router.replace(pathname)`, just forget the basename, it will be added automatically.

## Using Cache
Add an `autoCache` property.
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

## Dynamic Routing
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

## Not Found
```javascript
<Component
  NotFound
  title="Not Found"
/>
```
*NotFound* also supports dynamic routing.
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
