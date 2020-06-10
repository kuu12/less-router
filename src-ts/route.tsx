import React from 'react';
import { Router, RouteMapCategory, OriginAppRouterProps } from './router';
import proxy from './proxy';
import { join, DrawOwnProps } from './path/helper';
import { regexFrom, paramsFrom } from './path/regex';
import { PATH_START, PARENT_END } from './message';

export interface WrappedComponentRouteProps {
    path: string;
    title?: string;
    parentPath?: string;
    autoCache?: string;
    caseSensitive?: true;
    group?: string;
}

export interface OriginComponentRouteProps {
    router: Router;
    path: string;
    pathname?: string;
    cached?: boolean;
}

export type OriginComponentOtherProps = Omit<
    { [key: string]: any; },
    keyof OriginComponentRouteProps
>;

type OriginToWrapped<ComponentProps extends OriginComponentRouteProps> =
    & DrawOwnProps<OriginAppRouterProps, ComponentProps>
    & WrappedComponentRouteProps

type RouteProps<ComponentProps extends OriginComponentRouteProps> =
    & OriginToWrapped<ComponentProps>
    & { C_: React.ComponentType<ComponentProps>; }

export const RouteHOC = <T extends OriginComponentRouteProps>
    (Component: React.ComponentType<T>):
    React.FunctionComponent<OriginToWrapped<T>> =>
    (props) => <Route<T> C_={Component} {...props} />;

let unique = 0;

export class Route<
    ComponentProps extends
    OriginComponentRouteProps & OriginComponentOtherProps =
    OriginComponentRouteProps & OriginComponentOtherProps
    >
    extends React.Component<RouteProps<ComponentProps>> {
    constructor(props: RouteProps<ComponentProps>) {
        super(props);
        const { parentPath, path, autoCache } = props;

        if (path && !/^\//.test(path))
            console.error(new Error(PATH_START + path));

        if (parentPath && !/\/$/.test(parentPath))
            throw new Error(PARENT_END + parentPath);

        this.path = join(parentPath, path);
        this.wrap = autoCache && autoCache != 'nowrap';

        this.put(RouteMapCategory.route);
        this.exec(proxy.router.pathname);
    }

    id = ++unique;
    path: string;
    wrap: boolean;
    params?: OriginComponentOtherProps & {
        pathname?: string;
    };

    componentWillUnmount() {
        this.del(RouteMapCategory.route);
        this.del(RouteMapCategory.matching);
        this.del(RouteMapCategory.cache);
        if (this == this.core) this.core = null;
    }

    exec(pathname: string) {
        if (
            regexFrom(
                this.path,
                this.props.caseSensitive
            ).test(pathname)
        ) {
            this.put(RouteMapCategory.matching);

            if (!this.core)
                this.core = this;

            if (this == this.core && this.props.autoCache)
                this.put(RouteMapCategory.cache);

            this.params = paramsFrom(
                this.props.parentPath,
                this.props.path,
                pathname,
            );
        } else {
            this.del(RouteMapCategory.matching);

            if (this == this.core)
                this.core = null;

            this.params = {};
        }
    }

    get(name: RouteMapCategory) {
        return proxy.router[name][this.id];
    }
    put(name: RouteMapCategory) {
        proxy.router[name][this.id] = this;
    }
    del(name: RouteMapCategory) {
        if (proxy.router[name][this.id])
            delete proxy.router[name][this.id];
    }

    get core() {
        if (undefined === this.props.group) return this;
        return proxy.router.group[this.props.group];
    }
    set core(route) {
        if (undefined === this.props.group) return;
        proxy.router.group[this.props.group] = route;
    }

    get pass(): OriginComponentRouteProps {
        const {
            C_,
            parentPath,
            path,
            title,
            autoCache,
            caseSensitiveautoCache,
            groupautoCache,
            ...props
        } = this.props;

        return {
            ...props,
            router: proxy.router,
            path: this.path,
        };
    }

    render() {
        const { C_, title } = this.props;

        let component = null;

        if (this.get(RouteMapCategory.matching) && this == this.core) {
            component = (
                <C_ {...this.params} {...this.pass} />
            );

            if (this.wrap)
                component = (
                    <div>{component}</div>
                );

            if (title !== undefined)
                document.title = title;
            else if (this.params.title !== undefined)
                document.title = this.params.title;

        } else if (this.get(RouteMapCategory.cache)) {
            component = (
                <C_ {...this.pass} cached={true} />
            );

            if (this.wrap)
                component = (
                    <div style={{ display: 'none' }}>{component}</div>
                );

        }

        return component;
    }
}

// interface AAProps extends OriginComponentRouteProps {
//     aa: string;
//     cc: number;
// }

// class AA extends React.Component<AAProps> {
//     render() {
//         return <div>{this.props.aa},{this.props.cc}</div>
//     }
// }

// const RAA = RouteHOC(AA);

// const CC: React.FunctionComponent = () => <RAA
//     path="/aaa"
//     aa="ff"
//     cc={12}
// />;
