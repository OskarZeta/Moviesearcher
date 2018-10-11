import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Search extends Component {
  searchRequest(e){
    let query = e.target.value.trim();
    if (query.length > 0) {
      this.props.history.push(`/search?q=${query}`);
    } else {
      this.props.history.push(`/`);
    }
  }
  render(){
    return(
      <div className="Header__search-input-wrapper">
        {this.props.query &&
          <input
            type="search"
            autoFocus={!!this.props.query}
            defaultValue={this.props.query.q}
            onChange={(e) => {this.searchRequest(e)}} placeholder="Search..."
          />
        }
        {!this.props.query &&
          <input
            type="search"
            autoFocus={!!this.props.query}
            onChange={(e) => {this.searchRequest(e)}} placeholder="Search..."
          />
        }
      </div>
    );
  }
}

export default withRouter(Search);