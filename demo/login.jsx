import React from 'react';
import Routing from '../src';

const Login = ({ router, setToken }) => (
  <div id="login">
    <label>
      Username: <input defaultValue="kuu12" />
    </label>
    <label>
      Password: <input type="password" defaultValue="foobar" />
    </label>
    <button onClick={() => {
      setToken(true);
      router.back();
    }}>
      Submit
    </button>
  </div>
);

export default Routing(Login);
