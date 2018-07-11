import React from 'react';
import cache from './cache';
import config from './config';
import { getPathname, paramsFromPath, regexFromPath } from './path';

const Route = Component =>
    ({ path, title, titleName, style = {}, autoCache, ...rest }) => {
        const pathname = getPathname();
        const match = regexFromPath(path).exec(pathname);
        const cached = cache.has(path);

        config.paths[path] = match;

        if (match) {
            if (autoCache && !cached) cache.add(path);
            if (typeof title === 'string') document.title = title;

            return (<div className="route-container">
                <Component
                    path={path}
                    pathname={match[0]}
                    style={style}
                    {...paramsFromPath(path, pathname)}
                    {...rest}
                    title={titleName}
                />
            </div>);
        } else if (cached) {
            return (<div className="route-container hidden">
                <Component
                    path={path}
                    pathname={null}
                    style={{ ...style, display: 'none' }}
                    {...paramsFromPath(path, pathname)}
                    {...rest}
                    title={titleName}
                />
            </div>);
        } else {
            return null;
        }
    };

export default Route;
