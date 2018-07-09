import { regexFromPath } from './path';

const keyFromPath = path => String(regexFromPath(path));

const store = {};

const cache = {
    has: path => Boolean(store[keyFromPath(path)]),
    add: path => store[keyFromPath(path)] = true,
    delete: path => delete store[keyFromPath(path)],
};

export default cache;
