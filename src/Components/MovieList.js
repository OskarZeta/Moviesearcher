import React, { Component } from 'react';
import Movie from './Movie';

class MovieList extends Component {
  makeList() {
    let list = this.props.movieList;
    return list.map((movie) => {
      return(
        <Movie key={movie.id} id={movie.id} name={movie.title} poster={movie.poster_path} settings={this.props.settings} usePreview={this.props.usePreview}/>
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