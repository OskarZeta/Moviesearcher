import React, { Component } from 'react';
import Search from '../../Containers/Search';
// import Home from '../Containers/Home';
import Sidebar from '../../Containers/Sidebar';
import { Link, Switch, Route } from 'react-router-dom';

class HeaderSorted extends Component {
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
          <Link className="Header__home" to="/">
            <h1>Moviesearcher App</h1>
          </Link>
          <ul className="Header__additional">
            <li className="Header__options Header__btn" onClick={(e) => {this.clickOptions(e)}}>
              <span>Options</span>
            </li>
            <li className="Header__sidebar">
              {/*<SidebarSorted/>*/}
              {/*<Switch>*/}
              {/*<Route exact path="/">*/}
              {/*<Sidebar/>*/}
              {/*</Route>*/}
              {/*<Route path="/genres=:genres">*/}
              {/*<Sidebar/>*/}
              {/*</Route>*/}
              {/*</Switch>*/}
            </li>
            <li className="Header__favorites Header__btn">
              <Link to="/favorites">
                <span>Favorites</span>
              </Link>
            </li>
            <li className="Header__search">
              <Search/>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default HeaderSorted;