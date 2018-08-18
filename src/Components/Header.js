import React, { Component } from 'react';
import Search from '../Containers/Search';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <h1>The Moviesearcher</h1>
        <ul className="Header__additional">
          <li className="Options">Options</li>
          <li className="Favourites">Favourites</li>
          <li className="Search">
            <Search history={this.props.history} searchQuery={this.props.searchQuery} />
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;