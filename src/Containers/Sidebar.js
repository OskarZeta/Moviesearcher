import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGenres } from '../Redux/actions/fetch_genres';
import Genre from '../Components/Genre';
import Sort from '../Components/Sort';
import Spinner from '../Components/Spinner';

class Sidebar extends Component {
  componentDidMount() {
    //console.log(this.props.query);
    this.props.fetchGenres();
  }
  componentDidUpdate(prevProps){
    if (this.props.query !== prevProps.query) {
      //console.log(this.props.query);
    }
  }
  checkRadioBtn(param){
    if (this.props.query) {
      let query = this.props.query;
      //console.log(query.direction);
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
        // genres.forEach((genre) => {
        //   console.log(genre, param);
        // });
        //console.log(genres, param);
        //console.log(genres.indexOf(param.toString()));
        if (genres.indexOf(param.toString()) !== -1) {
          return true;
        }
        // if (query.direction === param) {
        //   return true;
        // }
      }
    }
  }
  makeGenreList() {
    let list = this.props.genreList;
    //let selected = this.props.genresSelected;

    return list.map((genre) => {
      return(
        <Genre
          key={genre.id} id={genre.id} name={genre.name}
          query={this.props.query} history={this.props.history}
          check={this.checkRadioBtn(genre.id)}
        />
      );
      // if (selected.length > 0) {
      //   if (selected.indexOf(genre.id) !== -1) {
      //     return(
      //       <Genre key={genre.id} id={genre.id} name={genre.name} history={this.props.history} check={true} goHome={this.props.goHome} sortValue={this.props.sortValue} sortDir={this.props.sortDir}/>
      //     );
      //   } else {
      //     return (
      //       <Genre key={genre.id} id={genre.id} name={genre.name} history={this.props.history} check={false} goHome={this.props.goHome} sortValue={this.props.sortValue} sortDir={this.props.sortDir}/>
      //     );
      //   }
      // } else {
      //   return (
      //     <Genre key={genre.id} id={genre.id} name={genre.name} history={this.props.history} check={false} goHome={this.props.goHome} sortValue={this.props.sortValue} sortDir={this.props.sortDir}/>
      //   );
      // }
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
                    <span className="Sidebar__header-text">
                      Sort movies by:
                    </span>
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
                    <span className="Sidebar__header-text">
                      Sorting direction:
                    </span>
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
    // return(
    //   <div className="Sidebar">
    //     {!this.props.disable &&
    //       <div>
    //         {this.props.loadingGenres &&
    //           <div className="Sidebar__wrapper">
    //             Loading...
    //           </div>
    //         }
    //         {this.props.genresLoadingError && !this.props.loadingGenres && <div>ERROR while loading options</div>}
    //         {!this.props.loadingGenres && !this.props.genresLoadingError && Object.keys(this.props.genreList).length &&
    //           <div className="Sidebar__wrapper">
    //             <div className="Sidebar__genreList">
    //               <h2 className="Sidebar__header">
    //                 <span className="Sidebar__header-text">Select genres:</span>
    //               </h2>
    //               <div className="Sidebar__genreList-wrapper">
    //                 {this.makeGenreList()}
    //               </div>
    //             </div>
    //             <div className="Sidebar__sort-params">
    //               <div className="Sidebar__sort">
    //               <h2 className="Sidebar__header">
    //                 <span className="Sidebar__header-text">
    //                   Sort movies by:
    //                 </span>
    //               </h2>
    //                 {(this.props.sortValue === 'popularity' || !this.props.sortValue) &&
    //                   <div className="Sidebar__sort-wrapper">
    //                     <Sort name="sort" title="Popularity" value="popularity" history={this.props.history} genresSelected={this.props.genresSelected} defaultChecked/>
    //                     <Sort name="sort" title="Average votes" value="votes_average" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                     <Sort name="sort" title="Number of votes" value="votes_number" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                     <Sort name="sort" title="Original title" value="original_title" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                     <Sort name="sort" title="Release date" value="release_date" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                   </div>
    //                 }
    //                 {this.props.sortValue && this.props.sortValue === 'votes_average' &&
    //                   <div className="Sidebar__sort-wrapper">
    //                     <Sort name="sort" title="Popularity" value="popularity" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                     <Sort name="sort" title="Average votes" value="votes_average" history={this.props.history} genresSelected={this.props.genresSelected} defaultChecked/>
    //                     <Sort name="sort" title="Number of votes" value="votes_number" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                     <Sort name="sort" title="Original title" value="original_title" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                     <Sort name="sort" title="Release date" value="release_date" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                   </div>
    //                 }
    //                 {this.props.sortValue && this.props.sortValue === 'votes_number' &&
    //                   <div className="Sidebar__sort-wrapper">
    //                     <Sort name="sort" title="Popularity" value="popularity" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                     <Sort name="sort" title="Average votes" value="votes_average" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                     <Sort name="sort" title="Number of votes" value="votes_number" history={this.props.history} genresSelected={this.props.genresSelected} defaultChecked/>
    //                     <Sort name="sort" title="Original title" value="original_title" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                     <Sort name="sort" title="Release date" value="release_date" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                   </div>
    //                 }
    //                 {this.props.sortValue && this.props.sortValue === 'original_title' &&
    //                   <div className="Sidebar__sort-wrapper">
    //                     <Sort name="sort" title="Popularity" value="popularity" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                     <Sort name="sort" title="Average votes" value="votes_average" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                     <Sort name="sort" title="Number of votes" value="votes_number" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                     <Sort name="sort" title="Original title" value="original_title" history={this.props.history} genresSelected={this.props.genresSelected} defaultChecked/>
    //                     <Sort name="sort" title="Release date" value="release_date" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                   </div>
    //                 }
    //                 {this.props.sortValue && this.props.sortValue === 'release_date' &&
    //                   <div className="Sidebar__sort-wrapper">
    //                     <Sort name="sort" title="Popularity" value="popularity" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                     <Sort name="sort" title="Average votes" value="votes_average" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                     <Sort name="sort" title="Number of votes" value="votes_number" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                     <Sort name="sort" title="Original title" value="original_title" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                     <Sort name="sort" title="Release date" value="release_date" history={this.props.history} genresSelected={this.props.genresSelected} defaultChecked />
    //                   </div>
    //                 }
    //
    //               </div>
    //               <div className="Sidebar__sort">
    //                 <h2 className="Sidebar__header">
    //                   <span className="Sidebar__header-text">
    //                     Sorting direction:
    //                   </span>
    //                 </h2>
    //                   {(this.props.sortDir && this.props.sortDir === 'desc' || !this.props.sortDir) &&
    //                     <div className="Sidebar__sort-wrapper Sidebar__sort-wrapper--direction">
    //                       <Sort name="direction" title="Descending" value="desc" history={this.props.history} genresSelected={this.props.genresSelected} defaultChecked/>
    //                       <Sort name="direction" title="Ascending" value="asc" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                     </div>
    //                   }
    //                   {this.props.sortDir && this.props.sortDir === 'asc' &&
    //                     <div className="Sidebar__sort-wrapper Sidebar__sort-wrapper--direction">
    //                       <Sort name="direction" title="Descending" value="desc" history={this.props.history} genresSelected={this.props.genresSelected} />
    //                       <Sort name="direction" title="Ascending" value="asc" history={this.props.history} genresSelected={this.props.genresSelected} defaultChecked/>
    //                     </div>
    //                   }
    //               </div>
    //             </div>
    //           </div>
    //         }
    //       </div>
    //     }
    //   </div>
    // );
  }
}

const mapStateToProps = (state) => {
  return {
    //loadingGenres: state.loadingGenres,
    //genresLoadingError: state.genresLoadingError,
    genreList: state.genreList,
    error: state.error
    //genresSelected: ownProps.genresSelected || state.genresSelected
  }
};

const mapDispatchToProps = {
  fetchGenres
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
