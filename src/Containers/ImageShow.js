import React, { Component } from 'react';
import Spinner from '../Components/Spinner';

class ImageShow extends Component {
  closeClick(){
    document.querySelector('.image-preload').classList.remove('hidden');
    if (this.props.from === "movie") {
      this.props.history.push(`/filmId/${this.props.movieImages.id}`);
    } else if (this.props.from === "gallery") {
      this.props.history.push(`/filmId/${this.props.movieImages.id}/images`);
    }
  }
  sliderClick(dir){
    let index = this.props.imageIndex;
    if (this.props.from === "movie") {
      if (dir === "prev") {
        if (this.props.imageIndex > 0) {
          document.querySelector('.image-preload').classList.remove('hidden');
          this.props.history.push(`/filmId/${this.props.movieImages.id}/image=${index}`);
        }
      } else if (dir === "next") {
        if (this.props.imageIndex < this.props.movieImages.backdrops.length - 1) {
          document.querySelector('.image-preload').classList.remove('hidden');
          this.props.history.push(`/filmId/${this.props.movieImages.id}/image=${index + 2}`);
        }
      }
    } else if (this.props.from === "gallery") {
      if (dir === "prev") {
        if (this.props.imageIndex > 0) {
          document.querySelector('.image-preload').classList.remove('hidden');
          this.props.history.push(`/filmId/${this.props.movieImages.id}/images/${index}`);
        }
      } else if (dir === "next"){
        if (this.props.imageIndex < this.props.movieImages.backdrops.length - 1) {
          document.querySelector('.image-preload').classList.remove('hidden');
          this.props.history.push(`/filmId/${this.props.movieImages.id}/images/${index + 2}`);
        }
      }
    }
  }
  loadImage(e) {
    e.target.parentNode.parentNode.querySelector('.image-preload').classList.add('hidden');
  }
  componentDidMount() {
    document.querySelector('.image-preload').classList.remove('hidden');
  }
  render(){
    console.log(this.props.settings);
    let addressMobile = this.props.settings.images.secure_base_url + this.props.settings.images.backdrop_sizes[0];// + this.props.movieImages.backdrops[this.props.imageIndex].file_path;
    let addressTablet = this.props.settings.images.secure_base_url + this.props.settings.images.backdrop_sizes[1];// + this.props.movieImages.backdrops[this.props.imageIndex].file_path;
    let addressDesktop = this.props.settings.images.secure_base_url + this.props.settings.images.backdrop_sizes[2];// + this.props.movieImages.backdrops[this.props.imageIndex].file_path;
    return(
      <div className="ImageShow">
        <div className="container container--imageshow">
          <div className="ImageShow__image-wrapper">
            <picture>
              <source srcSet={addressDesktop} media="(min-width: 1300px)"/>
              <source srcSet={addressTablet} media="(min-width: 800px)"/>
              <img onLoad={(e) => {this.loadImage(e)}} src={addressMobile} alt="movie-poster"/>
            </picture>
            <div className="image-preload image-preload--movie-backdrop">
              <Spinner/>
            </div>
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

export default ImageShow;