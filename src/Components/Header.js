import React, { Component } from 'react';
import Search from '../Containers/Search';
import Home from '../Containers/Home';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header className="Header">

        <Home/>

        {!this.props.filmId &&
          <ul className="Header__additional">
            <li className="Options">Options</li>
            <li className="Favorites">Favorites</li>
            <li className="Search">
              <Search history={this.props.history} searchQuery={this.props.searchQuery} />
            </li>
          </ul>
        }
        {this.props.filmId && !this.props.toMovie &&
          <ul className="Header__additional">
            <li className="Favorites">Favorites</li>
          </ul>
        }
        {this.props.filmId && this.props.toMovie &&
        <ul className="Header__additional">
          <li className="Favorites">Favorites</li>
          <li className="Favorites">
            <Link to={`/filmId/${this.props.filmId}`}>
              Back to movie
            </Link>
          </li>
        </ul>
        }
      </header>
    );
  }
}

export default Header;