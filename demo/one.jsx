import React from 'react';
import Routing from '../src';

const One = ({ router }) => (
  <div id="one">
    One is rendered.
  </div>
);

export default Routing(One);
