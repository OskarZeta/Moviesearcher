import React, { Component } from 'react';
import { connect } from 'react-redux';

import Movie from '../../Components/Movie';
import PageBtn from '../../Components/PageBtn';
import Spinner from '../../Components/Spinner';
import {
  fetchMoviesDefault
} from '../../Redux/actions/movie_list/fetch_movies_default';

class MovieListSimilars extends Component {
  makeList() {
    let list;
    // if (this.props.movieList && !this.props.favsPage) {
    //   list = this.props.movieList;
    // } else if (this.props.favsPage) {
    //   list = this.props.favorites;
    // }
    if (this.props.movieList) {
      list = this.props.movieList;
    }
    if (Object.keys(this.props.settings).length) {
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
    //console.log(this.props.movieList);
    return(
      <div className="container container--movielist">
        {/*{this.props.movieList.length === 0 && <Spinner/>}*/}
        {/*{this.props.movieList.length !== 0 && this.makeList()}*/}
        {this.props.loading && <Spinner/>}
        {!this.props.loading && this.makeList()}
        <div className="Pagination">
          {/*<PageBtn direction="prev" searchQuery={this.props.searchQuery} page={this.props.page} genresSelected={this.props.genresSelected} sortValue={this.props.sortValue} sortDir={this.props.sortDir}/>*/}
          {/*<PageBtn direction="next" searchQuery={this.props.searchQuery} page={this.props.page} genresSelected={this.props.genresSelected} sortValue={this.props.sortValue} sortDir={this.props.sortDir}/>*/}
          <PageBtn direction="prev" page={this.props.page} />
          <PageBtn direction="next" page={this.props.page} />
        </div>
        {/*<Pagination page={this.props.page}/>*/}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  //console.log(state);
  return {
    settings: state.settings,
    movieList: state.movieList,
    page: props.page,
    //page: props.page || state.page,
    favorites: state.favorites,
    loading: state.loading
  }
};
const mapDispatchToProps = {
  fetchMoviesDefault
};
//export default MovieList;
export default connect(mapStateToProps, mapDispatchToProps)(MovieListSimilars);