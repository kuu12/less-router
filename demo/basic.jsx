import React from 'react';
import Routing from '../src';
import Log from './log';
import preview from './preview-code';

const Basic = ({ router }) => (
  preview(code),
  <div id="basic">
    Basic Route is match.
    <br />
    <button name="basic-back" onClick={() => router.back('home')}>Back to home page</button>
    <Log id="basic" data={{ router }} />
  </div>
);

const code = `
// app.jsx
import Basic from './basic';
...
<Basic path="/basic" title="Basic Route" />


// basic.jsx
import React from 'react';
import Routing from 'less-router';

const Basic = ({ router }) => (
  <div id="basic">
    Basic Route is match.
    <br />
    <button onClick={() => router.back('home')}>
      Back to home page
    </button>
  </div>
);

export default Routing(Basic);
`;

export default Routing(Basic);
