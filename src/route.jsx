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

const Route = ({
    Component,
    parentPath,
    path,
    title,
    titleName,
    style = {},
    autoCache,
    ...rest
}) => {
    if (!path.startsWith('/'))
        throw new Error(`path必须以'/'开头，当前组件path为 ${path}`);

    const fullPath = joinPath(parentPath, path);
    const pathname = getPathname(state.basename);
    const match = regexFromPath(fullPath).exec(pathname);
    const cached = cache.has(fullPath);
    const wrap = autoCache && !(
        Component.propTypes &&
        Component.propTypes.style
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
                style={style}
                title={titleName}
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
                style={{ ...style, display: 'none' }}
                title={titleName}
                {...rest}
                router={state.routerProxy}
            />
        );

        if (wrap)
            component = (
                <div className="route-container hidden">
                    {component}
                </div>
            );
    }

    return component;
};

export default Route;
