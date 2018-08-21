import React from 'react';
import Routing from '../src';
import data from './data';
import HiddenLog from './hidden-log';

const Genre = ({ router, genre, ...rest }) => (
  <div id="genre">
    {genre} ...
    <ul>
      {data
        .filter(work => work
          .genre
          .find(g => g === genre)
        )
        .map(work =>
          <li
            key={work.id}
            onClick={() => router.push(`/library/${work.id}`)}
          >
            {work.title}
          </li>
        )
      }
    </ul>
    <button
      id="button-back"
      onClick={() => router.back()}
    >
      Back
    </button>
    <HiddenLog {...{ genre, ...rest }} />
  </div>
);

export default Routing(Genre);
