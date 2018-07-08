const PARAM = /:\w+(?=\W?)/g;

const patternToRegex = (pattern, callback) =>
    pattern.replace(
        PARAM,
        callback instanceof Function
            ? (...args) => (callback(...args), '(\\w+)')
            : '(\\w+)'
    );

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
const pathParams = (pattern, pathname = location.pathname) => {
    const params = ['path'];
    const result = {};

    const regex = patternToRegex(
        pattern,
        ([syntax_ignored, ...paramName]) =>
            params.push(paramName.join(''))
    );

    (new RegExp(regexp).exec(pathname) || [])
        .forEach((match, index) =>
            result[params[index]] = match
        );

    return result;
}

export {
    PARAM,
    patternToRegex,
    pathParams,
}
