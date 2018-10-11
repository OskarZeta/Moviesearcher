import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const queryString = require('query-string');

class Sort extends Component {
  clickHandler (e) {
    let url;
    if (this.props.name === 'sort') {
      if (this.props.query) {
        if (!this.props.query.direction) {
          url = Object.assign({}, this.props.query, {value: this.props.value}, {direction: "desc"});
        } else {
          url = Object.assign({}, this.props.query);
        }
      } else {
        url = {direction: "desc"};
      }
      url.value = this.props.value;
    } else if (this.props.name === 'direction') {
      if (this.props.query) {
        if (!this.props.query.value) {
          url = Object.assign({}, this.props.query, {value: "popularity"}, {direction: this.props.direction});
        }
        url = Object.assign({}, this.props.query);
      } else {
        url = {value: "popularity"};
      }
      url.direction = this.props.value;
    }
    this.props.history.push(`/sort_by?${decodeURIComponent(queryString.stringify(url))}`);
  }
  render(){
    return(
      <label className={this.props.defaultChecked ? 'Sidebar__sort-label Sidebar__sort-label--active' : 'Sidebar__sort-label'}>
        {this.props.defaultChecked &&
          <div className="Sidebar__sort-radiobtn Sidebar__sort-radiobtn--active">
            <input className="Sidebar__sort-input" type="radio" name={this.props.name} value={this.props.value} onClick={(e) => {
              this.clickHandler(e);
            }} defaultChecked/>
            <span className="Sidebar__sort-custom"></span>
          </div>
        }
        {!this.props.defaultChecked &&
          <div className="Sidebar__sort-radiobtn">
            <input className="Sidebar__sort-input" type="radio" name={this.props.name} value={this.props.value} onClick={(e) => {
              this.clickHandler(e);
            }}/>
            <span className="Sidebar__sort-custom"></span>
          </div>
        }
        <span className="Sidebar__sort-name">{this.props.title}</span>
      </label>
    );
  }
}

export default withRouter(Sort);