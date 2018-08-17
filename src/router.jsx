import React from 'react';
import state from './state';
import { getPathname, regexFromPath } from './path';
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
        this.setState({
            __pathname__: getPathname(Basename.get()),
        });
    }

    pathname() {
        const pathname = this.state.__pathname__ ||
            getPathname(Basename.get());

        return pathname === '/index.html'
            ? '/'
            : pathname;
    }

    clearCache(path, callback) {
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
