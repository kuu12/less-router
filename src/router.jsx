import React from 'react';
import proxy from './proxy';
import { values, promiseAndCallback } from './compatibility';
import { locationState, addHeadRemoveTail, separate } from './path/helper';
import { match, params } from './path/tool';
import { PATH_START, PATH_NOT_FOUND } from './message';

class Router extends React.Component {
    constructor(props) {
        super(props);
        this.route = {};
        this.matching = {};
        this.cache = {};
        this.group = {};
        this[404] = {};

        this.state = locationState(this.basename);
        this.html = this.props.htmlFile || 'index.html';

        this.point = history.length;
        if (history.replaceState)
            history.replaceState({ i: this.point }, '');

        proxy.router = this;
        this.match = match;
        this.params = params;
    }
    componentWillUnmount() {
        proxy.router = null;
        queue.length = 0;
    }

    componentDidMount() {
        this.sync(404);
    }

    get basename() {
        return addHeadRemoveTail(this.props.basename || '');
    }
    get pathname() {
        return `/${this.html}` == this.state.pathname
            ? '/' : this.state.pathname;
    }

    push(pathname, cb) {
        return this.__change(1, pathname, cb);
    }
    replace(pathname, cb) {
        return this.__change(0, pathname, cb);
    }
    __change(step, pathname, cb) {
        if (!/^\//.test(pathname))
            console.error(new Error(PATH_START + pathname));

        const href = this.basename + pathname;
        if (!history.replaceState) {
            location.href = href;
            return cb && cb();
        }
        history[step ? 'pushState' : 'replaceState'](
            { i: history.state.i + step }, '', href);
        return this.__update(separate(pathname), cb);
    }

    back(pathname, cb) {
        return !pathname ||
            !history.state ||
            (history.state.i > this.point)
            ? this.go(-1, cb)
            : this.replace(pathname, cb);
    }
    forward(pathname, cb) {
        return !pathname ||
            !history.state ||
            (history.state.i < history.length)
            ? this.go(1, cb)
            : this.push(pathname, cb);
    }
    go(step, cb) {
        return promiseAndCallback(resolve => {
            queue.unshift(resolve);
            history.go(step);
        }, cb);
    }

    __update(state, cb) {
        return promiseAndCallback(resolve => {
            this.group = {};
            this.sync('route', state.pathname);
            this.setState(state, () => {
                this.sync(404);
                resolve();
            });
        }, cb);
    }

    sync(type, pathname) {
        values(this[type]).forEach(component => {
            component.exec(pathname);
        });
    }

    clearCache(path, cb) {
        if (!/^\//.test(path))
            throw new Error(PATH_START + path);

        const routes = values(this.cache)
            .filter(route => path == route.path);

        return promiseAndCallback(resolve => {
            if (routes.length) {
                routes.forEach(route => {
                    route.del('cache');
                });
                this.forceUpdate(resolve);
            } else {
                console.warn(new Error(PATH_NOT_FOUND + path));
                resolve();
            }
        }, cb);
    }

    render() {
        const { C_, ...props } = this.props;
        delete props.basename;
        delete props.htmlFile;

        return <C_ {...props} router={this} />;
    }
}

const queue = [];
window.addEventListener('popstate', () => {
    if (proxy.router) proxy.router.__update(
        locationState(proxy.router.basename),
        queue.pop()
    );
});

export default Router;
