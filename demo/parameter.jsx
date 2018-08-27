import React from 'react';
import Routing from '../src';
import Log from './log';

const Parameter = ({ name, id }) => (
  <div id="parameter">
    URL Parameters:
    <br />
    name: {name}
    <br />
    id: {id}
    <Log id="parameter" data={{ name, id }} />
  </div>
);

export default Routing(Parameter);
