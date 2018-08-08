export function cacheable(func) {
    const cache = {};
    return function (arg) {
        if (!(arg in cache))
            cache[arg] = func(arg);
        return cache[arg];
    };
}
