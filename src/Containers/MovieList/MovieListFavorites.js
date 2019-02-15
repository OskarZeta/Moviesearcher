import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  loadFavorites
} from '../../Redux/actions/change_favorites';

import WithMovieList from './WithMovieList';

class MovieListFavorites extends Component {
  componentDidMount() {
    if (!this.props.favorites.length) {
      this.props.fetchFunction();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.favorites !== prevProps.favorites) {
      localStorage.setItem('favorite_movies', JSON.stringify(this.props.favorites));
    }
  }
  render() {
    return(
      <div className="container container--movielist">
        {this.props.makeList('favorites')}
        {this.props.favorites.length === 0 &&
          <span className="App__faves-empty">
            You don't have any favorites yet!
          </span>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.favorites
  }
};
const mapDispatchToProps = {
  fetchFunction: loadFavorites
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(WithMovieList(MovieListFavorites));
