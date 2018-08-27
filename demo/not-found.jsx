import React from 'react';
import Routing from '../src';

class NotFound extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.router.replace('/');
    }, 3000);
  }
  render() {
    return (
      <div id="not-found">
        Nothing to show.
        <br />
        Redirect to home page in 3 seconds...
      </div>
    );
  }
}

export default Routing(NotFound);
