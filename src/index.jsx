import React from 'react';
import Router from './router';
import Route from './route';
import NotFound from './404';
import OneOf from './one-of';
import proxy from './proxy';
import { ROOT } from './message';
import A from './a';
import { match } from './path/match';
import { paramsFrom as params } from './path/regex';

const Routing = arg => {
    switch (typeof arg) {
        case 'function':
            return function (props) {
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

                return <Container Component={arg} {...props} />;
            };

        case 'object':
            if (!proxy.router) throw new Error(ROOT);

            return <OneOf>{arg.children}</OneOf>;
    }
};
export default Routing;
export {
    Routing,
    Router,
    Route,
    NotFound,
    OneOf,
    A,
    match,
    params,
};
Object.assign(Routing, {
    Routing,
    Router,
    Route,
    NotFound,
    OneOf,
    A,
    match,
    params,
});
