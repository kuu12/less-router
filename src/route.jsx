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
            parentPath, path,
            C_: { propTypes: { routingStyle } = {} },
            autoCache,
        } = props;

        if (path && !path.startsWith('/'))
            console.error(new Error(PATH_START + path));

        if (parentPath && !parentPath.endsWith('/'))
            throw new Error(PARENT_END + parentPath);

        this.id = ++unique;
        this.path = join(parentPath, path);
        this.wrap = autoCache && !routingStyle;
    }

    componentWillUnmount() {
        this.set('matching');
        this.set('cache');
        if (this == this.core) this.core = null;
    }

    exec() {
        if (
            regexFrom(
                this.path,
                this.props.caseSensitive
            ).test(proxy.router.pathname)
        ) {
            this.set('matching', true);
            if (!this.core) this.core = this;
            if (this == this.core) this.set('cache', this.props.autoCache);
        } else {
            if (this == this.core) this.core = null;
        }
    }

    get(name) {
        const state = proxy.router[name];
        const { id } = this;
        return state[id];
    }
    set(name, value) {
        const state = proxy.router[name];
        const { id } = this;
        if (value) state[id] = value;
        else if (state[id]) delete state[id];
    }

    get core() {
        if (undefined === this.props.group) return this;
        return proxy.router.group[this.props.group];
    }
    set core(route) {
        if (undefined === this.props.group) return;
        return proxy.router.group[this.props.group] = route;
    }

    get params() {
        return paramsFrom(this.props.parentPath, this.props.path);
    }

    get pass() {
        const props = { ...this.props };
        delete props.C_;
        delete props.parentPath;
        delete props.path;
        delete props.title;
        delete props.autoCache;
        delete props.caseSensitive;
        delete props.group;
        props.path = this.path;
        props.router = proxy.router;
        return props;
    }

    render() {
        const { C_, title } = this.props;

        let component = null;

        this.exec();

        if (this.get('matching') && this == this.core) {
            component = (
                <C_
                    {...this.params}
                    {...this.pass}
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
            else if (this.params.title !== undefined)
                document.title = this.params.title;

        } else if (this.get('cache')) {
            component = (
                <C_
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

        }

        return component;
    }
}

export default Route;
