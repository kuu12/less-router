const join = (parentPath, path) => {
    parentPath = addHeadRemoveTail(parentPath || '');

    if (typeof path != 'string') path = '';
    else if (!path.startsWith('/')) path = `/${path}`;

    return parentPath + path;
};

const addHeadRemoveTail = path => path
    .replace(/^(?=[^/])/, '/')
    .replace(/\/+$/, '');

const separate = pathnameAndSearch => {
    const fragment = pathnameAndSearch.split('?');
    return {
        pathname: fragment[0],
        search: fragment[1] ? `?${fragment[1]}` : '',
    };
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
