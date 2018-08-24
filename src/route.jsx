import React from 'react';
import proxy from './proxy';
import matching from './path/match';
import { paramsFrom } from './path/regex';
import { PATH_START, PARENT_END } from './message';

const Route = ({
    Component,
    parentPath,
    path,
    title,
    autoCache,
    ...rest
}) => {
    if (path && !path.startsWith('/')) {
        console.error(new Error(PATH_START + path));
    }
    if (parentPath && !parentPath.endsWith('/')) {
        throw new Error(PARENT_END + parentPath);
    }
    const { fullPath, regex, match, cached } =
        matching(parentPath, path, proxy.router.pathname);

    const wrap = autoCache && !(
        Component.propTypes &&
        Component.propTypes.routingStyle
    );
    proxy.router.registeredRoutes[fullPath] = match;

    let component = null;

    if (match) {
        const params = paramsFrom(
            parentPath, path, proxy.router.pathname,
        );
        component = (
            <Component
                {...rest}
                {...params}
                path={fullPath}
                routingStyle={{}}
                router={proxy.router}
            />
        );

        if (wrap)
            component = (
                <div className="route-container">
                    {component}
                </div>
            );

        if (autoCache && !cached)
            proxy.router.cache[regex] = true;

        if (typeof title === 'string')
            document.title = title;
        else if (typeof params.title === 'string')
            document.title = params.title;

    } else if (cached) {
        component = (
            <Component
                {...rest}
                path={fullPath}
                routingStyle={{ display: 'none' }}
                router={proxy.router}
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
