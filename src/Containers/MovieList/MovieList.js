import React, { Component } from 'react';
import { connect } from 'react-redux';

import Movie from '../../Components/Movie';
import PageBtn from '../../Components/PageBtn';
import Spinner from '../../Components/Spinner';
import {
  fetchMoviesDefault
} from '../../Redux/actions/movie_list/fetch_movies_default';

class MovieList extends Component {
  makeList() {
    let list;
    if (this.props.movieList) {
      list = this.props.movieList;
    }
    return list.map((movie, index) => {
      //if (this.props.usePreview && list.length > 10) {
      //if (index < 10) {
      return(
        <Movie key={movie.id}
               id={movie.id}
               name={movie.title}
               poster={movie.poster_path}
               settings={this.props.settings.images}
          //usePreview={this.props.usePreview}
          //favorites={this.props.favorites}
               isFav = {this.props.favorites.length > 0 ? (!!this.props.favorites.filter((favMovie) => {
                   return favMovie.id === movie.id;}).length > 0)
                 : false}
        />
      );
    });
  }
  componentDidMount(){
    this.props.fetchMoviesDefault(Number.isNaN(this.props.page) ? 1 : this.props.page);
  }
  componentDidUpdate(prevProps){
    if (this.props.page !== prevProps.page) {
      this.props.fetchMoviesDefault(Number.isNaN(this.props.page) ? 1 : this.props.page);
    }
  }
  render() {
    return(
      <div className="container container--movielist">
        {this.props.loading && <Spinner/>}
        {!this.props.loading && Object.keys(this.props.settings).length && this.makeList()}
        <div className="Pagination">
          <PageBtn direction="prev" page={this.props.page} />
          <PageBtn direction="next" page={this.props.page} />
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
  fetchMoviesDefault
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);