import React from 'react';
import { withRouter } from 'react-router-dom';

const Search = ({ history, query }) => {
  const searchRequest = e => {
    let query = e.target.value.trim();
    if (query.length > 0) {
      history.push(`/search?q=${query}`);
    } else {
      history.push(`/`);
    }
  }
  return (
    <div className="Header__search-input-wrapper">
      {query &&
        <input
          type="search"
          autoFocus={!!query}
          defaultValue={query.q}
          onChange={searchRequest} placeholder="Search..."
        />
      }
      {!query &&
        <input
          type="search"
          autoFocus={!!query}
          onChange={searchRequest} placeholder="Search..."
        />
      }
    </div>
  );
}

export default withRouter(Search);
