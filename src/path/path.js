import { cacheable } from './helper';
import state from '../state';

/**
 *  /basename/xxx   ->   /xxx
 *  /basename       ->   /
 */
let pathname; {
    const raw = pathname =>
        decodeURIComponent(pathname).replace(
            new RegExp('^' + state.basename), ''
        ) || '/';
    const cache = cacheable(raw);
    pathname = () => cache(location.pathname);
}

const join = (...paths) => {
    let fullPath = paths
        .filter(Boolean)
        .filter(path => '/' !== path)
        .map(addHeadRemoveTail)
        .join('');

    const last = paths[paths.length - 1];
    if (last && last.endsWith('/'))
        fullPath += '/';

    return fullPath || '/';
};

const addHeadRemoveTail = path => path
    .replace(/\/+$/, '')
    .replace(/^(?=[^/])/, '/');

export {
    pathname,
    join,
    addHeadRemoveTail,
};
