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

const separate = origin => {
    let pathname;
    let search;
    const index = origin.indexOf('?');
    if (index === -1) {
        pathname = origin;
        search = '';
    } else {
        pathname = origin.slice(0, index);
        search = origin.slice(index);
    }
    return { pathname, search };
};

const cacheable = func => {
    const cache = {};
    return function (arg) {
        if (!(arg in cache))
            cache[arg] = func.call(this, arg);
        return cache[arg];
    };
};

export {
    join,
    addHeadRemoveTail,
    separate,
    cacheable,
};
