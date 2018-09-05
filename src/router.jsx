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

        this.point = history.length;
        if (history.replaceState)
            history.replaceState({ i: this.point }, '');

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
        return this.__change__(1, pathname, cb);
    }
    replace(pathname, cb) {
        return this.__change__(0, pathname, cb);
    }
    __change__(step, pathname, cb) {
        if (!pathname.startsWith('/')) {
            console.error(new Error(PATH_START + pathname));
        }
        const href = this.basename + pathname;
        if (!history.replaceState) {
            location.href = href;
            return cb && cb();
        }
        history[step ? 'pushState' : 'replaceState'](
            { i: history.state.i + step }, '', href);
        return this.__updateState__(separate(pathname), cb);
    }

    back(pathname, cb) {
        return !history.state || (history.state.i > this.point)
            ? this.go(-1, cb)
            : this.replace(pathname, cb);
    }
    forward(pathname, cb) {
        return !history.state || (history.state.i < history.length)
            ? this.go(1, cb)
            : this.push(pathname, cb);
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
        const { Component, ...props } = this.props;
        delete props.basename;
        return <Component router={this} {...props} />;
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

const promiseAndCallback = (exec, callback) => window.Promise
    ? new Promise(exec).then(callback)
    : exec(callback);

const queue = [];
window.addEventListener('popstate', () => {
    if (proxy.router) proxy.router.__updateState__(
        locationState(proxy.router.basename),
        queue.pop()
    );
});

export default Router;
