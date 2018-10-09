import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  loadFavorites
} from '../../Redux/actions/change_favorites';

import Movie from '../../Components/Movie/Movie';
import Spinner from '../../Components/Spinner';

class MovieListFavorites extends Component {
  makeList() {
    let list;
    if (this.props.favorites.length !== 0) {
      list = this.props.favorites;
      return list.map((movie) => {
        return(
          <Movie key={movie.id}
                 id={movie.id}
                 name={movie.title}
                 poster={movie.poster_path}
                 settings={this.props.settings.images}
                 isFav = {this.props.favorites.length > 0 ? (!!this.props.favorites.filter((favMovie) => {
                     return favMovie.id === movie.id;}).length > 0)
                   : false}
          />
        );
      });
    } else {
      return(
        <span className="App__faves-empty">You don't have any favorites yet!</span>
      );
    }
  }
  componentDidMount(){
    if (this.props.favorites.length === 0) {
      this.props.loadFavorites();
    }
  }
  componentDidUpdate(prevProps){
    if (this.props.favorites !== prevProps.favorites) {
      localStorage.setItem('favorites', JSON.stringify(this.props.favorites));
    }
  }
  render() {
    return(
      <div className="container container--movielist">
        {Object.keys(this.props.settings).length !== 0 && this.makeList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    favorites: state.favorites
    //loading: state.loading
  }
};
const mapDispatchToProps = {
  loadFavorites
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieListFavorites);