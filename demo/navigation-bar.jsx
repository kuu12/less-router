import React from 'react';

const NavigationBar = ({ router, token, setToken }) => (
  <nav id="navigation-bar">
    <button name="basic" onClick={() => router.push('/basic')}>Try Basic Use</button>
    <button name="parameter" onClick={() => router.push('/parameter/kuu/12')}>Try URL Parameters </button>
    <button name="cache" onClick={() => router.push('/cache')}>Try Cache</button>
    <button name="dynamic" onClick={() => router.push('/dynamic/')}>Try Dynamic Routing</button>
    <button name="notfound" onClick={() => router.push(`/${Math.random()}`)}>Not Found</button>
    <button name="profile" onClick={() => router.push('/profile')}>My Profile (Try Login)</button>
    {
      token &&
      <button name="logout" onClick={() => {
        setToken(null);
        router.push('/');
      }}>Logout</button>
    }
    <br />
    <div>
      <span style={{ fontSize: 14 }}>Try Exclusive Routing : </span>
      <button name="one" onClick={() => router.push('/exclusive/one')}>Render First Route</button>
      <button name="two" onClick={() => router.push('/exclusive/two')}>Render Second Route</button>
      <button name="three" onClick={() => router.push('/exclusive/foobar')}>Render Third Route</button>
    </div>
    <br />
  </nav>
);

export default NavigationBar;
