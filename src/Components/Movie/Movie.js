import React from 'react';
import {Link} from 'react-router-dom';
import FaveBtn from '../../Containers/FaveBtn';

const Movie = ({ settings, poster, name, id, favorites, isFav }) => {
  let addressMobile = settings.secure_base_url + settings.poster_sizes[1] + poster;
  let addressTablet = settings.secure_base_url + settings.poster_sizes[2] + poster;
  let addressDesktop = settings.secure_base_url + settings.poster_sizes[3] + poster;
  return (
    <div className='Movie'>
      <div className="Movie__link">
        <Link to={`/filmId/${id}`} >
          <h2 className="Movie__header">{name}</h2>
          {poster !== null ?
            <picture>
              <source srcSet={addressDesktop} media="(min-width: 1300px)"/>
              <source srcSet={addressTablet} media="(min-width: 800px)"/>
              <img src={addressMobile} alt="movie-poster"/>
            </picture>
            :
            <div className="Movie__placeholder">
              <div className="Movie__placeholder-mobile"></div>
              <div className="Movie__placeholder-tablet"></div>
              <div className="Movie__placeholder-desktop"></div>
            </div>
          }
        </Link>
        <FaveBtn
          id={id} name={name}
          poster={poster}
        />
      </div>
    </div>
  );
}


export default Movie;
