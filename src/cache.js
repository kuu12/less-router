import Set from 'set';

const string = new Set();
const pattern = new Set();
const regex = new Set();
const is_pattern = /:\w+/;

const set = path =>
    path instanceof RegExp ? regex :
        is_pattern.test(path) ? pattern :
            string;

const func = name => path =>
    set(path)[name](String(path));

const cache = {
    has: func('has'),
    add: func('add'),
    delete: func('delete'),
}

export default cache;
