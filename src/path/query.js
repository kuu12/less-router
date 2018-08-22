import state from '../state';

const separate = origin => {
    const index = origin.indexOf('?');
    if (index === -1) return {
        pathname: origin,
        search: '',
    };

    const pathname = origin.slice(0, index);
    const search = origin.slice(index);

    return { pathname, search };
};

const handle = ({ pathname, search }) => {
    if (!state.keep) return { pathname, search };

    const regex = /([^&=]+)=?([^&]*)/g;
    const params = {};
    let match;

    while (match = regex.exec(search)) // eslint-disable-line no-cond-assign
        params[match[1]] = match[2];

    if (state.keep instanceof Array) {
        state.keep.forEach(name => {
            state.query[name] = params[name];
        });
    } else {
        Object.assign(state.query, params);
    }

    Object
        .keys(state.query)
        .filter(name => !(name in params))
        .forEach(name => {
            search += `&${name}=${state.query[name]}`;
        });

    return { pathname, search };
};

export {
    separate,
    handle,
};
