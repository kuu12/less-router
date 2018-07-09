import React from 'react';
import config from './config';
import { pathMatchPathname } from './path';

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

            if (notFound)
                this.setState({
                    entryPoint: getPathname()
                });
        }

        render() {
            if (!this.state.entryPoint) return null;

            if (
                this.state.entryPoint !==
                getPathname()
            ) return null;

            const { path, title, titleName, ...rest } = this.props;

            if (
                typeof path !== 'undefined' &&
                !pathMatchPathname(
                    this.props.path,
                    this.state.entryPoint,
                )
            ) return null;

            return (
                <Component
                    path={path}
                    title={titleName}
                    {...rest}
                />
            );
        }
    }

export default NotFound;

const getPathname = () =>
    location
        .pathname
        .replace(
            new RegExp('^' + config.basename),
            ''
        ) ||
    '/';
