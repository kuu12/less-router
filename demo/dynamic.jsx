import React from 'react';
import Routing from '../src';
import Child from './child';
import Log from './log';
import preview from './preview-code';

const Dynamic = ({ router, path, pathname }) => (
  preview(code),
  <div id="dynamic">
    <Child parentPath={path} path="/child" />
    <button
      name="dynamic-child"
      onClick={() => router.push(`${pathname}/child`)}
    >
      Show Child
    </button>
    <Log id="dynamic" data={{ router, path, pathname }} />
  </div>
);

const code = `
// app.jsx
import Dynamic from './dynamic';
...
<Dynamic path="/dynamic/" title="Dynamic Routing" />

// dynamic.jsx
import React from 'react';
import Routing from 'less-router';
import Child from './child';

const Dynamic = ({ router, path, pathname }) => (
  <div id="dynamic">
    <Child parentPath={path} path="/child" />
    <button
      name="dynamic-child"
      onClick={() => router.push(\`\${pathname}/child\`)}
    >
      Show Child
    </button>
  </div>
);

export default Routing(Dynamic);
`;

export default Routing(Dynamic);
