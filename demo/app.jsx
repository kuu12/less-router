import React from 'react';
import Routing from '../src';
import TV from './tv';
import Movie from './movie';
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
        <div id="main">
          <Movie          // test basic use
            path="/movie"
            title="Movies"
            foo={11}
            bar={22}
          />
          <TV             // test dynamic routing
            path="/tv/"
            title="TV Series"
          />
          <Routing>
            <Purchased    // test exclusive route
              path="/library/purchased"
            />
            <Play         // test url parameters
              path="/library/:id"
            />
          </Routing>
          <NotFound       // test not found
            notFound
          />
        </div>
      </div>
    );
  }
}

export default Routing(App);
