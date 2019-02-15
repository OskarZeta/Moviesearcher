import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMovieImages } from '../Redux/actions/movie_info/fetch_movie_images';
import Spinner from '../Components/Spinner';
import ImageShow from './ImageShow';

class Gallery extends Component {
  makeAddress(n, path) {
    return this.props.settings.images.secure_base_url + this.props.settings.images.poster_sizes[n] + path;
  }
  loadImages() {
    let images = this.props.movieImages.backdrops;
    return images.map((image, index) => {
      return(
        <Link className="Gallery__image" key={index} to={`/filmId/${this.props.id}/gallery?image=${index+1}`}>
          <picture>
            <source srcSet={this.makeAddress(3, image.file_path)} media="(min-width: 1300px)" />
            <source srcSet={this.makeAddress(2, image.file_path)} media="(min-width: 800px)" />
            <img src={this.makeAddress(1, image.file_path)} alt="movie-poster"/>
          </picture>
        </Link>
      );
    });
  }
  componentDidMount() {
    if (!Object.keys(this.props.movieImages).length) {
      this.props.fetchMovieImages(this.props.id);
    }
  }
  render() {
    const { query, movieImages, settings } = this.props;
    return(
      <div className="Gallery">
        {Object.keys(query).length !== 0 &&
          <ImageShow
            imageIndex={query.image - 1}
            settings={settings}
            from="gallery"
          />
        }
        <div className="container container--gallery">
          {!Object.keys(movieImages).length && <Spinner/>}
          {Object.keys(movieImages).length && this.loadImages()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movieImages: state.movieImages
  }
};
const mapDispatchToProps = {
  fetchMovieImages
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
