import React from 'react';
import cache from './cache';
import config from './config';

class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.router = {
            basename: basename =>
                config.basename = basename,

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
                    this.setState(
                        { __pathname__: config.basename + location.pathname },
                        resolve,
                    )
                ),

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
