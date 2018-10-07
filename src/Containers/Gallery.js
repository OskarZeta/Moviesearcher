import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMovieImages } from '../Redux/actions/movie_info/fetch_movie_images';
import Spinner from '../Components/Spinner';
import ImageShow from './ImageShow';

class Gallery extends Component {
  loadImages() {
    //if (this.props.movieImages) {
    //MovieInfo__image-preview
      let images = this.props.movieImages.backdrops;
      return images.map((image, index) => {
        let addressMobile = this.props.settings.images.secure_base_url + this.props.settings.images.poster_sizes[1] + image.file_path;
        let addressTablet = this.props.settings.images.secure_base_url + this.props.settings.images.poster_sizes[2] + image.file_path;
        let addressDesktop = this.props.settings.images.secure_base_url + this.props.settings.images.poster_sizes[3] + image.file_path;
        return(
          <Link className="Gallery__image" key={index} to={`/filmId/${this.props.id}/images?image=${index+1}`}>
            <picture>
              <source srcSet={addressDesktop} media="(min-width: 1300px)" />
              <source srcSet={addressTablet} media="(min-width: 800px)" />
              <img src={addressMobile} alt="movie-poster"/>
            </picture>
          </Link>
        );
      });
    //}
  }
  componentDidMount(){
    if (Object.keys(this.props.movieImages).length === 0) {
      this.props.fetchMovieImages(this.props.id);
    }
  }
  render(){
    return(
      <div className="Gallery">
        {Object.keys(this.props.query).length !== 0 &&
          <ImageShow imageIndex={this.props.query.image - 1} from="gallery"/>
        }
        <div className="container container--gallery">
          {!Object.keys(this.props.movieImages).length && <Spinner/>}
          {Object.keys(this.props.movieImages).length && Object.keys(this.props.settings).length && this.loadImages()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movieImages: state.movieImages,
    settings: state.settings
  }
};
const mapDispatchToProps = {
  fetchMovieImages
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);