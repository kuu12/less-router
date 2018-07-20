# less-router

### Less API, more graceful and flatter learning curve.

## Features

### No \<Link> tag, no \<Switch>, no black box hooks
You can get full control of all routing behaviors, by using javascript, a turing complete language, rather than an obscure DML.

### Cachable
Route components could be cachable by adding 'autoCache' property. Route changes won't lead these component to be destroyed/remounting, but hidden/shown.

## Usage

### Basic and URL parameters
```javascript
/****************************  app.js  ******************************/
import { Router, Route } from 'less-router';
import Order from './order';
import OrderDetail from './order-detail';

const OrderRoute = Route(Order);
const OrderDetailRoute = Route(OrderDetail);

export default class App extends Router { // Root component extends the Router class
  constructor(props) {
    super(props);
    console.log(typeof this.router); // 'object', created by Router class.
    
    this.state.orders = [{
      id: 'o0001',
      products: [{
        id: 'p0001',
        name: 'sugar',
      }];
    }];
  }

  render() {
    return (
      <div>
        <header>
          <button onClick={() => this.router.push('/order')}>
            Orders
          </button>
        </header>
        <OrderRoute
          path="/order"
          title="Order List"
          orders={this.state.orders}
          router={this.router}
        />
        <OrderDetailRoute
          path="/order/:orderId" // use URL parameter
          title="Order Detail"
          orders={this.state.orders}
          router={this.router}
        />
      </div>
    );
  }
};

/****************************  order.js  ******************************/
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

export default Order;

/****************************  order-detail.js  ******************************/
const OrderDetail = ({ 
  orders = [], 
  orderId, // auto injected by the path declaration '/order/:orderId'
  router, 
}) => (
  <div>
    Products: 
    <ul>
      {((orders
        .find(order => order.id === orderId) || {})
        .products || [])
        .map(product =>
          <li>
            {product.name}
          </li>
      )}
    </ul>
    <button onClick={() => history.back()}>
      Back to orders
    </button>
  </div>
);

export default OrderDetail;

```

### Using Cache
```javascript
/****************************  app.js  ******************************/
  render() {
    ...
        <OrderRoute
          path="/order"
          title="Order List"
          orders={this.state.orders}
          router={this.router}
          autoCache // mark as cachable
        />
    ...
```

Now the OrderRoute component won't be remounting. But usually we make requests in componentDidMount, to invoked componentDidMount again, we should clear cache before entering a route.
```javascript
/****************************  app.js  ******************************/
  render() {
    ...
        <header>
          <button onClick={
            async () => {
              await this.router.clearCache('/order'); // Cache clearing takes time, need to be await before next operation.
              this.router.push('/order');
            }
          }>
            Orders
          </button>
        </header>
    ...
```
