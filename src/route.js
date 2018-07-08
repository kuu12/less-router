import React from 'react';
import cache from './cache';
import config from './config';
import { patternToRegex, pathParams, PARAM } from './path-params';

const Route = Component =>
    ({ path, title, titleName, style = {}, cachable, ...rest }) => {
        const pathname = location.pathname.replace(
            new RegExp('^' + config.basename), ''
        );

        const match =
            path instanceof RegExp
                ? path.test(pathname)
                : PARAM.test(path)
                    ? patternToRegex(path).test(pathname)
                    : path === pathname;

        const cached = cache.has(path);

        config.paths[path] = match;

        if (match) {
            if (cachable && !cached) cache.add(path);
            if (typeof title === 'string') document.title = title;

            return (
                <Component
                    path={path}
                    style={style}
                    title={titleName}
                    {...pathParams(path, pathname)}
                    {...rest}
                />
            );
        } else if (cached) {
            return (
                <Component
                    path={path}
                    style={{ ...style, display: 'none' }}
                    title={titleName}
                    {...pathParams(path, pathname)}
                    {...rest}
                />
            );
        } else {
            return null;
        }
    };

export default Route;
