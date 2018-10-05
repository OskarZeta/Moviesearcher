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
    if (this.props.movieList) {
      list = this.props.movieList;
    }
    return list.map((movie, index) => {
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
  }
  componentDidMount(){
    this.props.fetchMoviesSorted(this.props.page, this.props.query.value, this.props.query.direction, this.props.query.genres);
  }
  componentDidUpdate(prevProps){
    if (this.props.page !== prevProps.page || this.props.query !== prevProps.query) {
      this.props.fetchMoviesSorted(this.props.page, this.props.query.value, this.props.query.direction, this.props.query.genres);
    }
  }
  render() {
    return(
      <div className="container container--movielist">
        {this.props.loading && <Spinner/>}
        {!this.props.loading && Object.keys(this.props.settings).length && this.makeList()}
        <div className="Pagination">
          <PageBtn direction="prev" query={decodeURIComponent(queryString.stringify(this.props.query))} page={this.props.page} />
          <PageBtn direction="next" query={decodeURIComponent(queryString.stringify(this.props.query))} page={this.props.page} />
        </div>
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