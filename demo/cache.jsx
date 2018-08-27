import React from 'react';
import Routing from '../src';
import Log from './log';

Log.cache = { mount: 0 };

class Cache extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: new Date().toLocaleString(),
      count: 0,
    };
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        count: this.state.count + 1,
      });
    }, 1000);
    Log.cache.mount += 1;
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <div id="cache">
        Start Time: {this.state.start}
        <br />
        Counting: {this.state.count}
      </div>
    );
  }
}

export default Routing(Cache);
