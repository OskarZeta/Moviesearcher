import React, { Component } from 'react';
import MovieList from '../Components/MovieList';

class Favorites extends Component {
  render(){
    //console.log(this.props.settings);
    return(
      <div className="Favorites">
        {(this.props.favorites.length === 0 || !this.props.favorites) &&
          <div className="empty">
            <span>You don't have favorites yet</span>
          </div>
        }
        {this.props.favorites && this.props.favorites.length > 0 && Object.keys(this.props.settings).length &&
          <MovieList settings={this.props.settings.images} favorites={this.props.favorites} favsPage={this.props.favsPage}/>
        }
      </div>
    );
  }
}

export default Favorites;