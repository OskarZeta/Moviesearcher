import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  changePage,
  addGenres, removeGenres,
} from '../Redux/actions';

class Genre extends Component {
  checkHandler (e) {
    this.props.changePage(1);
    if (e.target.checked) {
      this.props.addGenres(this.props.id);
    } else {
      this.props.removeGenres(this.props.id);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.genresSelected !== prevProps.genresSelected) {
      if (this.props.genresSelected.includes(this.props.id) || prevProps.genresSelected.includes(this.props.id)) {
        if (this.props.genresSelected.length !== 0) {
          //console.log(this.props.sortValue, this.props.sortDir);
          if (this.props.sortValue && this.props.sortDir) {
            this.props.history.push(`/sort_by/${this.props.sortValue}.${this.props.sortDir}/genres=${this.props.genresSelected}/${this.props.page}`);
          } else {
            this.props.history.push(`/genres=${this.props.genresSelected}/${this.props.page}`);
          }
        } else {
          if (this.props.goHome) {
            //console.log('genres');
            this.props.history.push(`/`);
          } else if (this.props.sortValue && this.props.sortDir) {
            this.props.history.push(`/sort_by/${this.props.sortValue}.${this.props.sortDir}`);
          }
        }
      }
    }
  }
  render(){
    return(
      <label className="Genre__label">
        {this.props.check &&
        <input type="checkbox" name="tag" defaultChecked={true} onChange={(e) => {this.checkHandler(e)}}/>
        }
        {!this.props.check &&
        <input type="checkbox" name="tag" onChange={(e) => {this.checkHandler(e)}}/>
        }
        <span className="Genre__name">{this.props.name}</span>
      </label>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    genresSelected: state.genresSelected,
    page: state.page,
    history: ownProps.history,
    check: ownProps.check
  }
};

const mapDispatchToProps = {
  changePage,
  addGenres,
  removeGenres
};

export default connect(mapStateToProps, mapDispatchToProps)(Genre);