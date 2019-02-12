import React from 'react';
import Search from '../Search';
import Sidebar from '../../Containers/Sidebar';
import { Link } from 'react-router-dom';

function clickOptions(e){
  let sidebar = document.querySelector('.Sidebar');
  sidebar.classList.toggle('hidden');
  let btn = document.querySelector('.Header__options');
  btn.classList.toggle('Header__btn--active');
}

const Header = ({ query }) =>
  <header className="Header">
    <div className="container container--header">
      <h1>
        <Link className="Header__home" to="/">
          Moviesearcher App
        </Link>
      </h1>
      <ul className="Header__additional">
        <li className={`Header__options Header__btn ${query ? !query.q ? 'Header__btn--active' : '' : ''}`} onClick={clickOptions}>
          <span>Options</span>
        </li>
        <li className='Header__sidebar'>
          <Sidebar query={query ? query.q ? undefined : query : undefined}/>
        </li>
        <li className="Header__favorites Header__btn">
          <Link to="/favorites">
            <span>Favorites</span>
          </Link>
        </li>
        <li className="Header__search">
          <Search query={query ? query.q ? query : undefined : undefined}/>
        </li>
      </ul>
    </div>
  </header>


export default Header;
