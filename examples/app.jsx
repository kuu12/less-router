// app.jsx
import { Router, Route } from 'less-router';
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
                    /**
                     * if you want to control routes inside Login,
                     * pass the router object as a parameter.
                     * Then you can use it in Login, 
                     * like `this.props.router.push('/order)`
                     */
                    router={this.router}
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
                {this.router.notFound() &&
                    <NotFound />
                }
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

