// 将'/basename/xxx'替换为'/xxx'
// 将'/basename'去头后，会变成''，此时作特殊处理，变成'/'
const getPathname = (basename = '') =>
    location.pathname.replace(
        new RegExp('^' + basename), ''
    ) || '/';

const regexFromString = string => {
    if (!regexFromString.cache)
        regexFromString.cache = {};

    const { cache } = regexFromString;
    if (cache[string]) return cache[string];

    if ('/' === string) {
        string += '(index.html)?$';
    } else if (string.endsWith('/')) {
        string = string.slice(0, string.length - 1);
        string += '\\/?';
    } else {
        string += '\\/?$';
    }

    cache[string] = new RegExp(`^${string}`);
    return cache[string];
};

/**
 * 把 '/order/:orderNo' 这样的字符串，转化为'/order/(\\w+)'
 * 用此字符串创建正则表达式，能匹配 '/order/753xxxxx3512351' 之类的字符串
 */
const replacePattern = (pattern, callback) => {
    const replacement = callback instanceof Function
        ? (...args) => (callback(...args), '(\\w+)')
        : '(\\w+)';

    const string = pattern.replace(/:\w+(?=\W?)/g, replacement);
    return string;
};

const regexFromPath = path => {
    if (!regexFromPath.cache)
        regexFromPath.cache = {};

    const { cache } = regexFromPath;

    if (!cache[path]) {
        const string = replacePattern(path);
        const regex = regexFromString(string);
        cache[path] = regex;
    }

    return cache[path];
};

/**
 * @param   {string} pattern    '/calendar/:year/:month/:date'
 * @param   {string} pathname   '/calendar/2018/7/8'
 * @returns {Object}            {
 *                                  path: '/calendar/2018/7/8', 
 *                                  year: '2018', 
 *                                  month: '7', 
 *                                  date: '8' 
 *                              }
 */
const paramsFromPath = (pattern, pathname = location.pathname) => {
    const params = ['pathname'];
    const result = {};

    const string = replacePattern(
        pattern,
        ([syntax_ignored, ...paramName]) =>
            params.push(paramName.join(''))
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
    let availablePaths = paths
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
    replacePattern,
    paramsFromPath,
    joinPath,
};
