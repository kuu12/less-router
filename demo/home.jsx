import React from 'react';
import Routing from '../src';
import preview from './preview-code';

const Home = () => (
  preview(code),
  <div id="home">
    Home
  </div>
);

const code = `
import React from 'react';
import Routing from 'less-router';

const Home = () => (
  <div id="home">
    Home
  </div>
);

export default Routing(Home);
`;

export default Routing(Home);
