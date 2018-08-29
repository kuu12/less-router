import React from 'react';
import proxy from './proxy';

const A = ({ method = 'push', onClick, href, children, ...attrs }) => (
    <a
        href={proxy.router.basename + href}
        onClick={event => {
            event.preventDefault();

            const go = () => proxy.router[method](href);

            if (!onClick) return go();

            const result = onClick(event);

            if (result && result.then) return result.then(go);

            if (result !== false) go();
        }}
        {...attrs}
    >{children}</a>
);

export default A;
