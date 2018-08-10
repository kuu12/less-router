import React from 'react';
import Router from './router';
import Route from './route';
import NotFound from './404';
import state from './state';
import __cache__ from './cache';
import * as __path__ from './path';

const Routing = Component => props => {
    if (!state.RootComponent)
        state.RootComponent = Component;

    const Container =
        state.RootComponent === Component
            ? Router
            : (
                'NotFound' in props ||
                'notFound' in props ||
                'Notfound' in props ||
                'NOT_FOUND' in props
            )
                ? NotFound
                : Route;

    return (
        <Container
            Component={Component}
            {...props}
        />
    );
};

const router = state.routerProxy;

export default Routing;
export {
    Routing,
    Router,
    router,
    Route,
    NotFound,
    state,
    __cache__,
    __path__,
};
