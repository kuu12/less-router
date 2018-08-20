import React from 'react';
import Routing from '../src';

class NotFound extends React.Component {
  componentDidMount() {
    setTimeout(
      () => this.props.router.replace('/'),
      3000,
    );
  }
  render() {
    return (
      <div id="404 Not Found">
        Page not found. Redirect in 3s.
            </div>
    );
  }
}

export default Routing(NotFound);
