import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImagePreload from '../../Components/ImagePreload';

class GalleryPreviewImage extends Component {
  state = {
    isLoaded: false
  }
  loadImage = () => {
    this.setState({
      isLoaded: true
    });
  }
  render() {
    const { index, id, addressMobile, addressTablet, addressDesktop } = this.props;
    return(
      <Link className="MovieInfo__image-preview" to={`/filmId/${id}?image=${index+1}`}>
        <picture>
          <source srcSet={addressDesktop} media="(min-width: 1300px)" />
          <source srcSet={addressTablet} media="(min-width: 800px)" />
          <img className="MovieInfo__img" onLoad={this.loadImage} src={addressMobile} alt="movie-poster"/>
        </picture>
        {!this.state.isLoaded && <ImagePreload type="gallery-preview"/>}
      </Link>
    );
  }
}


export default GalleryPreviewImage;
