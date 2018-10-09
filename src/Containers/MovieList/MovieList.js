import React, { Component } from 'react';
import { connect } from 'react-redux';

import Movie from '../../Components/Movie/Movie';
import PageBtn from '../../Components/PageBtn';
import Spinner from '../../Components/Spinner';
import {
  fetchMoviesDefault
} from '../../Redux/actions/movie_list/fetch_movies_default';

class MovieList extends Component {
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
    }
  }
  componentDidMount(){
    this.props.fetchMoviesDefault(Number.isNaN(this.props.page) ? 1 : this.props.page);
  }
  componentDidUpdate(prevProps){
    if (this.props.page !== prevProps.page) {
      this.props.fetchMoviesDefault(Number.isNaN(this.props.page) ? 1 : this.props.page);
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
        {!this.props.loading && Object.keys(this.props.settings).length !== 0 && this.makeList()}
        {this.props.movieList.length !== 0 && <div className="Pagination">
          <PageBtn direction="prev" page={this.props.page} />
          <PageBtn direction="next" page={this.props.page} />
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
  fetchMoviesDefault
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);