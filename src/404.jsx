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
            const values = Object.values(config.paths);
            const notFound =
                values.length &&
                !values.some(Boolean);

            if (notFound) this.setState({
                entryPoint: getPathname(),
            });
        }

        render() {
            if (!this.state.entryPoint) return null;

            const pathname = getPathname();
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
