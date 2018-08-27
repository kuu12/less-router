import React from 'react';
import Routing from '../src';
import Child from './child';

const Dynamic = ({ router, path, pathname }) => (
  <div id="dynamic">

    <Child parentPath={path} path="/child" />
  </div>
);

export default Routing(Dynamic);
