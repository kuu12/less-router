# Advance Guide
For basic usage, see [README](https://github.com/kuu12/less-router/blob/master/README.md).

## Injected Props
### router in props
- `router.push(pathname, callback)`: Returns promise (If supported, depends on your environment). `location.pathname` change is synchronous, howerver React rerendering is asynchronous. After all, callback will be invoked, and promise will be resolved. 
- `router.replace(pathname, callback)`: Similiar to `router.push(pathname, callback)` but it use `history.replaceState` instead of `history.pushState`.
- `router.back(callback)`, `router.forward(callback)`, `router.go(step, callback)`: Similiar to `history[same_name]`, additionanally have a callback argument and return promise if supported.
- `router.clearCache(path, callback)`: Clear cached route component which is under the `path`. Cache clearing is asynchronous, because it will trigger rerendering of React.
- `router.basename`: Read-only.
- `router.pathname`: Read-only. Similiar to `location.pathname`, but there are 3 difference: 1. It removes initial basename. 2. Decoded by `decodeURIComponent`. 3. `''` and `/index.html` will be transformed into `/`.

### path, pathname in props
Be careful, `path` and `pathname` have almost nothing to do with `router.pathname` and `location.pathname`. These two properties are used for dynamic routing. 

- `path`: In nested routes, for example, `<AaaRoute path="/aaa/" />` contains `<BbbRoute parentPath={props.path} path="/bbb/" />` that contains `<CccRoute parentPath={props.path} path="/ccc" />`, path in the **origin** `Bbb` component would be `/aaa/bbb`. It concats properties `parentPath` and `path` on the **wrapped** `BbbRoute` component.
- `pathname`: While `location.pathname` is `/user/12345/share`, in `<ComponentRoute path="/user/:id/" />`, `pathname` will be `/user/12345`.

### 