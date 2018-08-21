import React from 'react';
import Routing from '../src';
import { fetchData } from './data';

class Purchased extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
  }
  async componentDidMount() {
    const list = await fetchData();
    this.setState({ list });
  }
  render() {
    const { router } = this.props;
    return (
      <ul id="purchased">
        {this
          .state
          .list
          .filter(work => work.purchased)
          .map(work =>
            <li
              key={work.id}
              onClick={() => router.push(`/library/${work.id}`)}
            >
              {work.title}
            </li>
          )
        }
      </ul>
    );
  }
}

export default Routing(Purchased);
