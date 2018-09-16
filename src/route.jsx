import React from 'react';
import proxy from './proxy';
import { regexFrom, paramsFrom } from './path/regex';
import { PATH_START, PARENT_END } from './message';
import { join } from './path/helper';

let unique = 0;

class Route extends React.Component {
    constructor(props) {
        super(props);
        const { parentPath, path, autoCache } = props;

        if (path && !/^\//.test(path))
            console.error(new Error(PATH_START + path));

        if (parentPath && !/\/$/.test(parentPath))
            throw new Error(PARENT_END + parentPath);

        this.id = ++unique;
        this.path = join(parentPath, path);
        this.wrap = autoCache && autoCache != 'nowrap';
    }

    componentWillUnmount() {
        this.del('matching');
        this.del('cache');
        if (this == this.core) this.core = null;
    }

    exec() {
        if (
            regexFrom(
                this.path,
                this.props.caseSensitive
            ).test(proxy.router.pathname)
        ) {
            this.put('matching');
            if (!this.core) this.core = this;
            if (this == this.core && this.props.autoCache) this.put('cache');
        } else {
            this.del('matching');
            if (this == this.core) this.core = null;
        }
    }

    get(name) {
        return proxy.router[name][this.id];
    }
    put(name) {
        proxy.router[name][this.id] = this;
    }
    del(name) {
        if (proxy.router[name][this.id])
            delete proxy.router[name][this.id];
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

        } else if (this.get('cache')) {
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

export default Route;
