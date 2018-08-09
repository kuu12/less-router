import React from 'react';
import cache from './cache';
import state from './state';
import { getPathname } from './path';
import Basename from './basename';

class Router extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        if (props.basename) Basename.set(props.basename);

        window.addEventListener(
            'popstate',
            () => this.__updatePathnameState__(),
        );

        Object.setPrototypeOf(state.routerProxy, this);
    }

    push(path) {
        return 'pushState' in history
            ? (
                history.pushState({}, null, Basename.get() + path),
                this.__updatePathnameState__()
            )
            : location.href = Basename.get() + path;
    }

    replace(path) {
        return 'replaceState' in history
            ? (
                history.replaceState({}, null, Basename.get() + path),
                this.__updatePathnameState__()
            )
            : location.href = Basename.get() + path;
    }

    back() {
        history.back();
    }
    forward() {
        history.forward();
    }
    go(step) {
        history.go(step);
    }

    __updatePathnameState__() {
        return new Promise(resolve =>
            this.setState({
                __pathname__: getPathname(Basename.get()),
            }, resolve)
        );
    }

    pathname() {
        return this.state.__pathname__ ||
            getPathname(Basename.get());
    }

    clearCache(path) {
        cache.delete(path);
        return new Promise(resolve =>
            this.forceUpdate(resolve)
        );
    }

    render() {
        const {
            basename: ignored,
            Component,
            ...rest
        } = this.props;

        return (
            <Component
                router={this}
                {...rest}
            />
        );
    }
}

export default Router;
