import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchGenres
} from '../Redux/actions';
import Genre from './Genre';

class Sidebar extends Component {
  componentDidMount() {
    this.props.fetchGenres();
  }
  makeGenreList() {
    let list = this.props.genreList;
    let selected = this.props.genresSelected;
    return list.map((genre) => {
      if (selected.length > 0) {
        if (selected.includes(genre.id)) {
          return(
            <Genre key={genre.id} id={genre.id} name={genre.name} history={this.props.history} check={true} goHome={this.props.goHome}/>
          );
        } else {
          return (
            <Genre key={genre.id} id={genre.id} name={genre.name} history={this.props.history} check={false} goHome={this.props.goHome}/>
          );
        }
      } else {
        return (
          <Genre key={genre.id} id={genre.id} name={genre.name} history={this.props.history} check={false} goHome={this.props.goHome}/>
        );
      }
    });
  }
  render(){
    return(
      <div className="Sidebar">
        {this.props.loadingGenres && <div>Loading...</div>}
        {this.props.genresLoadingError && !this.props.loadingGenres && <div>ERROR while loading options</div>}
        {!this.props.loadingGenres && !this.props.genresLoadingError && Object.keys(this.props.genreList).length &&
          <div className="Sidebar__wrapper">
            {this.makeGenreList()}
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loadingGenres: state.loadingGenres,
    genresLoadingError: state.genresLoadingError,
    genreList: state.genreList,
    genresSelected: ownProps.genresSelected || state.genresSelected
  }
};

const mapDispatchToProps = {
  fetchGenres
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
