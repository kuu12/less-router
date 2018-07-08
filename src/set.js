const Set = typeof Set === 'function'
    ? Set
    : class {
        constructor(array = []) {
            this.__set__ = {};
            array.forEach(value =>
                this.__set__[value] = true
            );
        }

        has(value) {
            return Boolean(this.__set__[value]);
        }

        add(value) {
            this.__set__[value] = true;
        }

        delete(value) {
            delete this.__set__[value];
        }
    };

export default Set;
