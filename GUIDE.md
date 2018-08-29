# Advance Guide

For basic usage, see [README](https://github.com/kuu12/less-router/blob/master/README.md).

### router in props

- `router.push(pathname, callback)`: Returns promise (If supported, depends on your environment). `location.pathname` change is synchronous, and React rerendering is asynchronous. After all, callback will be invoked, and promise will be resolved. 
- `router.replace(pathname, callback)`: Similiar to `router.push(pathname, callback)` but it use `history.replaceState` instead of `history.pushState`.
- `router.back(callback)`, `router.forward(callback)`, `router.go(step, callback)`: Similiar to `history[same_name]`, additionanally have a callback argument and return promise if supported.
- `router.clearCache(path, callback)`: Clear cached route component which is under the `path`. Cache clearing is asynchronous, because it will trigger rerendering of React.
- `router.basename`: 
- `router.pathname`: 


### path, pathname in props

- `path`
- `pathname`


### 