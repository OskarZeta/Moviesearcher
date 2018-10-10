import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import FaveBtn from '../../Containers/FaveBtn';

class MovieSimilar extends Component {
  render(){
    let addressMobile = this.props.settings.secure_base_url + this.props.settings.poster_sizes[1] + this.props.poster;
    let addressTablet = this.props.settings.secure_base_url + this.props.settings.poster_sizes[2] + this.props.poster;
    return(
      <div className='Movie Movie--preview'>
        <div className="Movie__link">
          <Link to={`/filmId/${this.props.id}`}>
            <h2 className="Movie__header">{this.props.name}</h2>
            {this.props.poster !== null &&
              <picture>
                <source srcSet={addressTablet} media="(min-width: 800px)"/>
                <img src={addressMobile} alt="movie-poster"/>
              </picture>
            }
            {this.props.poster === null &&
              <div className="Movie__placeholder">
                <div className="Movie__placeholder-mobile"></div>
                <div className="Movie__placeholder-tablet Movie__placeholder-tablet--desktop"></div>
              </div>
            }
          </Link>
          <FaveBtn favorites={this.props.favorites} id={this.props.id} name={this.props.name} poster={this.props.poster} isFav={this.props.isFav}/>
        </div>
      </div>
    );
  };
}

export default MovieSimilar;