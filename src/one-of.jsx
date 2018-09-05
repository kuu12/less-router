import React from 'react';
import { matching } from './path/match';

const OneOf = ({ children }) => {
    let found = false;

    return [].concat(children).map(child => {
        const { parentPath, path } = child.props;
        const { match, cached } = matching(parentPath, path);

        if (!found && match) {
            found = true;
            return child;
        } else if (!match && cached) {
            return child;
        } else {
            return <div key={path} />;
        }
    });
};

export default OneOf;
