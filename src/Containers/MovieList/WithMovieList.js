import React, { Component } from 'react';
import Movie from '../../Components/Movie/Movie';
import MovieSimilar from '../../Components/Movie/MovieSimilar';

const WithMovieList = MovieListComponent =>
  class extends Component {
  _isFavorite(movie) {
    let favorites = this.props.favorites;
    if (favorites.length) {
      return favorites.some(fav => fav.id === movie.id);
    }
    return false;
  }
  makeList = type => {
    let list;
    let trigger;
    let limiter;
    if (type === 'favorites') {
      list = this.props.favorites;
      trigger = list.length;
    } else if (type === 'similars') {
      list = this.props.movieSimilars.results;
      trigger = this.props.movieSimilars.results;
      limiter = 10;
    } else {
      list = this.props.movieList;
      trigger = list.length;
    }
    if (trigger) {
      if (limiter) {
        list = list.filter((_, i) => i < limiter);
      }
      return list.map(movie => {
        const params = {
          key: movie.id,
          id : movie.id,
          name : movie.title,
          poster : movie.poster_path,
          settings : this.props.settings.images,
          isFav : this._isFavorite(movie)
        };
        return (type !== 'similars' ?
          <Movie {...params} /> : <MovieSimilar {...params} />
        );
      });
    }
  }
  render() {
    return(
      <MovieListComponent
        makeList = { this.makeList }
        { ...this.props }
      />
    );
  }
}

export default WithMovieList;
