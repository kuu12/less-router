const separate = origin => {
    let pathname;
    let search;
    const index = origin.indexOf('?');
    if (index === -1) {
        pathname = origin;
        search = '';
    } else {
        pathname = origin.slice(0, index);
        search = origin.slice(index);
    }
    return { pathname, search };
};

export {
    separate,
};
