import React from 'react';
import state from './state';
import {
    getPathname,
    paramsFromPath,
    regexFromPath,
    joinPath,
    removeParam,
} from './path';
import Basename from './basename';
import {
    PATH_MUST_STARTS_WITH_SLASH,
    PARENT_PATH_MUST_ENDS_WITH_SLASH,
} from './message';

const Route = ({
    Component,
    parentPath,
    path,
    title,
    autoCache,
    exclusive,
    ...rest
}) => {
    if (!path.startsWith('/'))
        throw new Error(PATH_MUST_STARTS_WITH_SLASH + path);

    if (parentPath && !parentPath.endsWith('/'))
        throw new Error(PARENT_PATH_MUST_ENDS_WITH_SLASH + parentPath);

    const fullPath = joinPath(parentPath, path);
    const pathname = getPathname(Basename.get());
    const regex = regexFromPath(fullPath);

    const exclusivePath = state.exclusive.find(exp =>
        regexFromPath(exp).test(pathname)
    );
    const match =
        exclusivePath && !exclusivePath.startsWith(fullPath)
            ? false
            : regex.test(pathname);

    const cached = state.cache[regex];
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

        if (exclusive && !state.exclusive.find(exp => fullPath === exp))
            state.exclusive.push(fullPath);

        if (autoCache && !cached)
            state.cache[regex] = true;

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
    } else if (exclusive) {
        state.exclusive = state.exclusive.filter(exp => fullPath !== exp);
    }

    return component;
};

export default Route;
