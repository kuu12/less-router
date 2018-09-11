import React from 'react';
import proxy from './proxy';
import { regexFrom, paramsFrom } from './path/regex';
import { PATH_START, PARENT_END } from './message';
import { join } from './path/helper';

let unique = 0;

class Route extends React.Component {
    constructor(props) {
        super(props);
        const {
            Component: { propTypes: { routingStyle } = {} },
            parentPath, path,
            autoCache,
        } = props;

        if (path && !path.startsWith('/'))
            console.error(new Error(PATH_START + path));

        if (parentPath && !parentPath.endsWith('/'))
            throw new Error(PARENT_END + parentPath);

        this.id = ++unique;
        this.path = join(parentPath, path);
        this.wrap = autoCache && !routingStyle;

        proxy.router.registry[this.id] = this;
    }

    componentWillUnmount() {
        delete proxy.router.registry[this.id];
        if (this == this.core) this.core = null;
    }

    exec() {
        this.match = regexFrom(
            this.path,
            this.props.caseSensitive,
        ).test(proxy.router.pathname);

        if (this.match) {
            if (!this.core) this.core = this;
            if (this.props.autoCache) this.cache = true;
        } else {
            if (this == this.core) this.core = null;
        }
    }

    get core() {
        if (undefined === this.props.group) return this;
        return proxy.router.groups[this.props.group];
    }
    set core(route) {
        if (undefined === this.props.group) return;
        return proxy.router.groups[this.props.group] = route;
    }

    get params() {
        return paramsFrom(this.props.parentPath, this.props.path);
    }

    get pass() {
        const props = { ...this.props };
        delete props.Component;
        delete props.parentPath;
        delete props.path;
        delete props.title;
        delete props.autoCache;
        delete props.caseSensitive;
        props.path = this.path;
        props.router = proxy.router;
        return props;
    }

    render() {
        const { Component, title } = this.props;
        let component;

        this.exec();

        if (this.match && this == this.core) {
            const { params } = this;

            component = (
                <Component
                    {...this.pass}
                    {...params}
                    routingStyle={{}}
                />
            );

            if (this.wrap)
                component = (
                    <div
                        className="route-container"
                    >{component}</div>
                );

            if (title !== undefined)
                document.title = title;
            else if (params.title !== undefined)
                document.title = params.title;

        } else if (this.cache) {
            component = (
                <Component
                    {...this.pass}
                    routingStyle={{ display: 'none' }}
                />
            );

            if (this.wrap)
                component = (
                    <div
                        className="route-container"
                        style={{ display: 'none' }}
                    >{component}</div>
                );

        } else {
            component = null;
        }

        return component;
    }
}

export default Route;
