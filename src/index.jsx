import React from 'react';
import Router from './router';
import Route from './route';
import NotFound from './404';
import OneOf from './one-of';
import state from './state';

const Routing = (...args) => {
    switch (typeof args[0]) {
        case 'function':
            return props => {
                const [Component] = args;

                if (!state.RootComponent)
                    state.RootComponent = Component;

                let Container;

                if (state.RootComponent === Component)
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

                return (
                    <Container
                        Component={Component}
                        {...props}
                    />
                );
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

const router = state.routerProxy;
export default Routing;
export {
    Routing,
    Router,
    router,
    Route,
    NotFound,
    OneOf,
    state,
};
Object.assign(Routing, {
    Routing,
    Router,
    router,
    Route,
    NotFound,
    OneOf,
    state,
});
