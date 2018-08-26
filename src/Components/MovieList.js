import React, { Component } from 'react';
import Movie from './Movie';

class MovieList extends Component {
  makeList() {
    //console.log(this.props.favorites);
    let list = this.props.movieList;

    // isFav = {this.props.favorites.length > 0 ? !!this.props.favorites.filter((id) => {
    // return id === movie.id;
    // }) : false}
    return list.map((movie) => {
      return(
        <Movie key={movie.id} id={movie.id} name={movie.title} poster={movie.poster_path} settings={this.props.settings} usePreview={this.props.usePreview} favorites={this.props.favorites}
          isFav = {this.props.favorites.length > 0 ? (!!this.props.favorites.filter((id) => {
            return id === movie.id;}).length > 0)
          : false}
        />
      );
    });
  }
  render() {
    return(
      <div className="Movies__wrapper">{this.makeList()}</div>
    );
  }
}

export default MovieList;