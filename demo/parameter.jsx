import React from 'react';
import Routing from '../src';
import Log from './log';
import preview from './preview-code';

const Parameter = ({ name, id }) => (
  preview(code),
  <div id="parameter">
    URL Parameters:
    <br />
    name: {name}
    <br />
    id: {id}
    <Log id="parameter" data={{ name, id }} />
  </div>
);

const code = `
// app.jsx
import Parameter from './basic';
...
<Parameter path="/parameter/:name/:id" title="URL Parameters" />


// basic.jsx
import React from 'react';
import Routing from 'less-router';

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

export default Routing(Basic);
`;

export default Routing(Parameter);
