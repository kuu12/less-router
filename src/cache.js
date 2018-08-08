import { regexFromPath } from './path';
import state from './state';

const cache = {
    has: path => Boolean(state.cache[regexFromPath(path)]),
    add: path => state.cache[regexFromPath(path)] = true,
    delete: path => delete state.cache[regexFromPath(path)],
};

export default cache;
