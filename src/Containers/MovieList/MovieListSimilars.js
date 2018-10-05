import React, { Component } from 'react';
import { connect } from 'react-redux';

import MovieSimilar from '../../Components/Movie/MovieSimilar';
import PageBtn from '../../Components/PageBtn';
import Spinner from '../../Components/Spinner';
import {
  //fetchMoviesDefault
} from '../../Redux/actions/movie_list/fetch_movies_default';

class MovieListSimilars extends Component {
  makeList() {
    let list;
    // if (this.props.movieList && !this.props.favsPage) {
    //   list = this.props.movieList;
    // } else if (this.props.favsPage) {
    //   list = this.props.favorites;
    // }
    if (this.props.movieSimilars.results) {
      list = this.props.movieSimilars.results;
    }
    //if (Object.keys(this.props.settings).length) {
      return list.map((movie, index) => {
        //if (this.props.usePreview && list.length > 10) {
        if (index < 10) {
          return (
            <MovieSimilar key={movie.id}
                   id={movie.id}
                   name={movie.title}
                   poster={movie.poster_path}
                   settings={this.props.settings.images}
                    //usePreview={this.props.usePreview}
                    //favorites={this.props.favorites}
                   isFav={this.props.favorites.length > 0 ? (!!this.props.favorites.filter((favMovie) => {
                       return favMovie.id === movie.id;
                     }).length > 0)
                     : false}
            />
          );
        }
      });
    //}
  }
  componentDidMount(){
    //this.props.fetchMoviesDefault(Number.isNaN(this.props.page) ? 1 : this.props.page);
  }
  componentDidUpdate(prevProps){
    //if (this.props.page !== prevProps.page) {
    //  this.props.fetchMoviesDefault(Number.isNaN(this.props.page) ? 1 : this.props.page);
    //}
  }
  render() {
    //console.log(this.props.movieList);
    return(
      <div className="MovieInfo__similar-wrapper">
        {/*{this.props.movieList.length === 0 && <Spinner/>}*/}
        {/*{this.props.movieList.length !== 0 && this.makeList()}*/}
        {/*{this.props.loading && <Spinner/>}*/}
        {/*{!this.props.loading && this.makeList()}*/}
        {this.makeList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    settings: state.settings,
    movieSimilars: state.movieSimilars,
    favorites: state.favorites
  }
};
const mapDispatchToProps = {
  //fetchMoviesDefault
};
//export default MovieList;
export default connect(mapStateToProps, mapDispatchToProps)(MovieListSimilars);