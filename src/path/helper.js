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

const separate = pathnameAndSearch => {
    let pathname;
    let search;
    const index = pathnameAndSearch.indexOf('?');
    if (index === -1) {
        pathname = pathnameAndSearch;
        search = '';
    } else {
        pathname = pathnameAndSearch.slice(0, index);
        search = pathnameAndSearch.slice(index);
    }
    return { pathname, search };
};

const cacheable = func => {
    const cache = {};
    return function (...args) {
        const key = args.join(symbol);
        if (!(key in cache)) {
            cache[key] = func.apply(this, args);
        }
        return cache[key];
    };
};

const symbol = Math.random();

export {
    join,
    addHeadRemoveTail,
    separate,
    cacheable,
};
