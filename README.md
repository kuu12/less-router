# less-router

### Less API, more graceful and flatter learning curve.

# Features

### No \<Link> tag, no \<Switch>, no black box hooks
You can get full control of all routing behaviors, by using javascript, a turing complete language, rather than an obscure DML.

### Cachable
Route components could be cachable by adding `autoCache` property. Route changes won't lead these component to be destroyed/remounting, but hidden/shown.

### Support most features in React Router V4
Dynamic routing, recursive paths, no match (404), and other features.

# Usage

- [Basic and URL parameters](#basic-and-url-parameters)
- [Matching Rules](#matching-rules)
- [Change Route](#change-route)
- [Using Cache](#using-cache)
- [Basename](#basename)

## Basic and URL parameters
Just wrap your root component and all route component.
```javascript
import Routing from 'less-router';
const Component = ({ router, nickname }) => (
  <div>
    ...
  </div>
);
export default Routing(Component);
```
And use the wrapped component.
```
<Component
  path="/somepath/:nickname
  title="Welcome"
/>
```

## Matching Rules

`/users` matches
- [x] `/users`
- [x] `/users/`
- [ ] `/users/123`

`/users/` matches
- [x] `/users`
- [x] `/users/`
- [x] `/users/123`

> About query string
> 
> Query string is not part of `location.pathname`, *Less Router* would do nothing on it.

> If you want to deal with it, see [https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript](https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript)

## Change route
```javascript
import Routing from 'less-router';
const Component = ({ router, nickname }) => (
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
  </div>
);
export default Routing(Component);
```

## Using Cache
Add an `autoCache` property.
```javascript
<Component
  path="/somepath"
  title="A Component"
  autoCache
/>
```

Now the component won't be remounting. But usually we make requests in `componentDidMount`, to invoked `componentDidMount` again, we should `clearCache` before entering a route.
```javascript
await this.props.router.clearCache('/somepath');
this.props.router.push('/somepath');
```

## Basename
If your app is not deployed on root path, for example, `https://www.freehost.com/my-username/my-app/`, you should specific the basename in the first routing component.

```javascript
render(
  <App basename="/my-username/my-app" />,
  document.getElementById('root-element-id'),
);
```
When using `this.props.router.push(pathname)` or `this.props.router.replace(pathname)`, just forget the basename, it will be added automatically.
