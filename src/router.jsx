import React from 'react';
import proxy from './proxy';
import { values, promiseCallback } from './compatibility';
import { addHeadRemoveTail, separate } from './path/helper';
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

        this.state = this.location;
        this.html = props.htmlFile || 'index.html';

        this.queue = [];
        this[0] = history.length;
        if (history.replaceState)
            history.replaceState({ i: this[0] }, '');

        this.match = match;
        this.params = params;

        proxy.router = this;
        if (props.global) window[props.global] = this;
    }
    componentWillUnmount() {
        proxy.router = null;
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
    get location() {
        return {
            pathname: decodeURIComponent(
                location.pathname.replace(
                    new RegExp(`^${this.basename}`), ''
                ) || '/'
            ),
            search: location.search,
        };
    }

    push(pathname, cb) {
        return this.change(1, pathname, cb);
    }
    replace(pathname, cb) {
        return this.change(0, pathname, cb);
    }
    change(step, pathname, cb) {
        if (!/^\//.test(pathname))
            console.error(new Error(PATH_START + pathname));

        const href = this.basename + pathname;
        if (!history.replaceState) {
            location.href = href;
            return cb && cb();
        }
        history[step ? 'pushState' : 'replaceState'](
            { i: history.state.i + step }, '', href);
        return this.update(separate(pathname), cb);
    }
    update(state, cb) {
        return promiseCallback(resolve => {
            this.group = {};
            this.sync('route', state.pathname);
            this.setState(state, () => {
                this.sync(404);
                resolve();
            });
        }, cb);
    }

    back(toPathname, cb) {
        return this.moreHistory || !toPathname
            ? this.go(-1, cb)
            : this.replace(toPathname, cb);
    }
    forward(cb) {
        return this.go(1, cb);
    }
    go(step, cb) {
        return promiseCallback(resolve => {
            this.queue.unshift(resolve);
            history.go(step);
        }, cb);
    }
    get moreHistory() {
        return !history.state || (history.state.i > this[0]);
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

        return promiseCallback(resolve => {
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

export default Router;
