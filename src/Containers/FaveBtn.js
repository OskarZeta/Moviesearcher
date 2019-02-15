import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../Redux/actions/change_favorites';

class FaveBtn extends Component {
  isFavorite() {
    let favorites = this.props.favorites;
    if (favorites.length) {
      return favorites.some(fav => fav.id === this.props.id);
    }
    return false;
  }
  clickHandler = () => {
    if (!this.isFavorite()) {
      this.props.addFavorite ({
        id: this.props.id,
        title: this.props.name,
        poster_path: this.props.poster
      });
    } else {
      this.props.removeFavorite(this.props.id);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.favorites !== prevProps.favorites) {
      localStorage.setItem('favorite_movies', JSON.stringify(this.props.favorites));
    }
  }
  render(){
    const moviePage = this.props.moviePage;
    const isFav = this.isFavorite();
    const classSelector = {
      favAndMovie : 'FaveBtn FaveBtn--moviePage FaveBtn--active btn',
      favAndList : 'FaveBtn FaveBtn--active btn',
      notFavAndMovie : 'FaveBtn FaveBtn--moviePage btn btn-success',
      notFavAndList: 'FaveBtn btn btn-success'
    };
    return(
      <>
        <div className={
          isFav ?
            moviePage ? classSelector.favAndMovie : classSelector.favAndList :
            moviePage ? classSelector.notFavAndMovie : classSelector.notFavAndList
          }
          onClick={this.clickHandler}>
          <div className='FaveBtn__content'>
            <svg className="FaveBtn__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                className={`FaveBtn__star ${isFav ? 'FaveBtn__star--active' : ''}`}
                d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"
              />
            </svg>
            <span className="FaveBtn__text">
              {isFav ? 'Remove from faves' : 'Add to faves'}
            </span>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.favorites
  }
};

const mapDispatchToProps= {
  addFavorite,
  removeFavorite
};

export default connect(mapStateToProps, mapDispatchToProps)(FaveBtn);
