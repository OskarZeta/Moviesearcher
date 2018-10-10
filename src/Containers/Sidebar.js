import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGenres } from '../Redux/actions/fetch_genres';
import Genre from '../Components/Genre';
import Sort from '../Components/Sort';
import Spinner from '../Components/Spinner';

class Sidebar extends Component {
  componentDidMount() {
    this.props.fetchGenres();
  }
  checkRadioBtn(param){
    if (this.props.query) {
      let query = this.props.query;
      if (query.value) {
        if (query.value === param) {
          return true;
        }
      }
      if (query.direction) {
        if (query.direction === param) {
          return true;
        }
      }
      if (query.genres) {
        let genres = query.genres.split(',');
        if (genres.indexOf(param.toString()) !== -1) {
          return true;
        }
      }
    }
  }
  makeGenreList() {
    let list = this.props.genreList;
    return list.map((genre) => {
      return(
        <Genre
          key={genre.id} id={genre.id} name={genre.name}
          query={this.props.query} history={this.props.history}
          check={this.checkRadioBtn(genre.id)}
        />
      );
    });
  }
  render(){
    return(
      <div className={this.props.query ? 'Sidebar' : 'Sidebar hidden'}>
        {this.props.genreList.length === 0 &&
          <Spinner/>
        }
        {this.props.genreList.length !== 0 &&
          <div className="Sidebar__wrapper">
            <div className="Sidebar__genreList">
              <h2 className="Sidebar__header">
                <span className="Sidebar__header-text">Select genres:</span>
              </h2>
              <div className="Sidebar__genreList-wrapper">
                {this.makeGenreList()}
              </div>
            </div>
            <div className="Sidebar__sort-params">
              <div className="Sidebar__sort">
                <h2 className="Sidebar__header">
                    <span className="Sidebar__header-text">Sort movies by:</span>
                </h2>
                <div className="Sidebar__sort-wrapper">
                  <Sort
                    name="sort" title="Popularity" value="popularity"
                    query={this.props.query} history={this.props.history}
                    defaultChecked={this.props.query ? this.props.query.value ? this.checkRadioBtn("popularity") : true : true}
                  />
                  <Sort
                    name="sort" title="Average votes" value="vote_average"
                    query={this.props.query} history={this.props.history}
                    defaultChecked={this.checkRadioBtn("vote_average")}
                  />
                  <Sort
                    name="sort" title="Number of votes" value="vote_count"
                    query={this.props.query} history={this.props.history}
                    defaultChecked={this.checkRadioBtn("vote_count")}
                  />
                  <Sort
                    name="sort" title="Original title" value="original_title"
                    query={this.props.query} history={this.props.history}
                    defaultChecked={this.checkRadioBtn("original_title")}
                  />
                  <Sort
                    name="sort" title="Release date" value="release_date"
                    query={this.props.query} history={this.props.history}
                    defaultChecked={this.checkRadioBtn("release_date")}
                  />
                </div>
              </div>
              <div className="Sidebar__sort">
                <h2 className="Sidebar__header">
                    <span className="Sidebar__header-text">Sorting direction:</span>
                </h2>
                <div className="Sidebar__sort-wrapper Sidebar__sort-wrapper--direction">
                  <Sort
                    name="direction" title="Descending" value="desc"
                    query={this.props.query} history={this.props.history}
                    defaultChecked={this.props.query ? this.props.query.value ? this.checkRadioBtn("desc") : true : true}
                  />
                  <Sort
                    name="direction" title="Ascending" value="asc"
                    query={this.props.query} history={this.props.history}
                    defaultChecked={this.checkRadioBtn("asc")}
                  />
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genreList: state.genreList,
    error: state.error
  }
};

const mapDispatchToProps = {
  fetchGenres
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
