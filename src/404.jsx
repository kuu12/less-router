import React from 'react';
import proxy from './proxy';
import { NOT_FOUND } from './message';

let unique = 0;
const NULL = <div style={{ display: 'none' }} />;

class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.id = ++unique;
        proxy.router[404][this.id] = this;
    }

    componentWillUnmount() {
        delete proxy.router[404][this.id];
    }

    exec() {
        this.i = true;
        this.forceUpdate();
    }

    get 404() {
        const namespace = new RegExp(`^${this.props.parentPath || ''}`);

        const all = Object
            .values(proxy.router.matching)
            .filter(route => route.path.match(namespace));

        const scoped = all
            .filter(route => route.path.replace(namespace, ''));

        const notFound = (all.length >= !!this.props.parentPath) && !scoped.length;

        return notFound;
    }

    render() {
        if (!this.i || !this[404]) return NULL;

        const { C_, title = NOT_FOUND, ...props } = this.props;
        document.title = title;
        delete props.NotFound;
        delete props.notFound;
        delete props.Notfound;

        return <C_ {...props} {...proxy} />;
    }
}

export default NotFound;
