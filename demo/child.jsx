import React from 'react';
import Routing from '../src';
import preview from './preview-code';

const Child = ({ router }) => (
  preview(code),
  <div id="child">
    Child is rendered.
  </div>
);

const code = `
// child.jsx
import React from 'react';
import Routing from 'less-router';

const Child = ({ router }) => (
  <div id="child">
    Child is rendered.
  </div>
);

export default Routing(Child);
`;

export default Routing(Child);
