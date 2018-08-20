import React from 'react';
import Routing from '../src';
import TV from './tv';
import Movie from './movie';
import NotFound from './notfound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advise: {
        id: 12345,
        title: 'S.A.C 2nd GIG',
        image: 'https://images-na.ssl-images-amazon.com/images/I/516I1mJy5KL._SY445_.jpg',
      }
    };
  }
  render() {
    const { router } = this.props;
    return (
      <div id="app">
        <div id="sidebar">
          <button onClick={() => router.push('/tv')}>
            TV Series
          </button>
          <button onClick={() => router.push('/movie')}>
            Movie
          </button>
          <button onClick={() => router.push('/library/purchased')}>
            Purchased
          </button>
          <img
            alt={this.state.advise.title}
            src={this.state.advise.image}
            onClick={() =>
              router.push(`/library/${this.state.advise.id}`)
            }
          />
        </div>
        <div id="main">
          <TV path="/tv" title="TV Series" />
          <Movie path="/movie" title="Movies" />
          <Routing>
            <Purchased path="/library/purchased" />
            <Play path="/library/:id" />
          </Routing>
          <NotFound notFound />
        </div>
      </div>
    );
  }
}

export default Routing(App);
