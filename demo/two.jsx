import React from 'react';
import Routing from '../src';
import preview from './preview-code';

class Two extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <div id="two">
        Two is rendered.
        <br />
        Two existed time: {this.state.count} seconds
        <br />
        <button onClick={() => router.back()}>Back to home page</button>
      </div>
    );
  }
}

export default Routing(Two);
