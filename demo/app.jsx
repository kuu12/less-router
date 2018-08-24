import React from 'react';
import Routing from '../src';
import Trending from './trending';
import Movie from './movie';
import TV from './tv';
import Purchased from './purchased';
import Play from './play';
import NotFound from './notfound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommend: {
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
        <div id="main">
          {/* test html file */}
          <Trending path="/" />

          {/* test basic use */}
          <Movie path="/movie" title="Movies" foo={11} bar={22} />

          {/* test dynamic routing */}
          <TV path="/tv/" title="TV Series" />

          {/* test exclusive route */}
          <Routing>
            {/* test caching */}
            <Purchased path="/library/purchased" autoCache />
            {/* test url parameters */}
            <Play path="/library/:id" />
          </Routing>

          {/* test not found */}
          <NotFound notFound />
        </div>

        <div id="sidebar">
          <button
            id="button-movie"
            onClick={() => router.push('/movie')}
          >
            Movies
          </button>
          <button
            id="button-tv"
            onClick={() => router.push('/tv')}
          >
            TV Series
          </button>
          <button
            id="button-purchased"
            onClick={() => router.push('/library/purchased')}
          >
            Purchased
          </button>
          <img
            id="recommend"
            alt={this.state.recommend.title}
            src={this.state.recommend.image}
            onClick={() => router.push(`/library/${this.state.recommend.id}`)}
          />
        </div>
      </div>
    );
  }
}

export default Routing(App);
