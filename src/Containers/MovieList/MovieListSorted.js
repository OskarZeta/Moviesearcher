import React, { Component } from 'react';
import { connect } from 'react-redux';

import Movie from '../../Components/Movie/Movie';
import PageBtn from '../../Components/PageBtn';
import Spinner from '../../Components/Spinner';
import {
  fetchMoviesSorted
} from '../../Redux/actions/movie_list/fetch_movies_sorted';

const queryString = require('query-string');

class MovieListSorted extends Component {
  makeList() {
    let list;
    if (this.props.movieList.length !== 0) {
      list = this.props.movieList;
      return list.map((movie) => {
        return(
          <Movie key={movie.id}
                 id={movie.id}
                 name={movie.title}
                 poster={movie.poster_path}
                 settings={this.props.settings.images}
                 isFav = {this.props.favorites.length > 0 ? (!!this.props.favorites.filter((favMovie) => {
                     return favMovie.id === movie.id;}).length > 0)
                   : false}
          />
        );
      });
    } else {
      return (
        <div className="container container--loading">
          <span>No movies found!</span>
        </div>
      );
    }
  }
  componentDidMount(){
    this.props.fetchMoviesSorted(this.props.page, this.props.query.value, this.props.query.direction, this.props.query.genres);
  }
  componentDidUpdate(prevProps){
    if (this.props.page !== prevProps.page || this.props.query !== prevProps.query) {
      this.props.fetchMoviesSorted(this.props.page, this.props.query.value, this.props.query.direction, this.props.query.genres);
    }
    if (this.props.favorites !== prevProps.favorites) {
      localStorage.setItem('favorites', JSON.stringify(this.props.favorites));
    }
  }
  render() {
    return(
      <div className="container container--movielist">
        {this.props.loading &&
          <div className="container--loading">
            <Spinner/>
          </div>
        }
        {!this.props.loading && Object.keys(this.props.settings).length && this.makeList()}
        {this.props.movieList.length !== 0 && <div className="Pagination">
          <PageBtn direction="prev" query={decodeURIComponent(queryString.stringify(this.props.query))} page={this.props.page} />
          <PageBtn direction="next" query={decodeURIComponent(queryString.stringify(this.props.query))} page={this.props.page} />
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    movieList: state.movieList,
    favorites: state.favorites,
    loading: state.loading
  }
};
const mapDispatchToProps = {
  fetchMoviesSorted
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieListSorted);