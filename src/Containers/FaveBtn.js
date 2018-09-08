import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../Redux/actions/change_favorites';

class FaveBtn extends Component {
  clickHandler(e){
    if (!this.props.isFav) {
      this.props.addFavorite ({
        id: this.props.id,
        title: this.props.name,
        poster_path: this.props.poster
      });
    } else {
      this.props.removeFavorite(this.props.id);
    }
  }
  componentDidMount() {
    if (document.querySelector('.MovieInfo__title')) {
      let coloredHeader = document.querySelector('.FaveBtn__header');
      if (this.props.isFav && this.props.moviePage) {
        coloredHeader.style.opacity = '1';
      } else if (!this.props.isFav && this.props.moviePage) {
        coloredHeader.style.opacity = '0';
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (document.querySelector('.MovieInfo__title')) {
      if (this.props.isFav !== prevProps.isFav && this.props.moviePage) {
        let coloredHeader = document.querySelector('.FaveBtn__header');
        if (this.props.isFav) {
          coloredHeader.style.opacity = '1';
        } else if (!this.props.isFav) {
          coloredHeader.style.opacity = '0';
        }
      }
    }
  }
  render(){
    return(
      <div className={this.props.isFav ? this.props.moviePage ? 'FaveBtn__moviePage FaveBtn__moviePage--active' : 'FaveBtn FaveBtn--active'
                      : this.props.moviePage ? 'FaveBtn__moviePage' : 'FaveBtn'}>
        <button className='FaveBtn__button' onClick={(e) => {this.clickHandler(e)}}>
          {!this.props.isFav &&
            <img src="https://oskarzeta.github.io/star.svg"/>
          }
          {this.props.isFav &&
            <img src="https://oskarzeta.github.io/star_active.svg"/>
          }
        </button>
      </div>
    );
  }
}

const mapDispatchToProps= {
  addFavorite,
  removeFavorite
};

export default connect(null, mapDispatchToProps)(FaveBtn);