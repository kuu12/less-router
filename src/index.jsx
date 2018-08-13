import React from 'react';
import Router from './router';
import Route from './route';
import NotFound from './404';
import state from './state';
import Matching from './match';
import * as pathUtil from './path';

const Routing = (...args) => {
    if (typeof args[0] !== 'function') {

        const children = args[0].children || args;

        return []
            .concat(children)
            .filter(child => {
                const { parentPath, path } = child.props;
                const { match, cached } = Matching(parentPath, path);
                return match || cached;
            });

    } else {

        const Component = args[0];
        return props => {
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
        }

    }
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
    pathUtil,
};
Object.assign(Routing, {
    Routing,
    Router,
    router,
    Route,
    NotFound,
    state,
    pathUtil,
});