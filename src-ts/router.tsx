import React from 'react';
import proxy from './proxy';
import { values, promiseCallback, Callback } from './compatibility';
import { addHeadRemoveTail, separate, DrawOwnProps } from './path/helper';
import { PATH_START, PATH_NOT_FOUND } from './message';
import { Route } from './route';
import { NotFound } from './404';

export interface WrappedAppRouterProps {
    basename?: string;
    htmlFile?: string;
    global?: true;
}

export interface OriginAppRouterProps {
    router: Router;
}

export type OriginAppOtherProps = Omit<
    { [key: string]: any; },
    keyof OriginAppRouterProps
>;

type OriginToWrapped<AppProps extends OriginAppRouterProps> =
    & DrawOwnProps<OriginAppRouterProps, AppProps>
    & WrappedAppRouterProps

type RouterProps<AppProps extends OriginAppRouterProps> =
    & OriginToWrapped<AppProps>
    & { C_: React.ComponentType<AppProps>; }

interface RouterState {
    pathname: string;
    search: string;
}

interface RouteMap {
    [routeId: number]: Route;
}

interface NotFoundMap {
    [nofFoundId: number]: NotFound;
}

export const enum RouteMapCategory {
    route = 'route',
    matching = 'matching',
    cache = 'cache',
    group = 'group',
    _404 = '404',
}

export class Router<
    AppProps extends 
    OriginAppRouterProps & OriginAppOtherProps =
    OriginAppRouterProps & OriginAppOtherProps
> extends React.Component<RouterProps<AppProps>, RouterState> {
    constructor(props: RouterProps<AppProps>) {
        super(props);
        this.html = props.htmlFile || 'index.html';

        if (history.replaceState)
            history.replaceState({ i: this.h }, '');

        proxy.router = this;
    }

    [RouteMapCategory.route]: RouteMap = {};
    [RouteMapCategory.matching]: RouteMap = {};
    [RouteMapCategory.cache]: RouteMap = {};
    [RouteMapCategory.group]: RouteMap = {};
    [RouteMapCategory._404]: NotFoundMap = {};

    state = this.location;
    html: string;

    queue = [];
    h = history.length;

    componentDidMount() {
        this.sync(RouteMapCategory._404);
    }

    get basename() {
        return addHeadRemoveTail(this.props.basename || '');
    }
    get pathname() {
        return `/${this.html}` == this.state.pathname
            ? '/' : this.state.pathname;
    }
    get location(): RouterState {
        return {
            pathname: decodeURIComponent(
                location.pathname.replace(
                    new RegExp(`^${this.basename}`), ''
                ) || '/'
            ),
            search: location.search,
        };
    }

    push(pathname: string, cb?: Callback) {
        return this.change(1, pathname, cb);
    }
    replace(pathname: string, cb?: Callback) {
        return this.change(0, pathname, cb);
    }
    private change(step: number, pathname: string, cb?: Callback) {
        if (!/^\//.test(pathname))
            console.error(new Error(PATH_START + pathname));

        const href = this.basename + pathname;
        if (!history.replaceState) {
            location.href = href;
            return promiseCallback(() => {}, cb);
        }
        history[step ? 'pushState' : 'replaceState'](
            { i: history.state.i + step }, '', href);
        return this.update(separate(pathname), cb);
    }
    update(state: RouterState, cb?: Callback) {
        return promiseCallback(resolve => {
            this.group = {};
            this.sync(RouteMapCategory.route, state.pathname);
            this.setState(state, () => {
                this.sync(RouteMapCategory._404);
                resolve();
            });
        }, cb);
    }

    back(toPathname: string, cb?: Callback) {
        return this.moreHistory || !toPathname
            ? this.go(-1, cb)
            : this.replace(toPathname, cb);
    }
    forward(cb?: Callback) {
        return this.go(1, cb);
    }
    go(step: number, cb?: Callback) {
        return promiseCallback(resolve => {
            this.queue.unshift(resolve);
            history.go(step);
        }, cb);
    }
    get moreHistory() {
        return !history.state || (history.state.i > this.h);
    }

    sync(type: RouteMapCategory, pathname?: string) {
        values(this[type]).forEach(component => {
            component.exec(pathname);
        });
    }

    clearCache(path: string, cb?: Callback) {
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
