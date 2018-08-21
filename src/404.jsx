import React from 'react';
import state from './state';
import { pathname } from './path/path';

class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = { entryPoint: null };
    }

    componentDidMount() {
        const parentPath = this.props.parentPath || '';
        const namespace = new RegExp(`^${parentPath}`);

        const keyToValue = path => state.registeredRoutes[path];

        const all = Object
            .keys(state.registeredRoutes)
            .filter(keyToValue)
            .filter(path => namespace.test(path));

        const matches = all
            .filter(path => path.replace(namespace, ''))
            .map(keyToValue);

        const notFound =
            all.length > Number(Boolean(parentPath)) &&
            !matches.some(Boolean);

        if (notFound) this.setState({
            entryPoint: pathname(),
        });
    }

    render() {
        if (!this.state.entryPoint) return null;
        if (pathname() !== this.state.entryPoint) return null;

        const { Component, title, titleName, ...rest } = this.props;
        document.title = title;
        delete rest.NotFound;
        delete rest.notFound;
        delete rest.Notfound;
        delete rest.NOT_FOUND;

        return (
            <Component
                {...rest}
                pathname={pathname()}
                title={titleName}
            />
        );
    }
}

export default NotFound;
