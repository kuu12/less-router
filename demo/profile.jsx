import React from 'react';
import Routing from '../src';
import preview from './preview-code';

class Profile extends React.Component {
  componentDidMount() {
    if (!this.props.token) {
      sessionStorage.setItem('loginRedirect', '/profile');
      this.props.router.push('/login');
    }
  }
  render() {
    preview(code);

    return (
      <div id="profile">
        My Profile
        <br />
        balance: $ 100.00
      </div>
    );
  }
}

const code = `
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
`;

export default Routing(Profile);
