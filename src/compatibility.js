const promiseAndCallback = (exec, callback) => window.Promise
    ? new Promise(exec).then(callback)
    : exec(callback);

const values =
    Object.values ||
    (obj => Object.keys(obj).map(key => obj[key]));

export { promiseAndCallback, values };
