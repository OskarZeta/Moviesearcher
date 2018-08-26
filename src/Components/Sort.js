import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {
//   changePage,
//   addGenres, removeGenres,
// } from '../Redux/actions';

class Sort extends Component {
  clickHandler (e) {
    if (this.props.name === 'sort') {
      let direction = e.target.parentNode.parentNode.parentNode.parentNode.querySelectorAll('input[name=direction]:checked')[0].value;
      if (this.props.genresSelected.length > 0) {
        this.props.history.push(`/sort_by/${this.props.value}.${direction}/genres=${this.props.genresSelected}`);
      } else {
        this.props.history.push(`/sort_by/${this.props.value}.${direction}`);
      }
    } else if (this.props.name === 'direction') {
      let sortType = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelectorAll('input[name=sort]:checked')[0].value;
      if (this.props.genresSelected.length > 0) {
        this.props.history.push(`/sort_by/${sortType}.${this.props.value}/genres=${this.props.genresSelected}`);
      } else {
        this.props.history.push(`/sort_by/${sortType}.${this.props.value}`);
      }
    }
  }
  render(){
    return(
      <label className="Sort">
        {this.props.defaultChecked &&
          <input type="radio" name={this.props.name} value={this.props.value} onClick={(e) => {
            this.clickHandler(e);
          }} defaultChecked/>
        }
        {!this.props.defaultChecked &&
          <input type="radio" name={this.props.name} value={this.props.value} onClick={(e) => {
            this.clickHandler(e);
          }}/>
        }
        <span className="Sort__name">{this.props.title}</span>
      </label>
    );
  }
}

export default Sort;