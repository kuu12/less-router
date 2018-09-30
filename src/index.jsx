import React from 'react';
import Router from './router';
import Route from './route';
import NotFound from './404';
import proxy from './proxy';
import A from './a';

const Routing = Component => props => {
    let Container;
    if (!proxy.router)
        Container = Router;
    else if (
        props.notFound ||
        props.NotFound ||
        props.Notfound
    )
        Container = NotFound;
    else
        Container = Route;

    return <Container C_={Component} {...props} />;
};

export default Routing;
export { Routing, A };
Routing.Routing = Routing;
Routing.A = A;
