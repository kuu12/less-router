import React from 'react';
import config from './config';
import { getPathname } from './path';

const NotFound = Component =>
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = { entryPoint: null };
        }

        componentDidMount() {
            const namespace = new RegExp(
                `^${this.props.parentPath || ''}`
            );

            const keyToValue = path => config.paths[path];

            const all = Object
                .keys(config.paths)
                .filter(keyToValue)
                .filter(path => namespace.test(path));

            const matches = all
                .filter(path => path.replace(namespace, ''))
                .map(keyToValue);

            const notFound = all.length && !matches.some(Boolean);

            if (notFound) this.setState({
                entryPoint: getPathname(config.basename),
            });
        }

        render() {
            if (!this.state.entryPoint) return null;

            const pathname = getPathname(config.basename);
            if (pathname !== this.state.entryPoint) return null;

            const { path, title, titleName, ...rest } = this.props;
            document.title = title;

            return (
                <Component
                    path={path}
                    pathname={pathname}
                    title={titleName}
                    {...rest}
                />
            );
        }
    };

export default NotFound;
