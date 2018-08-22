const locationState = (basename) => ({
    pathname: decodeURIComponent(
        location.pathname.replace(
            new RegExp(`^${basename}`), ''
        ) || '/'
    ),
    search: location.search,
});

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
    locationState,
    join,
    addHeadRemoveTail,
};
