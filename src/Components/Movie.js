import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import FaveBtn from '../Containers/FaveBtn';

class Movie extends Component {
  render(){
    //console.log(this.props.isFav);
    // 0(pin): "w92"
    // 1(pin): "w154"
    // 2(pin): "w185"
    // 3(pin): "w342"
    // 4(pin): "w500"
    // 5(pin): "w780"

    let addressMobile = this.props.settings.base_url + this.props.settings.poster_sizes[0] + this.props.poster;
    let addressTablet = this.props.settings.base_url + this.props.settings.poster_sizes[1] + this.props.poster;
    let addressDesktop = this.props.settings.base_url + this.props.settings.poster_sizes[3] + this.props.poster;

    //style={{width: +this.props.settings.poster_sizes[3].split('w').pop()}}

    //<img src={addressMobile} style={{width: 155}} alt="movie-poster"/>
    return(
      <div className={!this.props.usePreview ? 'Movie' : 'Movie__preview'}>
        {!this.props.usePreview &&
          <div className="Movie__link">
            <Link to={`/filmId/${this.props.id}`} >
              <h2 className="Movie__header">{this.props.name}</h2>
              <picture>
                <source srcSet={addressDesktop} media="(min-width: 1300px)"/>
                <source srcSet={addressTablet} media="(min-width: 800px)"/>
                <img src={addressMobile} alt="movie-poster"/>
              </picture>
            </Link>
            <FaveBtn favorites={this.props.favorites} id={this.props.id} name={this.props.name} poster={this.props.poster} isFav={this.props.isFav}/>
          </div>
        }
        {this.props.usePreview &&
          <div className="Movie__link">
            <Link to={`/filmId/${this.props.id}`}>
              <h2 className="Movie__preview-header">{this.props.name}</h2>
              <picture>
                <source srcSet={addressDesktop} media="(min-width: 1300px)"/>
                <source srcSet={addressTablet} media="(min-width: 800px)"/>
                <img src={addressMobile} alt="movie-poster"/>
              </picture>
            </Link>
            <FaveBtn favorites={this.props.favorites} id={this.props.id} name={this.props.name} poster={this.props.poster} isFav={this.props.isFav}/>
          </div>
        }
      </div>
    );
  };
}

export default Movie;