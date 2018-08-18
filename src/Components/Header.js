import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <h1>The Moviesearcher</h1>
        <ul className="Header__additional">
          <li className="Options">Options</li>
          <li className="Favourites">Favourites</li>
          <li className="Search">
            <input type="search"/>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;