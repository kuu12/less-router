import React from 'react';
import Routing from '../src';
import Genre from './genre';
import HiddenLog from './hidden-log';

const TV = ({ path, pathname, router }) => (
  <div id="tv">
    <button
      id="button-action"
      onClick={() => router.push(`${pathname}/action`)}
    >
      Action
    </button>
    <button
      id="button-unit"
      onClick={() => router.push(`${pathname}/unit`)}
    >
      Unit Play
    </button>
    <Genre parentPath={path} path="/:genre" />
    <HiddenLog {...{ path, pathname, router }} />
  </div>
);

export default Routing(TV);
