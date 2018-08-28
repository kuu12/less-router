import React from 'react';
import Routing from '../src';

const Login = ({ router, setToken }) => (
  <div id="login">
    <label>
      Username: <input defaultValue="kuu12" />
    </label>
    <br />
    <label>
      Password: <input type="password" defaultValue="foobar" />
    </label>
    <br />
    <button onClick={() => {
      setToken(true);
      router.replace(
        sessionStorage.getItem('loginRedirect') ||
        '/'
      );
    }}>
      Submit
    </button>
  </div>
);

export default Routing(Login);
