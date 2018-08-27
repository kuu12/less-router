import React from 'react';
import Routing from '../src';
import Log from './log';

const Basic = ({ router }) => (
  <div id="basic">
    Basic Route is match.
    <br />
    <button name="basic-back" onClick={() => router.back()}>Back to home page</button>
    <Log id="basic" data={{ router }} />
  </div>
);

export default Routing(Basic);
