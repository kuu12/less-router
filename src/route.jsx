import React from 'react';
import cache from './cache';
import config from './config';
import {
    paramsFromPath,
    pathMatchPathname,
} from './path';

const Route = Component =>
    ({ path, title, titleName, style = {}, autoCache, ...rest }) => {
        const pathname =
            location
                .pathname
                .replace(
                    new RegExp('^' + config.basename), ''
                ) ||
            '/';

        const match = pathMatchPathname(path, pathname);
        const cached = cache.has(path);

        config.paths[path] = match;

        if (match) {
            if (autoCache && !cached) cache.add(path);
            if (typeof title === 'string') document.title = title;

            return (<div className="route-container">
                <Component
                    path={path}
                    style={style}
                    title={titleName}
                    {...paramsFromPath(path, pathname)}
                    {...rest}
                />
            </div>);
        } else if (cached) {
            return (<div className="route-container hidden">
                <Component
                    path={path}
                    style={{ ...style, display: 'none' }}
                    title={titleName}
                    {...paramsFromPath(path, pathname)}
                    {...rest}
                />
            </div>);
        } else {
            return null;
        }
    };

export default Route;
