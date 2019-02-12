import React from 'react';
import { Link } from 'react-router-dom';

const HeaderMovieDetails = ({ id }) =>
  <header className="Header">
    <div className="container container--header">
      <h1>
        <Link className="Header__home" to="/">
          Moviesearcher App
        </Link>
      </h1>
      <ul className="Header__additional">
        <li className="Header__favorites Header__favorites--movieDetails Header__btn">
          <Link to="/favorites">
            <span>Favorites</span>
          </Link>
        </li>
        <li className="Header__back Header__btn">
          <Link to={`/filmId/${id}`}>
            <span>To movie</span>
          </Link>
        </li>
      </ul>
    </div>
  </header>

export default HeaderMovieDetails;
