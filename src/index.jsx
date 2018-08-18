import React from 'react';
import Router from './router';
import Route from './route';
import NotFound from './404';
import state from './state';
import Matching from './match';
import * as pathUtil from './path';

const Routing = (...args) => {
    switch (typeof args[0]) {
        case 'function':
            return props => {
                const [Component] = args;

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

        case 'object': {
            const children = args[0].children
                ? [].concat(args[0].children) // Both object and array transform to array.
                : args;

            let found = false;

            return children.filter(child => {
                const { parentPath, path } = child.props;
                const { match, cached } = Matching(parentPath, path);

                if (found) {
                    return !match && cached;
                } else {
                    if (match) found = match;
                    return match || cached;
                }
            });
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
