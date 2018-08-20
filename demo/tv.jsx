import React from 'react';
import Routing from '../src';
import Genre from './genre';

const TV = ({ path, pathname, router }) => (
  <div id="tv">
    <button onClick={() => router.push(`${pathname}/action`)}>
      Action
    </button>
    <button onClick={() => router.push(`${pathname}/unit`)}>
      Unit Play
    </button>
    <Genre parentPath={path} path="/:genre" />
  </div>
);

export default Routing(TV);
