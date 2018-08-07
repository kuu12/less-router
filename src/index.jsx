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
            : 'NotFound' in props || '404' in props
                ? NotFound
                : Route;

    return (
        <Container
            Component={Component}
            {...props}
        />
    );
};

export default Routing;
export {
    Routing,
    Router,
    Route,
    NotFound,
    state,
    __cache__,
    __path__,
};
