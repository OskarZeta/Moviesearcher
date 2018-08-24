import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchGenres
} from '../Redux/actions';
import Genre from './Genre';
import Sort from './Sort';

class Sidebar extends Component {
  componentDidMount() {
    //console.log(this.props.sortValue, this.props.sortDir);
    this.props.fetchGenres();
  }
  componentDidUpdate(prevProps) {
    //console.log(this.props.sortValue, this.props.sortDir);
    if (this.props.sortValue !== prevProps.sortValue || this.props.sortDir !== prevProps.sortDir) {
      //console.log(prevProps.sortValue, this.props.sortValue, prevProps.sortDir, this.props.sortDir);
    }
  }
  makeGenreList() {
    let list = this.props.genreList;
    let selected = this.props.genresSelected;
    return list.map((genre) => {
      if (selected.length > 0) {
        if (selected.includes(genre.id)) {
          return(
            <Genre key={genre.id} id={genre.id} name={genre.name} history={this.props.history} check={true} goHome={this.props.goHome} sortValue={this.props.sortValue} sortDir={this.props.sortDir}/>
          );
        } else {
          return (
            <Genre key={genre.id} id={genre.id} name={genre.name} history={this.props.history} check={false} goHome={this.props.goHome} sortValue={this.props.sortValue} sortDir={this.props.sortDir}/>
          );
        }
      } else {
        return (
          <Genre key={genre.id} id={genre.id} name={genre.name} history={this.props.history} check={false} goHome={this.props.goHome} sortValue={this.props.sortValue} sortDir={this.props.sortDir}/>
        );
      }
    });
  }
  render(){

    return(
      <div className="Sidebar">
        {this.props.disable &&
          <div className="Sidebar__wrapper--hidden"></div>
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
                  <div>
                  {(this.props.sortValue === 'popularity' || !this.props.sortValue) &&
                    <div>
                      <Sort name="sort" title="Popularity" value="popularity" history={this.props.history} genresSelected={this.props.genresSelected} defaultChecked/>
                      <Sort name="sort" title="Average votes" value="votes_average" history={this.props.history} genresSelected={this.props.genresSelected} />
                      <Sort name="sort" title="Number of votes" value="votes_number" history={this.props.history} genresSelected={this.props.genresSelected} />
                      <Sort name="sort" title="Original title" value="original_title" history={this.props.history} genresSelected={this.props.genresSelected} />
                    </div>
                  }
                  {this.props.sortValue && this.props.sortValue === 'votes_average' &&
                    <div>
                      <Sort name="sort" title="Popularity" value="popularity" history={this.props.history} genresSelected={this.props.genresSelected} />
                      <Sort name="sort" title="Average votes" value="votes_average" history={this.props.history} genresSelected={this.props.genresSelected} defaultChecked/>
                      <Sort name="sort" title="Number of votes" value="votes_number" history={this.props.history} genresSelected={this.props.genresSelected} />
                      <Sort name="sort" title="Original title" value="original_title" history={this.props.history} genresSelected={this.props.genresSelected} />
                    </div>
                  }
                  {this.props.sortValue && this.props.sortValue === 'votes_number' &&
                    <div>
                      <Sort name="sort" title="Popularity" value="popularity" history={this.props.history} genresSelected={this.props.genresSelected} />
                      <Sort name="sort" title="Average votes" value="votes_average" history={this.props.history} genresSelected={this.props.genresSelected} />
                      <Sort name="sort" title="Number of votes" value="votes_number" history={this.props.history} genresSelected={this.props.genresSelected} defaultChecked/>
                      <Sort name="sort" title="Original title" value="original_title" history={this.props.history} genresSelected={this.props.genresSelected} />
                    </div>
                  }
                  {this.props.sortValue && this.props.sortValue === 'original_title' &&
                    <div>
                      <Sort name="sort" title="Popularity" value="popularity" history={this.props.history} genresSelected={this.props.genresSelected} />
                      <Sort name="sort" title="Average votes" value="votes_average" history={this.props.history} genresSelected={this.props.genresSelected} />
                      <Sort name="sort" title="Number of votes" value="votes_number" history={this.props.history} genresSelected={this.props.genresSelected} />
                      <Sort name="sort" title="Original title" value="original_title" history={this.props.history} genresSelected={this.props.genresSelected} defaultChecked/>
                    </div>
                  }
                  </div>
                  <div>
                    <h3>Choose sorting direction:</h3>
                    <div>
                    {(this.props.sortDir && this.props.sortDir === 'desc' || !this.props.sortDir) &&
                      <div>
                        <Sort name="direction" title="Descending" value="desc" history={this.props.history} genresSelected={this.props.genresSelected} defaultChecked/>
                        <Sort name="direction" title="Ascending" value="asc" history={this.props.history} genresSelected={this.props.genresSelected} />
                      </div>
                    }
                    {this.props.sortDir && this.props.sortDir === 'asc' &&
                      <div>
                        <Sort name="direction" title="Descending" value="desc" history={this.props.history} genresSelected={this.props.genresSelected} />
                        <Sort name="direction" title="Ascending" value="asc" history={this.props.history} genresSelected={this.props.genresSelected} defaultChecked/>
                      </div>
                    }
                    </div>
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
