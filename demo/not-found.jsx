import React from 'react';
import Routing from '../src';
import preview from './preview-code';

class NotFound extends React.Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.router.replace('/');
    }, 3000);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    preview();
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
