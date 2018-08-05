import React from 'react';
import cache from './cache';
import config from './config';
import { getPathname, paramsFromPath, regexFromPath, joinPath } from './path';

const Routing = Component => ({
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
    const pathname = getPathname(config.basename);
    const match = regexFromPath(fullPath).exec(pathname);
    const cached = cache.has(fullPath);
    const wrap = autoCache && !(
        Component.propTypes &&
        Component.propTypes.style
    );
    config.paths[fullPath] = match;

    let component = null;

    if (match) {
        component = (
            <Component
                path={fullPath}
                style={style}
                {...paramsFromPath(fullPath, pathname)}
                {...rest}
                title={titleName}
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
                {...rest}
                title={titleName}
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

export default Routing;
