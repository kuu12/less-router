import React from 'react';
import { NOT_FOUND } from './message';
import { values } from './compatibility';
import { RouteMapCategory, Router } from './router';

let unique = 0;
const NULL = <div style={{ display: 'none' }} />;

export interface NotFoundProps {
    NotFound?: boolean;
    notFound?: boolean;
    Notfound?: boolean;
    title?: string;
    parentPath?: string;
}

export interface NotFoundInjectProps {
    router: Router;
}

interface PortalToNotFoundProps extends NotFoundProps {
    router: Router;
    C_: React.ComponentType<NotFoundInjectProps>;
}

export class NotFound extends React.Component<PortalToNotFoundProps> {
    constructor(props: PortalToNotFoundProps) {
        super(props);
        this.props.router[RouteMapCategory._404][this.id] = this;
    }

    id = ++unique;
    i = false;

    componentWillUnmount() {
        delete this.props.router[RouteMapCategory._404][this.id];
    }

    exec() {
        this.i = true;
        this.forceUpdate();
    }

    get 404() {
        const namespace = new RegExp(`^${this.props.parentPath || ''}`);

        const all = values(this.props.router.matching)
            .filter(route => route.path.match(namespace));

        const scoped = all
            .filter(route => route.path.replace(namespace, ''));

        const notFound = (all.length >= -!this.props.parentPath) && !scoped.length;

        return notFound;
    }

    render() {
        if (!this.i || !this[RouteMapCategory._404]) return NULL;

        const { C_, title = NOT_FOUND, ...props } = this.props;
        document.title = title;
        delete props.NotFound;
        delete props.notFound;
        delete props.Notfound;

        return <C_ {...props} router={this.props.router} />;
    }
}
