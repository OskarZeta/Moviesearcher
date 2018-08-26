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
    let path = this.props.settings.base_url + this.props.settings.backdrop_sizes[1] + this.props.movieImages.backdrops[this.props.imageIndex].file_path;
    return(
      <div className="ImageShow">
        <div className="ImageShow__wrapper">
          <button className="ImageShow__close" onClick={() => {this.closeClick()}}>
            Close
          </button>
          <button onClick={() => {this.sliderClick("prev")}}>prev</button>
          <button onClick={() => {this.sliderClick("next")}}>next</button>
          <img src={path}/>
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