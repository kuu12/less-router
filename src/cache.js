import Set from 'set';

const string = new Set();
const pattern = new Set();
const regex = new Set();
const is_pattern = /:\w+/;

const whichSet = path =>
    path instanceof RegExp ? regex :
        is_pattern.test(path) ? pattern :
            string;

const uniformFunction = name =>
    path =>
        whichSet(path)[name](String(path));

const cache = {
    has: uniformFunction('has'),
    add: uniformFunction('add'),
    delete: uniformFunction('delete'),
};

export default cache;
