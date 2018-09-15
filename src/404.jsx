import React from 'react';
import proxy from './proxy';
import { NOT_FOUND } from './message';

let unique = 0;
const NULL = <div style={{ display: 'none' }} />;

class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.id = ++unique;
        proxy.router[404][this.id] = this;
    }

    componentWillUnmount() {
        delete proxy.router[404][this.id];
    }

    refresh() {
        this.setState({ f: !this.state.f });
    }

    get 404() {
        const parentPath = this.props.parentPath || '';
        const namespace = new RegExp(`^${parentPath}`);

        const all = Object
            .values(proxy.router.matching)
            .filter(route => route.path.match(namespace));

        const scope = all
            .filter(route => route.path.replace(namespace, ''));

        const notFound =
            all.length >= Number(Boolean(parentPath)) &&
            !scope.length;

        return notFound;
    }

    render() {
        if (!('f' in this.state)) return NULL;
        if (!this[404]) return NULL;

        const { C_, title = NOT_FOUND, ...props } = this.props;
        document.title = title;
        delete props.NotFound;
        delete props.notFound;
        delete props.Notfound;

        return <C_
            {...props}
            router={proxy.router}
            pathname={proxy.router.pathname}
        />;
    }
}

export default NotFound;
