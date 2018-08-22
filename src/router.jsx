import React from 'react';
import proxy from './proxy';
import { locationState, addHeadRemoveTail } from './path/path';
import { regexFromPath } from './path/regex';
import { separate } from './path/query';
import { PATH_START, PATH_NOT_FOUND } from './message';

class Router extends React.Component {
    constructor(props) {
        super(props);
        this.registeredRoutes = {};
        this.cache = {};
        this.state = locationState(this.basename);
        proxy.router = this;
    }
    componentWillUnmount() {
        proxy.router = null;
    }

    get basename() {
        return this.props.basename
            ? addHeadRemoveTail(this.props.basename)
            : '';
    }
    get pathname() {
        return this.state.pathname === '/index.html' ?
            '/' : this.state.pathname;
    }

    push(pathname) {
        return this.__change__('pushState', pathname);
    }
    replace(pathname) {
        return this.__change__('replaceState', pathname);
    }
    __change__(method, pathname) {
        if (!pathname.startsWith('/')) {
            console.error(new Error(PATH_START + pathname));
        }
        const href = this.basename + pathname;

        if (!(method in history)) {
            return location.href = href;
        }
        history[method]({}, null, href);
        const pathnameAndSearch = separate(pathname);
        return this.__updateState__(pathnameAndSearch);
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

    __updateState__(state) {
        const exec = resolve =>
            this.setState(state, resolve);

        return typeof Promise === 'function' ?
            new Promise(exec) : exec();
    }

    clearCache(path, callback) {
        if (!path.startsWith('/')) {
            throw new Error(PATH_START + path);
        }
        if (!(path in this.registeredRoutes)) {
            console.warn(new Error(PATH_NOT_FOUND + path));
        }
        delete this.cache[regexFromPath(path)];
        const exec = resolve => this.forceUpdate(resolve);
        return typeof Promise === 'function'
            ? new Promise(exec)
            : exec(callback);
    }

    render() {
        const { Component, ...rest } = this.props;
        delete rest.basename;
        return <Component router={this} {...rest} />;
    }

    toJSON() {
        return {};
    }
}

window.addEventListener('popstate', () => {
    if (!proxy.router) return;
    proxy.router.__updateState__(
        locationState(proxy.router.basename)
    );
});

export default Router;
