import React, { Component } from 'react';
import Search from '../Containers/Search';
import Home from '../Containers/Home';
import Sidebar from '../Containers/Sidebar';
import Favorites from './Favorites';
import { Link } from 'react-router-dom';

class Header extends Component {
  clickOptions(e){
    //if (e.target.classList.contains('Header__options')) {
      let sidebar = document.querySelector('.Header__sidebar');
      //console.log('aaa');
      sidebar.classList.toggle('hidden');
      let btn = document.querySelector('.Header__options');
      btn.classList.toggle('Header__btn-active');
    //}
    // let sidebar = document.querySelector('.Header__sidebar');
    // //console.log('aaa');
    // sidebar.classList.toggle('hidden');
    // if (e.target.classList.contains('Header__options')) {
    //   e.target.classList.toggle('Header__btn-active');
    // }
    //console.log(e.target);
  }
  render() {
    //console.log(this.props.toFavs);
    return (
      <header className="Header">
        <div className="container container--header">
          <Home/>
          {!this.props.filmId && !this.props.toFavs &&
            <ul className="Header__additional">
              <li className="Header__options" onClick={(e) => {this.clickOptions(e)}}>
                <span>Options</span>
              </li>
              <li className="Header__sidebar hidden">
                <Sidebar
                  history={this.props.history}
                  genresSelected={this.props.genresSelected}
                  searchQuery={this.props.searchQuery}
                  goHome={this.props.goHome}
                  sortValue={this.props.sortValue}
                  sortDir={this.props.sortDir}
                />
              </li>
              <li className="Header__favorites">
                <Link to="/favorites">
                  <span>Favorites</span>
                </Link>
              </li>
              <li className="Header__search">
                <Search history={this.props.history} searchQuery={this.props.searchQuery} />
              </li>
            </ul>
          }
          {this.props.filmId && !this.props.toMovie && !this.props.toFavs &&
            <ul className="Header__additional">
              <li className="Header__favorites">
                <Link to="/favorites">
                  <span>Favorites</span>
                </Link>
              </li>
            </ul>
          }
          {this.props.filmId && this.props.toMovie && !this.props.toFavs &&
            <ul className="Header__additional Header__additional--movie">
              <li className="Header__favorites">
                <Link to="/favorites">
                  <span>Favorites</span>
                </Link>
              </li>
              <li className="Header__back">
                <Link to={`/filmId/${this.props.filmId}`}>
                  Back to movie
                </Link>
              </li>
            </ul>
          }
          {this.props.toFavs && !this.props.toMovie &&
            <ul className="Header__additional">
              <li className="Header__favorites Header__favorites-nonbtn Header__btn-active">

                <span style={{display: "block", padding: "5px"}}>Favorites</span>

              </li>
            </ul>
          }
        </div>
      </header>
    );
  }
}

export default Header;