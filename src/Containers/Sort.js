import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const queryString = require('query-string');

class Sort extends Component {
  componentDidMount(){
    //console.log(this.props.history);
  }
  clickHandler (e) {

    let url;
    // if (this.props.query) {
    //   url = Object.assign({}, this.props.query);
    // } else {
    //   url = {};
    // }
    if (this.props.name === 'sort') {
      if (this.props.query) {
        if (!this.props.query.direction) {
          url = Object.assign({}, this.props.query, {value: this.props.value}, {direction: "desc"});
          //console.log(url);
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
          url = Object.assign({}, this.props.query, {value: "popularity"});
        }
        url = Object.assign({}, this.props.query);
      } else {
        url = {value: "popularity"};
      }
      url.direction = this.props.value;
    }
    this.props.history.push(`/sort_by?${decodeURIComponent(queryString.stringify(url))}`);
    // if (this.props.name === 'sort') {
    //   let direction = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelectorAll('input[name=direction]:checked')[0].value;
    //   if (this.props.genresSelected.length > 0) {
    //     //this.props.history.push(`/sort_by/${this.props.value}.${direction}/genres=${this.props.genresSelected}`);
    //   } else {
    //     //this.props.history.push(`/sort_by/${this.props.value}.${direction}`);
    //     this.props.history.push(`/sort_by?value=${this.props.value}&direction=${direction}`);
    //   }
    // } else if (this.props.name === 'direction') {
    //   let sortType = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelectorAll('input[name=sort]:checked')[0].value;
    //   if (this.props.genresSelected.length > 0) {
    //     //this.props.history.push(`/sort_by/${sortType}.${this.props.value}/genres=${this.props.genresSelected}`);
    //   } else {
    //     //this.props.history.push(`/sort_by/${sortType}.${this.props.value}`);
    //     this.props.history.push(`/sort_by?value=${sortType}&direction=${this.props.value}`);
    //   }
    // }

    //console.log(this.props.query);
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

const mapStateToProps = (state) => {
  return {
    //genresSelected: state.genresSelected
  }
};

export default withRouter(connect(mapStateToProps)(Sort));
//export default Sort;