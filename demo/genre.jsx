import React from 'react';
import Routing from '../src';
import data from './data';

const Genre = ({ router, genre }) => (
  <div id="genre">
    {genre} ...
    <ul>
      {data
        .filter(work => work
          .genre
          .find(g => g === genre)
        )
        .map(work =>
          <li onClick={() => router.push(`/library/${work.id}`)}>
            {work.title}
          </li>
        )
      }
    </ul>
    <button onClick={() => router.back()}>
      Back
    </button>
  </div>
);

export default Routing(Genre);
