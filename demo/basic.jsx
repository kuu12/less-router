import React from 'react';
import Routing from '../src';
import Log from './log';

const Basic = ({ router }) => (
  <div id="basic">
    Basic Route is match.
    <br />
    <button name="basic-back" onClick={() => router.back('home')}>Back to home page</button>
    <pre className="prettyprint">
      {`
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
      `}
    </pre>
    <Log id="basic" data={{ router }} />
  </div>
);

export default Routing(Basic);
