import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGenres, removeGenres } from '../Redux/actions/change_genres';
import { changePage } from '../Redux/actions/change_page';

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
      if (this.props.genresSelected.length !== 0 || prevProps.genresSelected.length !== 0) {
        if (this.props.genresSelected.indexOf(this.props.id) !== -1 || prevProps.genresSelected.indexOf(this.props.id) !== -1) {
          if (this.props.genresSelected.length !== 0) {
            if (this.props.sortValue && this.props.sortDir) {
              this.props.history.push(`/sort_by/${this.props.sortValue}.${this.props.sortDir}/genres=${this.props.genresSelected}/${this.props.page}`);
            } else {
              this.props.history.push(`/genres=${this.props.genresSelected}/${this.props.page}`);
            }
          } else {
            if (this.props.goHome) {
              this.props.history.push(`/`);
            } else if (this.props.sortValue && this.props.sortDir) {
              this.props.history.push(`/sort_by/${this.props.sortValue}.${this.props.sortDir}`);
            }
          }
        }
      }
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