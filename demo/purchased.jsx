import React from 'react';
import Routing from '../src';
import data from './data';

const Purchased = ({ router }) => (
  <ul id="purchased">
    {data
      .filter(work => work.purchased)
      .map(work =>
        <li onClick={() => router.push(`/library/${work.id}`)}>
          {work.title}
        </li>
      )
    }
  </ul>
);

export default Routing(Purchased);
