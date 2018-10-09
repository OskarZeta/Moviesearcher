import React, { Component } from 'react';
import Search from '../Search';
import Sidebar from '../../Containers/Sidebar';
import { Link } from 'react-router-dom';

class Header extends Component {
  clickOptions(e){
    let sidebar = document.querySelector('.Sidebar');
    sidebar.classList.toggle('hidden');
    let btn = document.querySelector('.Header__options');
    btn.classList.toggle('Header__btn--active');
  }
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
            <li className={`Header__options Header__btn ${this.props.query ? !this.props.query.q ? 'Header__btn--active' : '' : ''}`} onClick={(e) => {this.clickOptions(e)}}>
              <span>Options</span>
            </li>
            <li className='Header__sidebar'>
              <Sidebar query={this.props.query ? this.props.query.q ? undefined : this.props.query : undefined}/>
            </li>
            <li className="Header__favorites Header__btn">
              <Link to="/favorites">
                <span>Favorites</span>
              </Link>
            </li>
            <li className="Header__search">
              <Search query={this.props.query ? this.props.query.q ? this.props.query : undefined : undefined}/>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;