import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { imagePrev, imageNext } from '../Redux/actions';

class ImageShow extends Component {
  closeClick(){
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
          this.props.history.push(`/filmId/${this.props.movieImages.id}/image=${index}`);
        } else {
          ////console.log('index cant be negative');
        }
      } else if (dir === "next") {
        if (this.props.imageIndex < this.props.movieImages.backdrops.length - 1) {
          this.props.history.push(`/filmId/${this.props.movieImages.id}/image=${index + 2}`);
        } else {
          ////console.log('NULL POINTER EXCEPTION');
        }
      }
    } else if (this.props.from === "gallery") {
      if (dir === "prev") {
        if (this.props.imageIndex > 0) {
          this.props.history.push(`/filmId/${this.props.movieImages.id}/images/${index}`);
        } else {
          ////console.log('index cant be negative');
        }
      } else if (dir === "next"){
        if (this.props.imageIndex < this.props.movieImages.backdrops.length - 1) {
          this.props.history.push(`/filmId/${this.props.movieImages.id}/images/${index + 2}`);
        } else {
          ////console.log('NULL POINTER EXCEPTION');
        }
      }
    }
  }

  render(){
    //let path = this.props.settings.base_url + this.props.settings.backdrop_sizes[1] + this.props.movieImages.backdrops[this.props.imageIndex].file_path;
    let addressMobile = this.props.settings.base_url + this.props.settings.backdrop_sizes[0] + this.props.movieImages.backdrops[this.props.imageIndex].file_path;
    let addressTablet = this.props.settings.base_url + this.props.settings.backdrop_sizes[1] + this.props.movieImages.backdrops[this.props.imageIndex].file_path;
    let addressDesktop = this.props.settings.base_url + this.props.settings.backdrop_sizes[3] + this.props.movieImages.backdrops[this.props.imageIndex].file_path;
    return(
      <div className="ImageShow">
        <div className="container container--imageshow">
          <picture>
            <source srcSet={addressDesktop} media="(min-width: 1300px)"/>
            <source srcSet={addressTablet} media="(min-width: 800px)"/>
            <img src={addressMobile} alt="movie-poster"/>
          </picture>
          <div className="ImageShow__interface">
            <button className="ImageShow__prev" onClick={() => {this.sliderClick("prev")}}>
              <span className="ImageShow__prev-triangle"></span>
            </button>
            <button className="ImageShow__close" onClick={() => {this.closeClick()}}>
              <span className="ImageShow__close-circle"></span>
              <span className="ImageShow__close-stick"></span>
            </button>
            <button className="ImageShow__next" onClick={() => {this.sliderClick("next")}}>
              <span className="ImageShow__next-triangle"></span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   // console.log(ownProps);
//   return {
//     //imageIndex: ownProps.imageIndex
//   }
// };
// const mapDispatchToProps = {
//   // imagePrev,
//   // imageNext
// };

export default ImageShow;
//export default connect(mapStateToProps, mapDispatchToProps)(ImageShow);