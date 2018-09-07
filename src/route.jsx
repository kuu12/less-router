import React from 'react';
import proxy from './proxy';
import { matching } from './path/match';
import { paramsFrom } from './path/regex';
import { PATH_START, PARENT_END } from './message';
import { join } from './path/helper';

class Route extends React.Component {
    constructor(props) {
        super(props);
        this.random = Math.random();
        const {
            Component: { propTypes: { routingStyle } = {} },
            parentPath, path,
            autoCache,
        } = props;

        if (path && !path.startsWith('/'))
            console.error(new Error(PATH_START + path));

        if (parentPath && !parentPath.endsWith('/'))
            throw new Error(PARENT_END + parentPath);

        this.state = {};
        this.path = join(parentPath, path);
        this.wrap = Boolean(autoCache && routingStyle);
    }

    componentDidMount() {
        console.log(this.random);
    }

    get params() {
        const { parentPath, path } = this.props;
        return paramsFrom(parentPath, path);
    }

    render() {
        const {
            parentPath,
            path,
            title,
            autoCache,
            caseSensitive,
            Component,
            ...rest
        } = this.props;
        // delete rest.parentPath;
        // delete rest.title;
        // delete rest.autoCache;
        // delete rest.caseSensitive;

        let component = null;

        const { fullPath, regex, match, cached } =
            matching(parentPath, path, caseSensitive);

        if (match) {
            component = (
                <Component
                    {...rest}
                    {...this.params}
                    path={this.path}
                    routingStyle={{}}
                    router={proxy.router}
                />
            );

            if (this.wrap)
                component = (
                    <div className="route-container">
                        {component}
                    </div>
                );

            if (autoCache)
                proxy.router.cache[regex] = true;

            if (title !== undefined)
                document.title = title;
            else if (this.params.title !== undefined)
                document.title = this.params.title;

        } else if (cached) {
            component = (
                <Component
                    {...rest}
                    path={fullPath}
                    routingStyle={{ display: 'none' }}
                    router={proxy.router}
                />
            );

            if (this.wrap)
                component = (
                    <div
                        className="route-container"
                        style={{ display: 'none' }}
                    >
                        {component}
                    </div>
                );
        }

        return component;
    }
}

export default Route;
