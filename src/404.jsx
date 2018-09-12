import React from 'react';
import proxy from './proxy';

class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = { entry: null };
    }

    componentDidMount() {
        const parentPath = this.props.parentPath || '';
        const namespace = new RegExp(`^${parentPath}`);

        const all = Object
            .values(proxy.router.registry)
            .filter(route => route.match)
            .filter(route => namespace.test(route.path));

        const scope = all
            .filter(route => route.path.replace(namespace, ''));

        const notFound =
            all.length > Number(parentPath) &&
            !scope.length;

        if (notFound) this.setState({
            entry: proxy.router.pathname,
        });
    }

    render() {
        if (this.state.entry != proxy.router.pathname) return null;

        const { C_, title, ...props } = this.props;
        document.title = title;
        delete props.NotFound;
        delete props.notFound;
        delete props.Notfound;

        return (
            <C_
                {...props}
                router={proxy.router}
                pathname={proxy.router.pathname}
            />
        );
    }
}

export default NotFound;
