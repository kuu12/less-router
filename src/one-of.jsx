import React from 'react';
import proxy from './proxy';
import matching from './path/match';

const OneOf = ({ children }) => {
    let found = false;

    return [].concat(children).map(child => {
        const { parentPath, path } = child.props;
        const { match, cached } = matching(
            parentPath, path, proxy.router.pathname,
        );
        if (found) {
            return !match && cached ? child : <div key={path} />;
        } else {
            if (match) found = match;
            return match || cached ? child : <div key={path} />;
        }
    });
};

export default OneOf;
