# less-router

### Less API, more graceful and flatter learning curve.

# Features

### No \<Link> tag, no \<Switch>, no black box hooks
You can get full control of all routing behaviors, by using javascript, a turing complete language, rather than an obscure DML.

### Cachable
Route components could be cachable by adding `autoCache` property. Route changes won't lead these component to be destroyed/remounting, but hidden/shown.

# Usage

- [Basic and URL parameters](#basic-and-url-parameters)
- [Using Cache](#using-cache)
- [Basename](#basename)

## Basic and URL parameters
```javascript
/****************************  index.jsx *****************************/
import { render } from 'react-dom';
import App from './app';

render(
  <App />,
  document.getElementById('root-element-id'),
);

/****************************  app.js  ******************************/
import { render } from 'react-dom';
import Routing from 'less-router';
import Order from './order';
import OrderDetail from './order-detail';

class App extends React.Component { // root component extends the Router component
  constructor(props) {
    console.log(typeof props.router);  // 'object'
    // props.router is passed by Routing HOC. 
    // It contains push, replace, back, forward and other useful methods.
    
    this.state.orders = [{
      id: '0001',
      products: 'sugar, salt',
    }];
  }

  render() {
    return (
      <div>
        <header>
          // this.props.router.push to enter a new path 
          // this.props.router.replace to replace current path 
          <button onClick={() => this.props.router.push('/order')}> 
            Orders
          </button>
        </header>
        <Order
          path="/order" // path pattern
          title="Order List" // auto sets document.title
          // other properties, will be straight pass into origin Order component.
          orders={this.state.orders}  
        />
        <OrderDetail
          // use URL parameter, extract from location.pathname and
          // pass into OrderDetail component as orderId property.
          path="/order/:orderId" 
          title="Order Detail"
          orders={this.state.orders}
        />
      </div>
    );
  }
};

export default Routing(App);
```
```javascript
/****************************  order.js  ******************************/
import Routing from 'less-router';

const Order = ({ orders = [], router }) => (
  <ul>
    {orders.map(order =>
      <li key={order.id}>
        Order ID: {order.id}
        <button onClick={() => router.push(`/order/${order.id}`)}>
          Detail
        </button>
      </li>
    )}
  </ul>
);

export default Routing(Order);
```
```javascript
/****************************  order-detail.js  ******************************/
import Routing from 'less-router';

const OrderDetail = ({ 
  orders = [], 
  orderId, // auto injected by the path declaration '/order/:orderId'
  router,
}) => (
  <div>
    Products: {
      (orders.find(order => order.id === orderId) || {}).products
    }
    <button onClick={() => history.back()}> // both history.back() and router.back() are available
      Back to orders
    </button>
  </div>
);

export default Routing(OrderDetail);
```

## Using Cache
Add an `autoCache` property.
```javascript
/****************************  app.js  ******************************/
  render() {
    ...
        <Order
          path="/order"
          title="Order List"
          orders={this.state.orders}
          autoCache // mark as cachable
        />
    ...
```

Now the `Order` component won't be remounting. But usually we make requests in `componentDidMount`, to invoked `componentDidMount` again, we should `clearCache` before entering a route.
```javascript
/****************************  app.js  ******************************/
  render() {
    ...
        <header>
          <button onClick={
            async () => {
              await this.props.router.clearCache('/order'); // cache clearing is asynchronous
              this.props.router.push('/order');
            }
          }>
            Orders
          </button>
        </header>
    ...
```
(p.s. Just for explanation, actually the `Order` component doesn't have a `componentDidMount` function in this case.)

## Basename
If your app is not deployed on root path, for example, `https://www.mydomain.com/my-app/`, you should specific the basename in the first routing component.

```javascript
/****************************  index.js  ******************************/
...
render(
  <App basename="my-app" />,
  document.getElementById('root-element-id'),
);
...
```
When using `this.props.router.push(pathname)` or `this.props.router.replace(pathname)`, just forget the basename, it will be added automatically.
