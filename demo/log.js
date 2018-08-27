import React from 'react';

const Log = ({ id, data }) => {
    Log[id] = data;
    return null;
};

export default Log;

window.Log = Log;