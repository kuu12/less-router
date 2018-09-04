import React from 'react';
import proxy from './proxy';

class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = { entryPoint: null };
    }

    componentDidMount() {
        const parentPath = this.props.parentPath || '';
        const namespace = new RegExp(`^${parentPath}`);
        const keyToValue = path =>
            proxy.router.registry[path];

        const all = Object
            .keys(proxy.router.registry)
            .filter(keyToValue)
            .filter(path => namespace.test(path));

        const matches = all
            .filter(path => path.replace(namespace, ''))
            .map(keyToValue);

        const notFound =
            all.length > Number(Boolean(parentPath)) &&
            !matches.some(Boolean);

        if (notFound) this.setState({
            entryPoint: proxy.router.pathname,
        });
    }

    render() {
        if (!this.state.entryPoint) return null;
        if (this.state.entryPoint !== proxy.router.pathname) return null;

        const { Component, title, titleName, ...props } = this.props;
        document.title = title;
        delete props.NotFound;
        delete props.notFound;
        delete props.Notfound;

        return (
            <Component
                {...props}
                pathname={proxy.router.pathname}
                title={titleName}
            />
        );
    }
}

export default NotFound;
