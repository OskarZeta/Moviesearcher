import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageBtn from '../../Components/PageBtn';
import Spinner from '../../Components/Spinner';
import WithMovieList from './WithMovieList';
import {
  fetchMoviesDefault
} from '../../Redux/actions/movie_list/fetch_movies_default';

class MovieList extends Component {
  componentDidMount() {
    this.props.fetchFunction(
      Number.isNaN(this.props.page) ? 1 : this.props.page
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.page !== prevProps.page) {
      this.props.fetchFunction(
        Number.isNaN(this.props.page) ? 1 : this.props.page
      );
    }
  }
  render() {
    const { movieList, loading, page, makeList } = this.props;
    return(
      <div className="container container--movielist">
        {loading &&
          <div className="container--loading">
            <Spinner/>
          </div>
        }
        {!loading && makeList()}
        {movieList.length !== 0 &&
          <div className="Pagination">
            <PageBtn direction="prev" page={page} />
            <PageBtn direction="next" page={page} />
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
  fetchFunction: fetchMoviesDefault
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(WithMovieList(MovieList));
