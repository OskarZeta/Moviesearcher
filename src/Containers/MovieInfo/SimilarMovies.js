import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovieSimilars } from '../../Redux/actions/movie_info/fetch_movie_similars';
import Spinner from '../../Components/Spinner';
import WithMovieList from '../MovieList/WithMovieList';

class SimilarMovies extends Component {
  componentDidMount() {
    this.props.fetchMovieSimilars(this.props.id, 1);
  }
  render() {
    const movies = this.props.movieSimilars;
    return(
      <>
        <h2 className="MovieInfo__section-header MovieInfo__section-header--similars">similar movies</h2>
        <div className="MovieInfo__info MovieInfo__info--similars">
          {Object.keys(movies).length === 0 && <Spinner/>}
          {Object.keys(movies).length !== 0 && movies.total_results !== 0 &&
            <div className="MovieInfo__similar-wrapper">
              {this.props.makeList("similars")}
            </div>
          }
          {Object.keys(movies).length !== 0 && movies.total_results === 0 &&
            <div className="MovieInfo__info MovieInfo__info--na MovieInfo__info--na-similars">Not available</div>
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    movieSimilars: state.movieSimilars
  }
};
const mapDispatchToProps = {
  fetchMovieSimilars
};

export default connect(mapStateToProps, mapDispatchToProps)(WithMovieList(SimilarMovies));
