import React from 'react';

const HiddenLog = props => (
    <input
        className="hidden-log"
        readOnly
        value={JSON.stringify(props)}
    />
);

export default HiddenLog;
