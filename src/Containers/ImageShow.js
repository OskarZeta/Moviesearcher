import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ImagePreload from '../Components/ImagePreload';
import { errorSet } from '../Redux/actions/has_error';

class ImageShow extends Component {
  state = {
    isLoaded : false
  }
  closeClick() {
    this.setState({
      isLoaded : false
    }, () => {
      if (this.props.from === "movie") {
        this.props.history.push(`/filmId/${this.props.movieImages.id}`);
      } else if (this.props.from === "gallery") {
        this.props.history.push(`/filmId/${this.props.movieImages.id}/gallery`);
      }
    });
  }
  sliderClick(dir) {
    let index = this.props.imageIndex;
    let source = "?image=";
    if (this.props.from === "gallery") {
      source = "/gallery?image=";
    }
    if (dir === "prev") {
      if (index > 0) {
        this.setState({
          isLoaded: false
        }, () =>
          this.props.history.push(`/filmId/${this.props.movieImages.id}${source}${index}`)
        );
      }
    } else if (dir === "next") {
      if (index < this.props.movieImages.backdrops.length - 1) {
        this.setState({
          isLoaded: false
        }, () =>
          this.props.history.push(`/filmId/${this.props.movieImages.id}${source}${index + 2}`)
        );
      }
    }
  }
  loadImage = () => {
    this.setState({
      isLoaded: true
    });
  }
  render() {
    let addressMobile;
    let addressTablet;
    let addressDesktop;
    const { imageIndex, movieImages } = this.props;
    const settings = this.props.settings.images;
    function _makeAddress(n) {
      return settings.secure_base_url +
      settings.backdrop_sizes[n] +
      movieImages.backdrops[imageIndex].file_path;
    }
    if (Object.keys(movieImages).length) {
      if (imageIndex >= movieImages.backdrops.length || Number.isNaN(imageIndex)) {
        this.props.errorSet('Wrong image index detected');
      } else {
        addressMobile = _makeAddress(0);
        addressTablet = _makeAddress(1);
        addressDesktop = _makeAddress(2);
      }
    }
    return(
      <div className="ImageShow">
        <div className="container container--imageshow">
          <div className="ImageShow__image-wrapper">
            <picture>
              <source srcSet={addressDesktop} media="(min-width: 1300px)"/>
              <source srcSet={addressTablet} media="(min-width: 800px)"/>
              <img onLoad={this.loadImage} src={addressMobile} alt="movie-poster"/>
            </picture>
            {!this.state.isLoaded && <ImagePreload type="movie-backdrop"/>}
          </div>
          <div className="ImageShow__interface">
            <button className="ImageShow__prev" onClick={() => {this.sliderClick("prev")}}></button>
            <button className="ImageShow__close" onClick={() => {this.closeClick()}}></button>
            <button className="ImageShow__next" onClick={() => {this.sliderClick("next")}}></button>
          </div>
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
  errorSet
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageShow));
