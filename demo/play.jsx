import React from 'react';
import Routing from '../src';
import data from './data';

const Play = ({ router, id }) => {
  const work = data.find(w => w.id == id);
  return (
    <div id="play">
      Playing
      {work.title}
    </div>
  );
};

export default Routing(Play);
