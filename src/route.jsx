import React from 'react';
import cache from './cache';
import state from './state';
import {
    getPathname,
    paramsFromPath,
    regexFromPath,
    joinPath,
    removeParam,
} from './path';
import Basename from './basename';
import { PATH_MUST_STARTS_WITH_SLASH } from './message';

const Route = ({
    Component,
    parentPath,
    path,
    title,
    autoCache,
    ...rest
}) => {
    if (!path.startsWith('/'))
        throw new Error(PATH_MUST_STARTS_WITH_SLASH + path);

    const fullPath = joinPath(parentPath, path);
    const pathname = getPathname(Basename.get());
    const match = regexFromPath(fullPath).test(pathname);
    const cached = cache.has(fullPath);
    const wrap = autoCache && !(
        Component.propTypes &&
        Component.propTypes.routingStyle
    );
    state.registeredRoutes[fullPath] = match;

    let component = null;

    if (match) {
        const params = paramsFromPath(
            joinPath(removeParam(parentPath), path),
            pathname,
        );

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
            cache.add(fullPath);

        if (typeof title === 'string')
            document.title = title;

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
