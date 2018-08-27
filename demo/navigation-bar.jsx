import React from 'react'

const NavigationBar = ({ router, token }) => (
  <div id="navigation-bar">
    <button name="basic" onClick={() => router.push('/basic')}>Try Basic Use</button>
    <button name="parameter" onClick={() => router.push('/parameter/kuu/12')}>Try URL Parameters </button>
    <button name="cache" onClick={() => router.push('/cache')}>Try Cache</button>
    <button name="dynamic" onClick={() => router.push('/dynamic/')}>Try Dynamic Routing</button>
    <button name="one" onClick={() => router.push('/exclusive/one')}>Render First Route</button>
    <button name="two" onClick={() => router.push('/exclusive/two')}>Render Second Route</button>
    <button name="three" onClick={() => router.push('/exclusive/foobar')}>Render Third Route</button>
    <button name="profile" onClick={() => {
      if (token) {
        router.push('/profile');
      } else {
        router.push('/login');
      }
    }}>Check Out My Profile</button>
  </div>
);

export default NavigationBar;
