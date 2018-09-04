import React from 'react';
import proxy from './proxy';
import { addHeadRemoveTail, separate } from './path/helper';
import { regexFrom } from './path/regex';
import { PATH_START, PATH_NOT_FOUND } from './message';

class Router extends React.Component {
    constructor(props) {
        super(props);
        this.registry = {};
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
        return this.state.pathname === this.htmlFile ?
            '/' : this.state.pathname;
    }
    get htmlFile() {
        return 'htmlFile' in this.props ?
            this.props.htmlFile : '/index.html';
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
        if (!(path in this.registry)) {
            console.warn(new Error(PATH_NOT_FOUND + path));
        }
        delete this.cache[regexFrom(path)];
        return promiseAndCallback(resolve => {
            this.forceUpdate(resolve);
        }, cb);
    }

    render() {
        const { Component, ...rest } = this.props;
        delete rest.basename;
        return <Component router={this} {...rest} />;
    }
}

const locationState = (basename) => ({
    pathname: decodeURIComponent(
        location.pathname.replace(
            new RegExp(`^${basename}`), ''
        ) || '/'
    ),
    search: location.search,
});

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
