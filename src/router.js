import React from 'react';
import cache from './cache';
import config from './config';
import { getPathname } from './path';

class Router extends React.Component {
    constructor(props) {
        if (Object
            .getPrototypeOf(config.routerProxy)
            .__updatePathnameState__
        ) throw new Error('请勿在一个应用中创建多个Router');

        super(props);
        this.state = {};
        this.router = {
            basename: basename => {
                if (typeof basename === 'undefined')
                    return config.basename;

                if (config.basename)
                    console.warn('已设置过basename，请勿重复设置');

                config.basename =
                    basename && !basename.startsWith('/')
                        ? `/${basename}`
                        : basename;
            },

            push: path => 'pushState' in history
                ? (
                    history.pushState({}, null, config.basename + path),
                    this.router.__updatePathnameState__()
                )
                : location.href = config.basename + path,

            replace: path => 'replaceState' in history
                ? (
                    history.replaceState({}, null, config.basename + path),
                    this.router.__updatePathnameState__()
                )
                : location.href = config.basename + path,

            back: () => history.back(),
            forward: () => history.forward(),
            go: step => history.go(step),

            __updatePathnameState__: () =>
                new Promise(resolve =>
                    this.setState({
                        __pathname__: getPathname(config.basename),
                    }, resolve)
                ),

            pathname: () =>
                this.state.__pathname__ ||
                getPathname(config.basename),

            clearCache: path => (
                cache.delete(path),
                new Promise(resolve =>
                    this.forceUpdate(resolve)
                )
            ),
        };
        window.addEventListener(
            'popstate',
            this.router.__updatePathnameState__,
        );

        Object.setPrototypeOf(config.routerProxy, this.router);
    }

    render() {
        const transform = child =>
            child instanceof Function
                ? child(this.router)
                : child;

        const { children } = this.props;

        return children instanceof Array
            ? children.map(transform)
            : transform(children);
    }
}

export default Router;
