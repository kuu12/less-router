import config from './config';

const getPathname = () =>
    location
        .pathname
        .replace(
            new RegExp('^' + config.basename),
            ''
        ) ||
    '/';

const param = /:\w+(?=\W?)/g;

const regexFromString = string =>
    new RegExp(`^${string}$`);

const regexFromPattern = (pattern, callback) => {
    const replacement = callback instanceof Function
        ? (...args) => (callback(...args), '(\\w+)')
        : '(\\w+)';
    return new RegExp(
        pattern.replace(
            param, replacement
        )
    );
};

const regexFromPath = path =>
    path instanceof RegExp ? path :
        param.test(path) ? regexFromPattern(path) :
            regexFromString(path);

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
    const params = ['path'];
    const result = {};

    const regex = regexFromPattern(
        pattern,
        ([syntax_ignored, ...paramName]) =>
            params.push(paramName.join(''))
    );

    (regex.exec(pathname) || [])
        .forEach((match, index) =>
            result[params[index]] = match
        );

    return result;
};

const pathMatchPathname = (path, pathname = location.pathname) =>
    regexFromPath(path).test(pathname);

export {
    getPathname,
    regexFromPath,
    paramsFromPath,
    pathMatchPathname,
}
