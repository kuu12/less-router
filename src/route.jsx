import React from 'react';
import cache from './cache';
import config from './config';
import { getPathname, paramsFromPath, regexFromPath, joinPath } from './path';

const Route = Component => ({
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

    config.paths[fullPath] = match;

    if (match) {
        if (autoCache && !cached) cache.add(fullPath);
        if (typeof title === 'string') document.title = title;

        return (
            <div className="route-container">
                <Component
                    path={fullPath}
                    style={style}
                    {...paramsFromPath(fullPath, pathname)}
                    {...rest}
                    title={titleName}
                />
            </div>
        );
    } else if (cached) {
        return (
            <div className="route-container hidden">
                <Component
                    path={fullPath}
                    style={{ ...style, display: 'none' }}
                    {...rest}
                    title={titleName}
                />
            </div>
        );
    } else {
        return null;
    }
};

export default Route;
