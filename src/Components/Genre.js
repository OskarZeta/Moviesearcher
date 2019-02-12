import React from 'react';
import { withRouter } from 'react-router-dom';

const queryString = require('query-string');

const Genre = ({ query, id, check, name, history }) => {
  const checkHandler = e => {
    let url;
    if (query) {
      let genres = query.genres;
      url = Object.assign({}, query);
      if (e.target.checked) {
        if (!genres) {
          url.genres = id.toString();
        } else {
          let genresArray = url.genres.split(',');
          url.genres = genresArray.concat(id.toString()).join();
        }
      } else {
        let genresArray = url.genres.split(',');
        url.genres = genresArray.filter((genreId) =>
          genreId !== id.toString()
        ).join();
        if (Object.keys(url.genres).length === 0) {
          delete url.genres;
        }
      }
    } else {
      url = { genres: id.toString() };
    }
    if (Object.keys(url).length !== 0) {
      history.push(`/sort_by?${decodeURIComponent(queryString.stringify(url))}`);
    } else {
      history.push(`/`);
    }
  }
  return (
    <label className="Sidebar__genre-label">
      <div className="Sidebar__genre-checkbox">
        {check &&
          <input className="Sidebar__genre-input" type="checkbox" name="tag" defaultChecked={true} onChange={(e) => {checkHandler(e)}}/>
        }
        {!check &&
          <input className="Sidebar__genre-input" type="checkbox" name="tag" onChange={(e) => {checkHandler(e)}}/>
        }
        <span className="Sidebar__genre-custom"></span>
      </div>
      <span className="Sidebar__genre-name">{name}</span>
    </label>
  );
}

export default withRouter(Genre);
