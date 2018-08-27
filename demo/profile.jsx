import React from 'react';
import Routing from '../src';

const Profile = ({ router }) => (
  <div id="profile">
    My Profile
    <br />
    balance: $ 100.00
  </div>
);

export default Routing(Profile);
