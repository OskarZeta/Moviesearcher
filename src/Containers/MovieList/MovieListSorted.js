import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageBtn from '../../Components/PageBtn';
import Spinner from '../../Components/Spinner';
import WithMovieList from './WithMovieList';
import {
  fetchMoviesSorted
 } from '../../Redux/actions/movie_list/fetch_movies_sorted';

const queryString = require('query-string');

class MovieListSorted extends Component {
  componentDidMount() {
    const { query, page } = this.props;
    this.props.fetchFunction(page, query.value, query.direction, query.genres);
  }
  componentDidUpdate(prevProps) {
    const { query, page } = this.props;
    if (page !== prevProps.page ||
        query.value !== prevProps.query.value ||
        query.direction !== prevProps.query.direction ||
        query.genres !== prevProps.query.genres
      ) {
      this.props.fetchFunction(page, query.value, query.direction, query.genres);
    }
  }
  render() {
    const { loading, movieList, query, page } = this.props;
    return(
      <div className="container container--movielist">
        {loading &&
          <div className="container--loading">
            <Spinner/>
          </div>
        }
        {!loading && movieList.length !== 0 && this.props.makeList()}
        {!loading && movieList.length === 0 &&
          <div className="container container--loading">
            <span>No movies found!</span>
          </div>
        }
        {movieList.length !== 0 &&
          <div className="Pagination">
            <PageBtn
              direction="prev"
              query={decodeURIComponent(queryString.stringify(query))}
              page={page}
            />
            <PageBtn
              direction="next"
              query={decodeURIComponent(queryString.stringify(query))}
              page={page}
            />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movieList: state.movieList,
    loading: state.loading
  }
};
const mapDispatchToProps = {
  fetchFunction: fetchMoviesSorted
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(WithMovieList(MovieListSorted));
