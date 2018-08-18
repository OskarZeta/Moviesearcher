import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Movie extends Component {
  render(){
    let address = this.props.settings.base_url + this.props.settings.poster_sizes[3] + this.props.poster;
    return(
      <Link className="Movie" to={`/filmId/${this.props.id}`} style={{width: +this.props.settings.poster_sizes[3].split('w').pop()}}>
        <h2>{this.props.name}</h2>
        <img src={address}/>
      </Link>
    );
  };
}

export default Movie;