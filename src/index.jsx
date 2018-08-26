import React from 'react';
import Router from './router';
import Route from './route';
import NotFound from './404';
import OneOf from './one-of';
import proxy from './proxy';
import matching from './path/match';
import { ROOT } from './message';
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
            if (!proxy.router) {
                throw new Error(ROOT);
            }
            const { children } = arg;
            return <OneOf>{children}</OneOf>;
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
