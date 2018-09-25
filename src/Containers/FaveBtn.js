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
  render(){
    return(
      <div className={this.props.isFav ? this.props.moviePage ? 'FaveBtn FaveBtn--moviePage FaveBtn--active btn' : 'FaveBtn FaveBtn--active btn'
                      : this.props.moviePage ? 'FaveBtn FaveBtn--moviePage btn btn-success' : 'FaveBtn btn btn-success'}
           onClick={(e) => {this.clickHandler(e)}}
      >
        {!this.props.isFav && !this.props.moviePage &&
          <div className='FaveBtn__content'>
            <svg className="FaveBtn__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path className="FaveBtn__star" d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"
              />
            </svg>
            <span className="FaveBtn__text">Add to faves</span>
          </div>
        }
        {this.props.isFav && !this.props.moviePage &&
          <div className='FaveBtn__content'>
            <svg className="FaveBtn__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path className="FaveBtn__star FaveBtn__star--active" d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"
              />
            </svg>
            <span className="FaveBtn__text">Remove from faves</span>
          </div>
        }
        {!this.props.isFav && this.props.moviePage &&
          <div className='FaveBtn__content'>
            <svg className="FaveBtn__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path className="FaveBtn__star" d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"
              />
            </svg>
            <span className="FaveBtn__text">Add to favorites</span>
          </div>
        }
        {this.props.isFav && this.props.moviePage &&
          <div className='FaveBtn__content'>
            <svg className="FaveBtn__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path className="FaveBtn__star FaveBtn__star--active" d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"
              />
            </svg>
            <span className="FaveBtn__text">Remove from favorites</span>
          </div>
        }
      </div>
    );
  }
}

const mapDispatchToProps= {
  addFavorite,
  removeFavorite
};

export default connect(null, mapDispatchToProps)(FaveBtn);