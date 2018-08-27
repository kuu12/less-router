import React from 'react';
import Routing from '../src';
import Child from './child';
import Log from './log';

const Dynamic = ({ router, path, pathname }) => (
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

export default Routing(Dynamic);
