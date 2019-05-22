import React from 'react';
import Routing from '../src';
import preview from './preview-code';

const One = ({ router }) => (
  preview(),
  <div id="one">
    One is rendered.
  </div>
);

export default Routing(One);
