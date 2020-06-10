import React, { Component } from 'react';
import { Router } from './router';
import { Route, RouteInputProps } from './route';
import { NotFound } from './404';
import proxy from './proxy';

const Routing = (Component: React.ComponentType): React.FunctionComponent =>
    props => {
        let Container: React.ComponentClass;
        if (!proxy.router)
            Container = Router;
        else if (
            props.notFound ||
            props.NotFound ||
            props.Notfound
        )
            Container = NotFound;
        else
            Container = Route;

        return <Container C_={Component} {...props} />;
    };


export default Routing;
export { Routing };
Routing.Routing = Routing;
