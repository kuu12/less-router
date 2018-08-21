import React from 'react';
import Routing from '../src';
import HiddenLog from './hidden-log';

const Movie = ({ router, foo, bar, ...rest }) => (
  <div id="movie">
    foo is {foo}, bar is {bar}
    <HiddenLog {...{ router, foo, bar, ...rest }} />
  </div>
);

export default Routing(Movie);
