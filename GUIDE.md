# Advance Guide
For basic usage, see [README](https://github.com/kuu12/less-router/blob/master/README.md).

## Injected Props
### router in props
- `router.push(pathname, callback)`: Returns promise (If supported, depends on your environment). `location.pathname` change is synchronous, howerver React rerendering is asynchronous. After all, callback will be invoked, and promise will be resolved.
- `router.replace(pathname, callback)`: Similiar to `router.push(pathname, callback)` but it use `history.replaceState` instead of `history.pushState`.
- `router.forward(callback)` and `router.go(step, callback)`: Similiar to `history.forward` and `history.go`, additionanally have a callback argument and return promise if supported.
- `router.back(expectedPathname, callback)`: Similiar to `history.back`. By passing `expectedPathname` argument, while there is no more history, router will navigate to the `expectedPathname`.
- `router.clearCache(path, callback)`: Clear cached route component which is under the `path`. Cache clearing is asynchronous, because it will trigger rerendering of React.
- `router.basename`: Read-only.
- `router.pathname`: Read-only. Similiar to `location.pathname`, but there are 3 difference: 1. It removes initial basename. 2. Decoded by `decodeURIComponent`. 3. `''` and `/index.html` will be transformed into `/`.

#### Rarely Used Methods
- `router.match([parentPath], path, [caseSensitive])`:
- `router.params([parentPath], path)`:
- `router.sync(404)`:

### path, pathname in props
Be careful, `path` and `pathname` have almost nothing to do with `router.pathname` and `location.pathname`. These two properties are used for dynamic routing.

- `path`: In nested routes, for example, `<AaaRoute path="/aaa/" />` contains `<BbbRoute parentPath={props.path} path="/bbb/" />` that contains `<CccRoute parentPath={props.path} path="/ccc" />`, path in the **origin** `Bbb` component would be `/aaa/bbb`. It concats properties `parentPath` and `path` on the **wrapped** `BbbRoute` component.
- `pathname`: While `location.pathname` is `/user/12345/share`, in `<ComponentRoute path="/user/:id/" />`, `pathname` will be `/user/12345`.

### parameters

### Show Hover Hyperlink on Status Bar

```javascript
<button onClick={() => {
  console.log('do something...');
  router.push('/profile');
}}>
  My Profile
</button>
```

```javascript
import Routing, { A } from 'less-router';
<A
  onClick={() => {
    console.log('do something...');
  }}
  href="/profile"
>
  My Profile
</A>
```

```javascript
<button onClick={() => {
  console.log('do something...');
  setTimeout(() => {
    console.log('do something asynchronous...');
    if(Math.random() < 0.5) {
      console.log('do nothing');
    } else {
      router.replace('/profile');
    }
  }, 1000);
}}>
  My Profile
</button>
```

```javascript
import Routing, { A } from 'less-router';
<A
  onClick={async () => {
    console.log('do something...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('do something asynchronous...');
    if(Math.random() < 0.5) {
      console.log('do nothing');
      return Promise.reject();
    }
  }}
  href="/profile"
  redirect
>
  My Profile
</A>
```
