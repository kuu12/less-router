export const PARAMS = /:\w+(?=\W?)/g;
export const PARAMS_REPLACEMENT = '(\\w+)';

export function cacheable(func) {
    const cache = {};
    return function (arg) {
        if (!(arg in cache))
            cache[arg] = func(arg);
        return cache[arg];
    };
}
