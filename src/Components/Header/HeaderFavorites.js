import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderFavorites extends Component {
  render() {
    return(
      <header className="Header">
        <div className="container container--header">
          <Link className="Header__home" to="/">
            <h1>Moviesearcher App</h1>
          </Link>
          <ul className="Header__additional">
            <li className="Header__favorites Header__btn Header__favorites-nonbtn Header__btn--active">
              <Link to="/favorites">
                <span>Favorites</span>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default HeaderFavorites;