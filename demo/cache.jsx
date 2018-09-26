import React from 'react';
import Routing from '../src';
import Log from './log';
import preview from './preview-code';

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
    preview(code);

    const { router } = this.props;
    return (
      <div id="cache">
        Start Time: {this.state.start}
        <br />
        Counting: {this.state.count}
        <br />
        <button name="clear-cache" onClick={async () => {
          await router.replace('/');
          await router.clearCache('/cache');
          console.log('clear');
        }}>Back to Home Page and Clear Cache</button>
      </div>
    );
  }
}

const code = `
// app.jsx
import Cache from './cache';
...
<Cache path="/cache" title="Cache" autoCache />

// cache.jsx
import React from 'react';
import Routing from 'less-router';

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
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { router } = this.props;
    return (
      <div id="cache">
        Start Time: {this.state.start}
        <br />
        Counting: {this.state.count}
        <br />
        <button name="clear-cache" onClick={async () => {
          await router.replace('/');
          await router.clearCache('/cache');
          console.log('clear');
        }}>Back to Home Page and Clear Cache</button>
      </div>
    );
  }
}

export default Routing(Cache);
`;

export default Routing(Cache);
