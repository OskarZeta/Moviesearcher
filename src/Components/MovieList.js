import React, { Component } from 'react';
import Movie from './Movie';

class MovieList extends Component {
  makeList() {
    let list;
    if (this.props.movieList && !this.props.favsPage) {
      list = this.props.movieList;
    } else if (this.props.favsPage) {
      list = this.props.favorites;
    }
    return list.map((movie, index) => {
      if (this.props.usePreview && list.length > 10) {
        if (index < 10) {
          return(
            <Movie key={movie.id} id={movie.id} name={movie.title} poster={movie.poster_path} settings={this.props.settings} usePreview={this.props.usePreview} favorites={this.props.favorites}
                   isFav = {this.props.favorites.length > 0 ? (!!this.props.favorites.filter((favMovie) => {
                       return favMovie.id === movie.id;}).length > 0)
                     : false}
            />
          );
        }
      } else {
        return(
          <Movie key={movie.id} id={movie.id} name={movie.title} poster={movie.poster_path} settings={this.props.settings} usePreview={this.props.usePreview} favorites={this.props.favorites}
                 isFav = {this.props.favorites.length > 0 ? (!!this.props.favorites.filter((favMovie) => {
                     return favMovie.id === movie.id;}).length > 0)
                   : false}
          />
        );
      }
    });
  }
  render() {
    return(
      <div className="App__content">{this.makeList()}</div>
    );
  }
}

export default MovieList;