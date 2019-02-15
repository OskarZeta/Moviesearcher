import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageBtn from '../../Components/PageBtn';
import Spinner from '../../Components/Spinner';
import WithMovieList from './WithMovieList';
import {
  fetchMoviesSearched
 } from '../../Redux/actions/movie_list/fetch_movies_searched';

const queryString = require('query-string');

class MovieListSearched extends Component {
  componentDidMount() {
    this.props.fetchFunction(this.props.page, this.props.query.q);
  }
  componentDidUpdate(prevProps) {
    const { page, query } = this.props;
    if (page !== prevProps.page || query.q !== prevProps.query.q) {
      this.props.fetchFunction(page, query.q);
    }
  }
  render() {
    const { loading, settings, movieList, query, page } = this.props;
    return(
      <div className="container container--movielist">
        {loading &&
          <div className="container--loading">
            <Spinner/>
          </div>
        }
        {!loading && Object.keys(settings).length && this.props.makeList()}
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
  fetchFunction: fetchMoviesSearched
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(WithMovieList(MovieListSearched));
