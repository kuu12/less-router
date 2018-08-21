import React from 'react';
import state from './state';
import { pathname, addHeadRemoveTail } from './path/path';
import { regexFromPath } from './path/regex';
import { PATH_START, BASENAME, PATH_NOT_FOUND } from './message';

class Router extends React.Component {
    constructor(props) {
        super(props);

        if (props.basename) {
            if (state.basename)
                console.error(new Error(BASENAME));

            state.basename = addHeadRemoveTail(props.basename);
        }

        this.state = {};

        window.addEventListener(
            'popstate',
            () => this.__updatePathnameState__(),
        );

        Object.setPrototypeOf(state.routerProxy, this);
    }

    push(path) {
        if (!path.startsWith('/'))
            console.error(new Error(PATH_START + path));

        return 'pushState' in history
            ? (
                history.pushState({}, null, state.basename + path),
                this.__updatePathnameState__()
            )
            : location.href = state.basename + path;
    }

    replace(path) {
        if (!path.startsWith('/'))
            console.error(new Error(PATH_START + path));

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
        const exec = resolve =>
            this.setState({
                __pathname__: pathname(),
            }, resolve);
        return typeof Promise === 'function'
            ? new Promise(exec)
            : exec();
    }

    pathname() {
        const pathname = this.state.__pathname__ ||
            pathname();

        return pathname === '/index.html'
            ? '/'
            : pathname;
    }

    clearCache(path, callback) {
        if (!path.startsWith('/'))
            throw new Error(PATH_START + path);
        if (!(path in state.registeredRoutes))
            console.warn(new Error(PATH_NOT_FOUND + path));

        delete state.cache[regexFromPath(path)];
        const exec = resolve => this.forceUpdate(resolve);
        return typeof Promise === 'function'
            ? new Promise(exec)
            : exec(callback);
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
