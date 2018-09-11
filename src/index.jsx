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
        'notFound' in props ||
        'NotFound' in props ||
        'Notfound' in props
    )
        Container = NotFound;
    else
        Container = Route;

    return <Container Component={Component} {...props} />;
};

export default Routing;
export { Routing, A };
Object.assign(Routing, { Routing, A });
