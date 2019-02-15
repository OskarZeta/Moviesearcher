import React from 'react';
import { Link } from 'react-router-dom';

const ShowLink = ({ id, type }) => {
  return (
    <div className={`MovieInfo__show-link MovieInfo__show-link--${type}`}>
      <Link to={`/filmId/${id}/${type}`}>
        <span>show full {type}</span>
      </Link>
    </div>
  );
}

export default ShowLink;
