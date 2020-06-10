const separate = (pathnameAndSearch: string) => {
    const [pathname, search] = pathnameAndSearch.split('?');
    return {
        pathname,
        search: search && `?${search}`,
    };
};

const addHeadRemoveTail = (path: string) => path
    .replace(/^(?=[^/])/, '/')
    .replace(/\/+$/, '');

const join = (parentPath: null | string, path: string) => {
    if (typeof path != 'string') path = '';
    else if (!/^\//.test(path)) path = `/${path}`;

    return addHeadRemoveTail(parentPath || '') + path;
};

const cacheSymbol = `${Math.random()}`;
type BasicType = boolean | number | string | null;
const cacheable = <Args extends BasicType[], Ret>
    (func: (...args: Args) => Ret): ((...args: Args) => Ret) => {
    const cache: Record<string, Ret> = {};
    return function (...args) {
        const key = args.join(cacheSymbol);
        if (!(key in cache)) {
            cache[key] = func.apply(this, args);
        }
        return cache[key];
    };
};

type DrawOwnProps<Super, Sub extends Super> = {
    [key in Exclude<
        keyof Sub,
        keyof Super
    >]: Sub[key]
};

export {
    separate,
    join,
    addHeadRemoveTail,
    cacheable,
    DrawOwnProps,
};