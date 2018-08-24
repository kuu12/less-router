import React from 'react';
import Router from './router';
import Route from './route';
import NotFound from './404';
import OneOf from './one-of';
import proxy from './proxy';
import matching from './path/match';
import { paramsFrom as params } from './path/regex';

const Routing = arg => {
    switch (typeof arg) {
        case 'function':
            return props => {
                let Container;
                if (!proxy.router)
                    Container = Router;
                else if (
                    'notFound' in props ||
                    'NotFound' in props ||
                    'Notfound' in props ||
                    'NOT_FOUND' in props
                )
                    Container = NotFound;
                else
                    Container = Route;

                return <Container Component={arg} {...props} />;
            };

        case 'object': {
            const { children, ...props } = arg;
            const Component = () => <OneOf>{children}</OneOf>;
            return proxy.router
                ? <Component />
                : <Router Component={Component} {...props} />;
        }
    }
};

export default Routing;
export {
    Routing,
    Router,
    Route,
    NotFound,
    OneOf,
    matching,
    params,
};
Object.assign(Routing, {
    Routing,
    Router,
    Route,
    NotFound,
    OneOf,
    matching,
    params,
});
