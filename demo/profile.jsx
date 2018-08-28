import React from 'react';
import Routing from '../src';

class Profile extends React.Component {
  componentDidMount() {
    if (!this.props.token) {
      sessionStorage.setItem('loginRedirect', '/profile');
      this.props.router.push('/login');
      alert('Need Login');
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
