export const promiseAndCallback = (exec, callback) =>
    typeof window.Promise === 'function'
        ? new window.Promise(exec).then(callback)
        : exec(callback);

export function cacheable(func) {
    const cache = {};
    return function (arg) {
        if (!(arg in cache))
            cache[arg] = func(arg);
        return cache[arg];
    };
}
