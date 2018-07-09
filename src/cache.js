import { param, regexFromPattern } from './path';

const regexFromString = string => new RegExp(`^${string}$`);

const regexFrompPath = path =>
    path instanceof RegExp ? path :
        param.test(path) ? regexFromPattern(path) :
            regexFromString(path);

const keyFromPath = path => String(regexFrompPath(path));

const store = {};

const cache = {
    has: path => Boolean(store[keyFromPath(path)]),
    add: path => store[keyFromPath(path)] = true,
    delete: path => delete store[keyFromPath(path)],
};

export default cache;
