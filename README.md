# less-router

## Usage

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
        price: '$1',
      }, {
        id: 'p0002',
        name: 'salt',
        price: '$2'
      }];
    }]
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
          path="/order/:orderId"
          title="Order Detail"
          orders={this.state.orders}
          router={this.router}
        />
      </div>
    );
  }
}

// order.js
import React from 'react';

export default class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  detail(id) {
    this.props.router.push(`/order/${id}`);
  }
  
  render() {
    const orders = this.props.orders || [];
    
    return (
      <ul>
        {orders.map(order =>
          <li key={order.id}>
            Order ID: {order.id}
            <button onClick={() => this.detail(order.id)}>
              Detail
            </button>
          </li>
        )}
      </ul>
    );
  }
}

// order-detai.js
```
