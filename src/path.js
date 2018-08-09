import { cacheable } from './helper';

// '/basename/xxx' -> '/xxx'
// '/basename' -> '/'
const getPathname = (basename = '') =>
    location.pathname.replace(
        new RegExp('^' + basename), ''
    ) || '/';

const regexFromString = cacheable(function (string) {
    if ('/' === string) {
        string += '(index.html)?$';
    } else if (string.endsWith('/')) {
        string = string.slice(0, string.length - 1);
        string += '\\/?';
    } else {
        string += '\\/?$';
    }
    return new RegExp(`^${string}`);
});

const PARAMS = /:\w+(?=\W?)/g;
const PARAMS_REPLACEMENT = '(\\w+)';

const removeParam = cacheable(
    path =>
        path && path.replace(PARAMS, '\\w+')
);

const regexFromPath = cacheable(
    path =>
        regexFromString(
            path.replace(PARAMS, PARAMS_REPLACEMENT)
        )
);

/**
 * @param   {string} path    '/calendar/:year/:month/:date'
 * @param   {string} pathname   '/calendar/2018/7/8'
 * @returns {Object}            {
 *                                  path: '/calendar/2018/7/8', 
 *                                  year: '2018', 
 *                                  month: '7', 
 *                                  date: '8' 
 *                              }
 */
const paramsFromPath = (path, pathname = location.pathname) => {
    const params = ['pathname'];
    const result = {};

    const string = path.replace(
        PARAMS,
        function ([syntax_ignored, ...paramName]) {
            params.push(paramName.join(''));
            return PARAMS_REPLACEMENT;
        },
    );
    const regex = regexFromString(string);

    Array
        .from(regex.exec(pathname) || [])
        .filter(Boolean)
        .forEach((match, index) =>
            result[params[index]] = match
        );

    return result;
};

const joinPath = (...paths) => {
    const availablePaths = paths
        .filter(Boolean)
        .filter(path => path !== '/');

    let fullPath = availablePaths
        .map(path =>
            path.endsWith('/')
                ? path.slice(0, -1)
                : path
        )
        .map(path =>
            path.startsWith('/')
                ? path
                : `/${path}`
        )
        .join('');

    if (!fullPath)
        fullPath = '/';
    else if (availablePaths[availablePaths.length - 1].endsWith('/'))
        fullPath += '/';

    return fullPath;
};

export {
    getPathname,
    regexFromPath,
    removeParam,
    paramsFromPath,
    joinPath,
};
