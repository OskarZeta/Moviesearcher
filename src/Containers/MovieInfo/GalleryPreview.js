import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovieImages } from '../../Redux/actions/movie_info/fetch_movie_images';
import Spinner from '../../Components/Spinner';
import ShowLink from '../../Components/ShowLink';
import GalleryPreviewImage from './GalleryPreviewImage';

const imagesToShowPreview = 4;

class GalleryPreview extends Component {
  state = {
    isLoaded: false
  }
  loadImages() {
    let images = this.props.movieImages.backdrops;
    if (images) {
      if (!images.length) {
        return(
          <i className="MovieInfo__info" style={{border: 'none', margin: 0}}>
            Not available
          </i>
        );
      }
      images = images.filter((_, i) => i < imagesToShowPreview);
      const { settings, id } = this.props;
      return images.map((image, index) => {
        let addressMobile = settings.secure_base_url + settings.poster_sizes[1] + image.file_path;
        let addressTablet = settings.secure_base_url + settings.poster_sizes[2] + image.file_path;
        let addressDesktop = settings.secure_base_url + settings.poster_sizes[3] + image.file_path;
        return(
          <GalleryPreviewImage
            index={index} key={index} id={id}
            addressMobile={addressMobile}
            addressTablet={addressTablet}
            addressDesktop={addressDesktop}
          />
        );
      });
    }
  }
  componentDidMount() {
    this.props.fetchMovieImages(this.props.id);
  }
  componentDidUpdate(prevProps) {
    if (this.props.movieImages !== prevProps.movieImages) {
      this.setState({
        isLoaded: true
      })
    }
  }
  render() {
    const images = this.props.movieImages.backdrops;
    return(
      <div>
        <h2 className="MovieInfo__section-header">image gallery</h2>
        <div className="MovieInfo__info MovieInfo__info--gallery">
          {images && images.length !== 0 && <ShowLink id={this.props.id} type="gallery"/>}
          {!this.state.isLoaded && <Spinner/>}
          {this.state.isLoaded &&
            <div className="MovieInfo__images-wrapper">{this.loadImages()}</div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movieImages: state.movieImages,
  }
};
const mapDispatchToProps = {
  fetchMovieImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPreview);
