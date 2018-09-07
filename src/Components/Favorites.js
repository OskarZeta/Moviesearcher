import React, { Component } from 'react';
import MovieList from '../Components/MovieList';

class Favorites extends Component {
  render(){
    return(
      <div className="Favorites">
        {(this.props.favorites.length === 0 || !this.props.favorites) &&
          <span>You don't have any favorites yet!</span>
        }
        {this.props.favorites && this.props.favorites.length > 0 && Object.keys(this.props.settings).length &&
          <MovieList settings={this.props.settings.images} favorites={this.props.favorites} favsPage={this.props.favsPage}/>
        }
      </div>
    );
  }
}

export default Favorites;