import React from 'react';
import {Link} from 'react-router-dom';
import FaveBtn from '../../Containers/FaveBtn';

const MovieSimilar = ({ settings, poster, name, id, favorites, isFav }) => {
  let addressMobile = settings.secure_base_url + settings.poster_sizes[1] + poster;
  let addressTablet = settings.secure_base_url + settings.poster_sizes[2] + poster;
  return (
    <div className='Movie Movie--preview'>
      <div className="Movie__link">
        <Link to={`/filmId/${id}`}>
          <h2 className="Movie__header">{name}</h2>
          {poster !== null ?
            <picture>
              <source srcSet={addressTablet} media="(min-width: 800px)"/>
              <img src={addressMobile} alt="movie-poster"/>
            </picture>
          :
            <div className="Movie__placeholder">
              <div className="Movie__placeholder-mobile"></div>
              <div className="Movie__placeholder-tablet Movie__placeholder-tablet--desktop"></div>
            </div>
          }
        </Link>
        <FaveBtn
          id={id} name={name}
          poster={poster}
          //isFav={isFav}
        />
      </div>
    </div>
  );
}

export default MovieSimilar;
