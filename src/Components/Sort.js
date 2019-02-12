import React from 'react';
import { withRouter } from 'react-router-dom';

const queryString = require('query-string');

const Sort = ({ name, query, value, history, defaultChecked, title, direction }) => {
  const clickHandler = e => {
    let url;
    if (name === 'sort') {
      if (query) {
        if (!query.direction) {
          url = Object.assign({}, query, { value, direction: "desc" });
        } else {
          url = Object.assign({}, query);
        }
      } else {
        url = { direction: "desc" };
      }
      url.value = value;
    } else if (name === 'direction') {
      if (query) {
        if (!query.value) {
          url = Object.assign({}, query, { value: "popularity", direction });
        }
        url = Object.assign({}, query);
      } else {
        url = { value: "popularity" };
      }
      url.direction = value;
    }
    history.push(`/sort_by?${decodeURIComponent(queryString.stringify(url))}`);
  }
  return(
    <label className={defaultChecked ? 'Sidebar__sort-label Sidebar__sort-label--active' : 'Sidebar__sort-label'}>
      {defaultChecked &&
        <div className="Sidebar__sort-radiobtn Sidebar__sort-radiobtn--active">
          <input className="Sidebar__sort-input" type="radio" name={name} value={value} onClick={clickHandler} defaultChecked/>
          <span className="Sidebar__sort-custom"></span>
        </div>
      }
      {!defaultChecked &&
        <div className="Sidebar__sort-radiobtn">
          <input className="Sidebar__sort-input" type="radio" name={name} value={value} onClick={clickHandler} />
          <span className="Sidebar__sort-custom"></span>
        </div>
      }
      <span className="Sidebar__sort-name">{title}</span>
    </label>
  );
}

export default withRouter(Sort);
