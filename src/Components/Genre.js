import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const queryString = require('query-string');

class Genre extends Component {
  checkHandler (e) {
    let url;
    if (this.props.query) {
      let genres = this.props.query.genres;
      url = Object.assign({}, this.props.query);
      if (e.target.checked) {
        if (!genres) {
          url.genres = this.props.id.toString();
        } else {
          let genresArray = url.genres.split(',');
          url.genres = genresArray.concat(this.props.id.toString()).join();
        }
      } else {
        let genresArray = url.genres.split(',');
        url.genres = genresArray.filter((genreId) => {
          return genreId !== this.props.id.toString();
        }).join();
        if (Object.keys(url.genres).length === 0) {
          delete url.genres;
        }
      }
    } else {
      url = {genres: this.props.id.toString()};
    }
    if (Object.keys(url).length !== 0) {
      this.props.history.push(`/sort_by?${decodeURIComponent(queryString.stringify(url))}`);
    } else {
      this.props.history.push(`/`);
    }
  }
  render(){
    return(
      <label className="Sidebar__genre-label">
        <div className="Sidebar__genre-checkbox">
          {this.props.check &&
            <input className="Sidebar__genre-input" type="checkbox" name="tag" defaultChecked={true} onChange={(e) => {this.checkHandler(e)}}/>
          }
          {!this.props.check &&
            <input className="Sidebar__genre-input" type="checkbox" name="tag" onChange={(e) => {this.checkHandler(e)}}/>
          }
          <span className="Sidebar__genre-custom"></span>
        </div>
        <span className="Sidebar__genre-name">{this.props.name}</span>
      </label>
    );
  }
}

export default withRouter(Genre);