import React from 'react';
import Routing from '../src';

const Child = ({ router }) => (
  <div id="child">
    Child is rendered.
  </div>
);

export default Routing(Child);
