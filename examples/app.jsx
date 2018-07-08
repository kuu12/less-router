// app.jsx
import { Router } from 'less-router';
import Cookie from 'js-cookie';
import Login from './login';
import Order from './order';
import Item from './item';

class App extends Router {
    construtor(props) {
        this.router.basename('/my-app');

        if (!Cookie.get('authToken'))
            this.router.replace('/login');
    }

    render() {
        return (
            <div>
                <Login
                    path="/login"
                    title="Login"
                />
                <Order
                    path="/order/:orderId"
                    title="Order Detail"
                    cachable
                />
                <Item
                    path="/order/:orderId/:itemId"
                    title="Item Detail"
                />
            </div>
        )
    }
}


// order.jsx
import React from 'react';
import { Route } from 'less-router';
class Order extends React.Component {
    render() {
        return (
            <div>
                order ID is {this.props.orderId}
            </div>
        );
    }
}

export default Route(Order);

