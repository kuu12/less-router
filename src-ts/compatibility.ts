export type Callback = (value?: unknown) => unknown;

const promiseCallback = (
    exec: (resolve?: Callback) => void,
    callback?: Callback,
) => window.Promise
        ? new Promise(exec).then(callback)
        : exec(callback);

const values = Object.values || (
    (obj: { [x: string]: any; }) => 
        Object.keys(obj).map(key => obj[key])
);

export { promiseCallback, values };
