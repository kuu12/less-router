import React from 'react';
import Routing from '../src';
import preview from './preview-code';

const Three = () => (
  preview(),
  <div id="three">
    Three is rendered.
</div>
);

export default Routing(Three);
