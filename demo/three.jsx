import React from 'react';
import Routing from '../src';

class Three extends React.Component {
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
      <div id="three">
        Three is rendered.
        <br />
        Three existed time: {this.state.count} seconds
        <br />
        <button onClick={() => router.back()}>Back to home page</button>
      </div>
    );
  }
}

export default Routing(Three);
