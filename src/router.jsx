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
        queue.length = 0;
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

    push(pathname, cb) {
        return this.__change__('pushState', pathname, cb);
    }
    replace(pathname, cb) {
        return this.__change__('replaceState', pathname, cb);
    }
    __change__(method, pathname, cb) {
        if (!pathname.startsWith('/')) {
            console.error(new Error(PATH_START + pathname));
        }
        const href = this.basename + pathname;

        if (!(method in history)) {
            location.href = href;
            return cb();
        }
        history[method]({}, null, href);
        const pathnameAndSearch = separate(pathname);
        return this.__updateState__(pathnameAndSearch, cb);
    }

    back(cb) {
        return this.go(-1, cb);
    }
    forward(cb) {
        return this.go(1, cb);
    }
    go(step, cb) {
        return promiseAndCallback(resolve => {
            queue.unshift(resolve);
            history.go(step);
        }, cb);
    }

    __updateState__(state, cb) {
        return promiseAndCallback(resolve => {
            this.setState(state, resolve);
        }, cb);
    }

    clearCache(path, cb) {
        if (!path.startsWith('/')) {
            throw new Error(PATH_START + path);
        }
        if (!(path in this.registeredRoutes)) {
            console.warn(new Error(PATH_NOT_FOUND + path));
        }
        delete this.cache[regexFromPath(path)];
        return promiseAndCallback(resolve => {
            this.forceUpdate(resolve);
        }, cb);
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

const promiseAndCallback = (exec, callback) =>
    typeof window.Promise === 'function'
        ? new window.Promise(exec).then(callback)
        : exec(callback);

const queue = [];
window.addEventListener('popstate', () => {
    if (!proxy.router) return;
    const state = locationState(proxy.router.basename);
    const resolve = queue.pop();
    proxy.router.__updateState__(state, resolve);
});

export default Router;
