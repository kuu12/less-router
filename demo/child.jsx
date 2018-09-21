import React from 'react';
import Routing from '../src';

const Child = ({ router }) => (
  <div id="child">
    Child is rendered.
    <pre className="prettyprint">
      {`
// child.jsx
import React from 'react';
import Routing from 'less-router';

const Child = ({ router }) => (
  <div id="child">
    Child is rendered.
  </div>
);

export default Routing(Child);
      `}
    </pre>
  </div>
);

export default Routing(Child);
