# less-router

### Less API, more graceful and flatter learning curve.

## Features

#### No \<Link> tag, no \<Switch>, no black box hooks
You can fully and explicitly control all routing behaviors, by using javascript, a turing complete language, rather than an obscure DML.

#### Cachable


## Usage

### Basic
```javascript
// app.js
import { Router, Route } from 'less-router';
import Order from './order';
import OrderDetail from './order-detail';

const OrderRoute = Route(Order);
const OrderDetailRoute = Route(OrderDetail);

export default class App extends Router {
  constructor(props) {
    super(props);
    console.log(this.state); // { __pathname__: **current location.pathname** }
    console.log(typeof this.router); // 'object'
    
    this.state.orders = [{
      id: 'o0001',
      products: [{
        id: 'p0001',
        name: 'sugar',
      }];
    }];
  }
  
  componentDidMount() {
    let login = true;
    
    if(login) {
      this.router.replace('/order');
    } else {
      this.router.replace('/login');
    }
  }

  render() {
    return (
      <div>
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

// order.js
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

// order-detail.js
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
