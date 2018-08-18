import React from 'react';
import state from './state';
import Matching from './match';
import {
    PATH_START,
    PARENT_END,
} from './message';

const Route = ({
    Component,
    parentPath,
    path,
    title,
    autoCache,
    ...rest
}) => {
    if (!path.startsWith('/'))
        throw new Error(PATH_START + path);

    if (parentPath && !parentPath.endsWith('/'))
        throw new Error(PARENT_END + parentPath);

    const { fullPath, regex, match, cached, params } =
        Matching(parentPath, path);

    const wrap = autoCache && !(
        Component.propTypes &&
        Component.propTypes.routingStyle
    );
    state.registeredRoutes[fullPath] = match;

    let component = null;

    if (match) {
        component = (
            <Component
                path={fullPath}
                routingStyle={{}}
                {...params}
                {...rest}
                router={state.routerProxy}
            />
        );

        if (wrap)
            component = (
                <div className="route-container">
                    {component}
                </div>
            );

        if (autoCache && !cached)
            state.cache[regex] = true;

        if (typeof title === 'string')
            document.title = title;
        else if (typeof params.title === 'string')
            document.title = params.title;

    } else if (cached) {
        component = (
            <Component
                path={fullPath}
                routingStyle={{ display: 'none' }}
                {...rest}
                router={state.routerProxy}
            />
        );

        if (wrap)
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
};

export default Route;
