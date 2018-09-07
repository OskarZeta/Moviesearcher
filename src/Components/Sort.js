import React, { Component } from 'react';

class Sort extends Component {
  clickHandler (e) {
    if (this.props.name === 'sort') {
      let direction = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelectorAll('input[name=direction]:checked')[0].value;
      if (this.props.genresSelected.length > 0) {
        this.props.history.push(`/sort_by/${this.props.value}.${direction}/genres=${this.props.genresSelected}`);
      } else {
        this.props.history.push(`/sort_by/${this.props.value}.${direction}`);
      }
    } else if (this.props.name === 'direction') {
      let sortType = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelectorAll('input[name=sort]:checked')[0].value;
      if (this.props.genresSelected.length > 0) {
        this.props.history.push(`/sort_by/${sortType}.${this.props.value}/genres=${this.props.genresSelected}`);
      } else {
        this.props.history.push(`/sort_by/${sortType}.${this.props.value}`);
      }
    }
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

export default Sort;