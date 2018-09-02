import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../Redux/actions';


class FaveBtn extends Component {
  clickHandler(e){
    if (!this.props.isFav) {
      //console.log('add fav');
      this.props.addFavorite ({
        id: this.props.id,
        title: this.props.name,
        poster_path: this.props.poster
      });
    } else {
      //console.log('remove fav');
      this.props.removeFavorite(this.props.id);
    }
  }
  render(){
    //<img src="../star.svg"/>
    //<img src="../star_active.svg"/>

    //<div className={this.props.isFav ? 'FaveBtn FaveBtn--active' : 'FaveBtn'}>
    //this.props.onMovie ?
    return(
      <div className={this.props.isFav ? this.props.moviePage ? 'FaveBtn__moviePage FaveBtn__moviePage--active' : 'FaveBtn FaveBtn--active'
                      : this.props.moviePage ? 'FaveBtn__moviePage' : 'FaveBtn'}>
        <button className='FaveBtn__button' onClick={(e) => {this.clickHandler(e)}}>
          {!this.props.isFav &&
            <img src="http://localhost:3000/star.svg"/>
          }
          {this.props.isFav &&
            <img src="http://localhost:3000/star_active.svg"/>
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