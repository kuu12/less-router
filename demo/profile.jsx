import React from 'react';
import Routing from '../src';

class Profile extends React.Component {
  componentDidMount() {
    if (!this.props.token) {
      sessionStorage.setItem('loginRedirect', '/profile');
      this.props.router.push('/login');
    }
  }
  render() {
    return (
      <div id="profile">
        My Profile
        <br />
        balance: $ 100.00
        <pre className="prettyprint">
          {`
import React from 'react';
import Routing from 'less-router';

class Profile extends React.Component {
  componentDidMount() {
    if (!this.props.token) {
      sessionStorage.setItem('loginRedirect', '/profile');
      this.props.router.push('/login');
    }
  }
  render() {
    return (
      <div id="profile">
        My Profile
        <br />
        balance: $ 100.00
    </div>
    );
  }
}

export default Routing(Profile);
        `}
        </pre>
      </div>
    );
  }
}

export default Routing(Profile);
