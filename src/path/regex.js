import { PARAMS, PARAMS_REPLACEMENT, cacheable } from './helper';
import { addHeadRemoveTail } from './path';

/**
 *  /           ->      /(?=(index.html)?$)     ->      /
 *                                                      /index.hml
 * 
 *  /movie/     ->      /movie(?=\\/?)          ->      /movie
 *                                                      /movie/
 *                                                      /movie/action
 *
 *  /movie     ->       /movie(?=\\/?$)         ->      /movie
 *                                                      /movie/
 */
const regexFromString = cacheable(
    string => {
        if ('/' === string) {
            string += '(?=(index.html)?$)';
        } else if (string.endsWith('/')) {
            string = string.slice(0, string.length - 1);
            string += '(?=\\/?)';
        } else {
            string += '(?=\\/?$)';
        }
        return new RegExp(`^${string}`);
    }
);

/**
 *  /calendar/:year/:month/holiday                      ->
 *  /\/calendar\/(\\w+)\/(\\w+)\/holiday(?=\\/?$)/      ->
 *  /calendar/2018/7/holiday
 */
const regexFrom = cacheable(
    path => regexFromString(
        path.replace(PARAMS, PARAMS_REPLACEMENT)
    )
);

/**
 * @param   parentPath  /user/:username
 * @param   path        /calendar/:year/:month/:date
 * @param   pathname    /user/kuu12/calendar/2018/7/8
 * @returns             { year: '2018', month: '7', date: '8' }
*/
const paramsFrom = (parentPath, path, pathname) => {
    if (parentPath) {
        parentPath = regexFrom(addHeadRemoveTail(parentPath));
        pathname = pathname.replace(parentPath, '');
    }
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

export {
    regexFrom,
    paramsFrom,
};
