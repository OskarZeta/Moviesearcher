import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieSimilar from '../../Components/Movie/MovieSimilar';

class MovieListSimilars extends Component {
  makeList() {
    let list;
    if (this.props.movieSimilars.results) {
      list = this.props.movieSimilars.results;
      return list.map((movie, index) => {
        if (index < 10) {
          return (
            <MovieSimilar key={movie.id}
                          id={movie.id}
                          name={movie.title}
                          poster={movie.poster_path}
                          settings={this.props.settings.images}
                          isFav={this.props.favorites.length > 0 ? (!!this.props.favorites.filter((favMovie) => {
                              return favMovie.id === movie.id;
                            }).length > 0)
                            : false}
            />
          );
        }
      });
    }
  }
  componentDidUpdate(prevProps){
    if (this.props.favorites !== prevProps.favorites) {
      localStorage.setItem('favorites', JSON.stringify(this.props.favorites));
    }
  }
  render() {
    return(
      <div className="MovieInfo__similar-wrapper">
        {this.makeList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    movieSimilars: state.movieSimilars,
    favorites: state.favorites
  }
};

export default connect(mapStateToProps)(MovieListSimilars);