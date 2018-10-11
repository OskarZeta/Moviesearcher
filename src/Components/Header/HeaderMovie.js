import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return(
      <header className="Header">
        <div className="container container--header">
          <h1>
            <Link className="Header__home" to="/">
              Moviesearcher App
            </Link>
          </h1>
          <ul className="Header__additional">
            <li className="Header__favorites Header__favorites--moviePage Header__btn">
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

export default Header;