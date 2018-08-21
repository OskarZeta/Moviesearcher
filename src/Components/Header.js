import React, { Component } from 'react';
import Search from '../Containers/Search';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <h1>
          <a href="/">The Moviesearcher</a>
        </h1>
        {!this.props.filmId &&
          <ul className="Header__additional">
            <li className="Options">Options</li>
            <li className="Favourites">Favourites</li>
            <li className="Search">
              <Search history={this.props.history} searchQuery={this.props.searchQuery} />
            </li>
          </ul>
        }
        {this.props.filmId &&
          <ul className="Header__additional">
            <li className="Favourites">Favourites</li>
          </ul>
        }
      </header>
    );
  }
}

export default Header;