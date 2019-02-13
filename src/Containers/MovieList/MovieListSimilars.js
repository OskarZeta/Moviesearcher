import React, { Component } from 'react';
import { connect } from 'react-redux';
import WithMovieList from './WithMovieList';

class MovieListSimilars extends Component {
  render() {
    return(
      <div className="MovieInfo__similar-wrapper">
        {this.props.makeList("similars")}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings,
    movieSimilars: state.movieSimilars,
    favorites: state.favorites
  }
};

export default connect(mapStateToProps)(WithMovieList(MovieListSimilars));
