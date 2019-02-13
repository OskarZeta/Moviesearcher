import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  loadFavorites
} from '../../Redux/actions/change_favorites';

import WithMovieList from './WithMovieList';

class MovieListFavorites extends Component {
  componentDidMount(){
    if (!this.props.favorites.length) {
      this.props.fetchFunction();
    }
  }
  render() {
    const { settings, favorites } = this.props;
    return(
      <div className="container container--movielist">
        {Object.keys(settings).length && this.props.makeList('favorites')}
        {favorites.length === 0 && <span className="App__faves-empty">You don't have any favorites yet!</span>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings,
    favorites: state.favorites
  }
};
const mapDispatchToProps = {
  fetchFunction: loadFavorites
};

export default connect(mapStateToProps, mapDispatchToProps)(WithMovieList(MovieListFavorites));
