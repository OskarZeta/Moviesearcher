import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchGenres
} from '../Redux/actions';
import Genre from './Genre';

class Sidebar extends Component {
  componentDidMount() {
    //if (!this.props.disable) {
      this.props.fetchGenres();
    //}
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
        {this.props.disable &&
          <div className="Sidebar__wrapper--hidden">

          </div>
        }
        {!this.props.disable &&
          <div>
            {this.props.loadingGenres &&
            <div className="Sidebar__wrapper">
              Loading...
            </div>
            }
            {this.props.genresLoadingError && !this.props.loadingGenres && <div>ERROR while loading options</div>}
            {!this.props.loadingGenres && !this.props.genresLoadingError && Object.keys(this.props.genreList).length &&
              <div className="Sidebar__wrapper">
                <div className="Sidebar__genreList">
                  <h2>Select genres:</h2>
                  {this.makeGenreList()}
                </div>
                <div className="Sidebar__sort-params">
                  <h2>Sort movies by:</h2>
                  <label>
                    <input type="radio" name="sort" value="popularity" defaultChecked/>
                    <span className="Sidebar__sort-name">Popularity</span>
                  </label>
                  <label>
                    <input type="radio" name="sort" value="votes_average"/>
                    <span className="Sidebar__sort-name">Average vote</span>
                  </label>
                  <label>
                    <input type="radio" name="sort" value="votes_number"/>
                    <span className="Sidebar__sort-name">Number of votes</span>
                  </label>
                  <label>
                    <input type="radio" name="sort" value="original_title"/>
                    <span className="Sidebar__sort-name">Original title</span>
                  </label>
                  <div>
                    <h3>Choose sorting direction:</h3>
                    <label>
                      <input type="radio" name="direction" value="desc" defaultChecked/>
                      <span className="Sidebar__sort-name">Descending</span>
                    </label>
                    <label>
                      <input type="radio" name="direction" value="asc"/>
                      <span className="Sidebar__sort-name">Ascending</span>
                    </label>
                  </div>
                </div>
              </div>
            }
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
