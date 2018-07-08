import React from 'react';
import config from './config';

const NotFound = Component =>
    props =>
        Object
            .values(config.paths)
            .some(Boolean)
            ? null
            : <Component {...props} />;

export default NotFound;
