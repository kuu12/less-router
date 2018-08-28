import React from 'react';
import Routing from '../src';

import NavigationBar from './navigation-bar';
import Log from './log';

import Basic from './basic';
import Parameter from './parameter';
import Cache from './cache';
import Dynamic from './dynamic';
import One from './one';
import Two from './two';
import Three from './three';
import Login from './login';
import Profile from './profile';
import NotFound from './not-found';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: null };
    this.setToken = token => this.setState({ token });
  }

  render() {
    return (
      <React.Fragment>
        <h4>Demo of <a href="https://github.com/kuu12/less-router">Less-Router</a></h4>
        {
          this.props.router.pathname !== '/login' &&
          <NavigationBar
            router={this.props.router}
            token={this.state.token}
            setToken={this.setToken}
          />
        }
        <p>
          <Basic path="/basic" title="Basic Route" />
          <Parameter path="/parameter/:name/:id" title="URL Parameters" />
          <Cache path="/cache" title="Cache" autoCache />
          <Dynamic path="/dynamic/" title="Dynamic Routing" />
          <Login path="/login" title="Login" setToken={this.setToken} />
          <Profile path="/profile" title="profile" token={this.state.token} />
          <Routing>
            <One path="/exclusive/one" title="Exclusive Route 1" />
            <Two path="/exclusive/two" title="Exclusive Route 2" autoCache />
            <Three path="/exclusive/:any" title="Exclusive Route 3" />
          </Routing>
          <NotFound notFound title="404 Not Found" />
        </p>
        <Log id="app" data={this.props} />
      </React.Fragment>
    );
  }
}

export default Routing(App);
