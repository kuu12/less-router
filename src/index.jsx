import React from 'react';
import Router from './router';
import Route from './route';
import NotFound from './404';
import OneOf from './one-of';
import proxy from './proxy';
import matching from './path/match';
import { paramsFrom as params } from './path/regex';

const Routing = (...args) => {
    switch (typeof args[0]) {
        case 'function':
            return props => {
                const [Component] = args;

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

                return <Container Component={Component} {...props} />;
            };

        case 'object': {
            /**
             * support both <Routing><Child1 /><Child2 /></Routing>
             * and {Routing(<Child1 />, <Child2 />)}
             */
            const children = args[0].children || args;
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
