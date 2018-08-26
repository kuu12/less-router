export const delay = time => new Promise(resolve =>
    setTimeout(resolve, time)
);

export const getProps = containerId => JSON.parse(
    document
        .getElementById(containerId)
        .querySelector('.hidden-log')
        .value
);