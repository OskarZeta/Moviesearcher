import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Movie extends Component {
  render(){
    // 0(pin): "w92"
    // 1(pin): "w154"
    // 2(pin): "w185"
    // 3(pin): "w342"
    // 4(pin): "w500"
    // 5(pin): "w780"

    let addressMobile = this.props.settings.base_url + this.props.settings.poster_sizes[1] + this.props.poster;
    let addressTablet = this.props.settings.base_url + this.props.settings.poster_sizes[2] + this.props.poster;
    let addressDesktop = this.props.settings.base_url + this.props.settings.poster_sizes[3] + this.props.poster;
    return(
      <div className="Movie">
        {!this.props.usePreview &&
          <Link to={`/filmId/${this.props.id}`} style={{width: +this.props.settings.poster_sizes[3].split('w').pop()}}>
            <h2>{this.props.name}</h2>
            <picture>
              <source srcSet={addressDesktop} media="(min-width: 1300px)"/>
              <source srcSet={addressTablet} media="(min-width: 800px)"/>
              <img src={addressMobile} alt="movie-poster"/>
            </picture>
          </Link>
        }
        {this.props.usePreview &&
        <Link to={`/filmId/${this.props.id}`} style={{width: 200}}>
          <h2 style={{fontSize: 20, textAlign: "center"}}>{this.props.name}</h2>
          <img src={addressMobile} style={{width: 155}} alt="movie-poster"/>
        </Link>
        }
      </div>
    );
  };
}

export default Movie;