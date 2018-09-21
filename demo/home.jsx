import React from 'react';
import Routing from '../src';

const Home = () => (
  <div id="home">
    Home
    <pre className="prettyprint">
      {`
import React from 'react';
import Routing from 'less-router';

const Home = () => (
  <div id="home">
    Home
  </div>
);

export default Routing(Home);
      `}
    </pre>
  </div>
);

export default Routing(Home);
