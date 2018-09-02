import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageShow from '../Components/ImageShow';

class Gallery extends Component {
    loadImages() {
    if (this.props.movieImages) {
      let images = this.props.movieImages.backdrops;
      return images.map((image, index) => {
        let addressMobile = this.props.settings.base_url + this.props.settings.poster_sizes[1] + image.file_path;
        let addressTablet = this.props.settings.base_url + this.props.settings.poster_sizes[2] + image.file_path;
        let addressDesktop = this.props.settings.base_url + this.props.settings.poster_sizes[3] + image.file_path;
        //let path = this.props.settings.base_url + this.props.settings.poster_sizes[2] + image.file_path;
        //<img src={path} alt="movie-poster"/>
        return(
          <Link className="MovieInfo__image-preview" key={index} to={`/filmId/${this.props.filmId}/images/${index+1}`}>
            <picture>
              <source srcSet={addressDesktop} media="(min-width: 1300px)" />
              <source srcSet={addressTablet} media="(min-width: 800px)" />
              <img src={addressMobile} alt="movie-poster"/>
            </picture>
          </Link>
        );
      });
    }
  }
  render(){
    //console.log(this.props.imageToShow);
    return(
      <div className="Gallery">
        {this.props.imageIndex && this.props.filmId && this.props.movieImages && this.props.settings &&
          <ImageShow imageIndex={this.props.imageIndex - 1} movieImages={this.props.movieImages} settings={this.props.settings} history={this.props.history} from="gallery"/>
        }
        {this.props.filmId && this.props.movieImages && this.props.settings &&
          <div className="Gallery__wrapper">
            {this.loadImages()}
          </div>
        }
      </div>
    );
  }
}

export default Gallery;