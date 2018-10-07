const separate = pathnameAndSearch => {
    const fragment = pathnameAndSearch.split('?');
    return {
        pathname: fragment[0],
        search: fragment[1] ? `?${fragment[1]}` : '',
    };
};

const join = (parentPath, path) => {
    if (typeof path != 'string') path = '';
    else if (!/^\//.test(path)) path = `/${path}`;

    return addHeadRemoveTail(parentPath || '') + path;
};

const addHeadRemoveTail = path => path
    .replace(/^(?=[^/])/, '/')
    .replace(/\/+$/, '');

{
    var cacheable = func => {
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
}

export {
    separate,
    join,
    addHeadRemoveTail,
    cacheable,
};
