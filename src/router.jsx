import React from 'react';
import cache from './cache';
import state from './state';
import { getPathname } from './path';

class Router extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        if (props.basename)
            this.basename(props.basename);

        window.addEventListener(
            'popstate',
            () => this.__updatePathnameState__(),
        );

        Object.setPrototypeOf(state.routerProxy, this);
    }

    basename(basename) {
        if (typeof basename === 'undefined')
            return state.basename;

        if (state.basename)
            console.warn('已设置过basename，请勿重复设置');

        state.basename =
            basename && !basename.startsWith('/')
                ? `/${basename}`
                : basename;
    }

    push(path) {
        return 'pushState' in history
            ? (
                history.pushState({}, null, state.basename + path),
                this.__updatePathnameState__()
            )
            : location.href = state.basename + path;
    }

    replace(path) {
        return 'replaceState' in history
            ? (
                history.replaceState({}, null, state.basename + path),
                this.__updatePathnameState__()
            )
            : location.href = state.basename + path;
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
                __pathname__: getPathname(state.basename),
            }, resolve)
        );
    }

    pathname() {
        return this.state.__pathname__ ||
            getPathname(state.basename);
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
