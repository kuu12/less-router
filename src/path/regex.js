import proxy from '../proxy';
import { cacheable } from './helper';

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
    (string, caseSensitive) => {
        if ('/' == string) {
            string += `(?=(${proxy.router.html})?$)`;
        } else if (/\/$/.test(string)) {
            string = string.slice(0, string.length - 1);
            string += '(?=/?\\/|$)';
        } else if (string) {
            string += '(?=/?$)';
        }
        return new RegExp(
            `^${string}`,
            caseSensitive ? undefined : 'i'
        );
    }
);

const PARAMS_0 = /:[\w-~]+(?=\/|$)/g;
const PARAMS_1 = '([\\w-~]+)';

/**
 *  /calendar/:year/:month/holiday                      ->
 *  /\/calendar\/(\\w+)\/(\\w+)\/holiday(?=\\/?$)/      ->
 *  /calendar/2018/7/holiday
 */
const regexFrom = cacheable(
    (path, caseSensitive) => regexFromString(
        path.replace(PARAMS_0, PARAMS_1), caseSensitive
    )
);

/**
 * @param   parentPath  /user/:username
 * @param   path        /calendar/:year/:month/:date
 * @param   pathname    /user/kuu12/calendar/2018/7/8
 * @returns             { year: '2018', month: '7', date: '8' }
*/
const paramsFrom = (parentPath, path, pathname) => {
    if (parentPath)
        pathname = pathname.replace(regexFrom(parentPath), '');

    const params = ['pathname'];
    const result = {};
    const string = path.replace(
        PARAMS_0,
        paramName => (
            params.push(paramName.slice(1)),
            PARAMS_1
        ),
    );
    (regexFromString(string).exec(pathname) || [])
        .filter(Boolean)
        .forEach((match, index) => {
            result[params[index]] = match;
        });

    return result;
};

export { regexFrom, paramsFrom };
