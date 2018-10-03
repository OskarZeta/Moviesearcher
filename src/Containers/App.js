import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { fetchSettings } from '../Redux/actions/fetch_settings';
import { connect } from 'react-redux';
import '../css/style.css';
// import MovieList from '../Components/MovieList';
// import MovieInfo from '../Containers/MovieInfo';
// import Gallery from '../Components/Gallery';
// import Spinner from '../Components/Spinner';
// import Header from '../Components/Header';
// import Pagination from '../Components/Pagination';
// import Favorites from '../Components/Favorites';
// import Crew from '../Components/Crew';
// import Cast from '../Components/Cast';

import Header from '../Components/Header/Header';
import HeaderMovie from '../Components/Header/HeaderMovie';
import HeaderMovieDetails from '../Components/Header/HeaderMovieDetails';
import MovieList from './MovieList/MovieList';
import MovieListSorted from './MovieList/MovieListSorted';
import MovieListSearched from './MovieList/MovieListSearched';
import MovieInfo from './MovieInfo';

const queryString = require('query-string');

class App extends Component {
  getSettings() {
    if (!document.cookie) {
      this.props.fetchSettings();
    } else {
      this.props.fetchSettings(JSON.parse(document.cookie.split(';')[0].split(' ')[0].split('settings=')[1]));
    }
  }
  makeQueryAndPage(searchQuery){
    if (searchQuery.split('/')[1]) {
      return {
        query: queryString.parse(searchQuery.split('/')[0]),
        page: +searchQuery.split('/')[1]
      };
    } else {
      return {
        query: queryString.parse(searchQuery),
        page: 1
      };
    }
  }
  componentDidMount() {
    this.getSettings();

    // if (this.props.filmId === 'error' || Number.isNaN(this.props.page)) {
    //   console.log('wrong data');
    //   this.props.history.push('/');
    // }
    // this.getSettings();
    // if (this.props.filmId) {
    //   if (this.props.gallery) {
    //     this.props.fetchMovieImages(this.props.filmId);
    //   }
    //   else if (this.props.crewPage || this.props.castPage) {
    //     this.props.fetchMovieCredits(this.props.filmId);
    //   }
    //   else {
    //     this.props.fetchMovieDetails(this.props.filmId);
    //   }
    // } else {
    //   if (this.props.genresSelected.length > 0) {
    //     this.props.genresSelected.forEach((id) => {
    //       this.props.addGenres(id);
    //     });
    //     if (this.props.sortValue && this.props.sortDir){
    //       this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir, this.props.genresSelected);
    //     } else {
    //       this.props.fetchGenredMovies(this.props.page, this.props.genresSelected);
    //     }
    //   }
    //   else if (this.props.searchQuery) {
    //     this.props.fetchSearchedMovies(Number.isNaN(this.props.page) ? 1 : this.props.page, this.props.searchQuery);
    //   }
    //   else {
    //     if (this.props.sortValue && this.props.sortDir){
    //       this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir);
    //     }  else {
    //       this.props.fetchPopularMovies(Number.isNaN(this.props.page) ? 1 : this.props.page);
    //     }
    //   }
    // }
  }

  componentDidUpdate(prevProps) {

    // console.log(this.props.location);

    // if (this.props.favorites !== prevProps.favorites) {
    //   localStorage.setItem('favorites', JSON.stringify(this.props.favorites));
    // }
    // if (this.props.filmId) {
    //   if (this.props.filmId !== prevProps.filmId ||
    //     ((this.props.filmId === prevProps.filmId) && this.props.gallery !== prevProps.gallery) ||
    //     ((this.props.filmId === prevProps.filmId) && this.props.crewPage !== prevProps.crewPage) ||
    //     ((this.props.filmId === prevProps.filmId) && this.props.castPage !== prevProps.castPage)){
    //     this.props.fetchMovieDetails(this.props.filmId);
    //   }
    // }
    // else if (this.props.searchQuery !== prevProps.searchQuery) {
    //   if (this.props.searchQuery) {
    //     this.props.fetchSearchedMovies(this.props.page, this.props.searchQuery);
    //   } else if (this.props.sortValue !== prevProps.sortValue || this.props.sortDir !== prevProps.sortDir) {
    //     if (this.props.sortValue && this.props.sortDir) {
    //       this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir);
    //     }
    //   } else {
    //     this.props.fetchPopularMovies(this.props.page);
    //   }
    // }
    // else if (this.props.sortValue !== prevProps.sortValue || this.props.sortDir !== prevProps.sortDir) {
    //   if (this.props.sortValue && this.props.sortDir){
    //     if (this.props.genresSelected.length > 0) {
    //       this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir, this.props.genresSelected);
    //     } else {
    //       this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir);
    //     }
    //   } else {
    //     this.props.fetchPopularMovies(this.props.page);
    //   }
    // }
    // else if (this.props.genresSelected !== prevProps.genresSelected && this.props.favorites === prevProps.favorites) {
    //   //console.log('genres changed');
    //   if (this.props.searchQuery !== prevProps.searchQuery){
    //     //console.log('search changed');
    //     if (this.props.genresSelected.length === 0) {
    //       if (this.props.searchQuery) {
    //         this.props.fetchSearchedMovies(this.props.page, this.props.searchQuery);
    //       } else {
    //         this.props.fetchPopularMovies(this.props.page);
    //       }
    //     } else {
    //       this.props.fetchGenredMovies(this.props.page, this.props.genresSelected);
    //     }
    //   }
    //   else if (this.props.sortValue && this.props.sortDir) {
    //     //console.log('sort changed');
    //     if (this.props.genresSelected.length > 0) {
    //       this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir, this.props.genresSelected);
    //     } else {
    //       this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir);
    //     }
    //   }
    //   else {
    //     this.props.fetchGenredMovies(this.props.page, this.props.genresSelected);
    //   }
    //
    // }
    // else if (this.props.page !== prevProps.page) {
    //   if (this.props.genresSelected.length > 0 ) {
    //     //console.log('page & genres');
    //     if (this.props.sortValue && this.props.sortDir) {
    //       this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir, this.props.genresSelected);
    //     } else {
    //       this.props.fetchGenredMovies(this.props.page, this.props.genresSelected);
    //     }
    //   } else if (this.props.sortValue && this.props.sortDir) {
    //     //console.log('page & sort');
    //     this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir);
    //   } else if (this.props.searchQuery) {
    //     //console.log('page & search');
    //     this.props.fetchSearchedMovies(this.props.page, this.props.searchQuery)
    //   } else {
    //     //console.log('page, only page');
    //     this.props.fetchPopularMovies(this.props.page);
    //   }
    // }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={() => {
            return(
              <div>
                <Header/>
                <MovieList page={1}/>
              </div>
            );
          }}/>
          <Route path='/sort_by' render={(props) => {
            return(
              <div>
                <Header
                  query={this.makeQueryAndPage(props.location.search).query}
                />
                <MovieListSorted
                  query={this.makeQueryAndPage(props.location.search).query}
                  page={this.makeQueryAndPage(props.location.search).page}
                />
              </div>
            );
          }}/>
          <Route path='/search' render={(props) => {
            return(
              <div>
                <Header
                  query={this.makeQueryAndPage(props.location.search).query}
                />
                <MovieListSearched
                  query={this.makeQueryAndPage(props.location.search).query}
                  page={this.makeQueryAndPage(props.location.search).page}
                />
              </div>
            );
          }}/>
          <Route path='/filmId/:id' render={(props) => {
            return(
              <div>
                <HeaderMovie/>
                <MovieInfo id={+props.match.params.id}/>
              </div>
            );
          }}/>
          <Route path='/:page(\d+)' render={(props) => {
            //console.log('page');
            return(
              <div>
                <Header/>
                <MovieList page={+props.match.params.page}/>
              </div>
            );
          }}/>
          <Route render={(props) => {
            console.log(props);
            return(
              <div>wrong route</div>
            );
          }}>
          </Route>
        </Switch>

        {/*{!this.props.filmId && !this.props.favsPage &&*/}
          {/*<div>*/}
            {/*<Header history={this.props.history}*/}
                    {/*searchQuery={this.props.searchQuery}*/}
                    {/*genresSelected={this.props.genresSelected}*/}
                    {/*goHome={this.props.goHome}*/}
                    {/*sortValue={this.props.sortValue}*/}
                    {/*sortDir={this.props.sortDir}*/}
            {/*/>*/}
            {/*<div className="container container--movielist">*/}
              {/*{this.props.loadingMovies && <Spinner/>}*/}
              {/*{this.props.initialLoadingError && !this.props.loadingMovies && <div>ERROR!</div>}*/}
              {/*{!this.props.loadingMovies && !this.props.initialLoadingError && this.props.movieList.length > 0 && Object.keys(this.props.settings).length && this.props.favorites &&*/}
                {/*<div className="App__wrapper-movies" >*/}
                  {/*<MovieList movieList={this.props.movieList} settings={this.props.settings.images} favorites={this.props.favorites}/>*/}
                  {/*<Pagination page={this.props.page} genresSelected={this.props.genresSelected} searchQuery={this.props.searchQuery} sortValue={this.props.sortValue} sortDir={this.props.sortDir}/>*/}
                {/*</div>*/}
              {/*}*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*}*/}
        {/*{this.props.filmId && !this.props.gallery && !this.props.crewPage && !this.props.castPage &&*/}
          {/*<div>*/}
            {/*<Header filmId={this.props.filmId}/>*/}
            {/*<div className="container container--movieinfo">*/}
              {/*{this.props.loadingMovieDetails && <Spinner/>}*/}
              {/*{this.props.movieDetailsError && !this.props.loadingMovieDetails && <div>ERROR!</div>}*/}
              {/*{!this.props.loadingMovieDetails && !this.props.movieDetailsError && this.props.movieDetails && Object.keys(this.props.settings).length && this.props.favorites &&*/}
                {/*<div className="App__wrapper-movies">*/}
                  {/*<MovieInfo movieDetails={this.props.movieDetails} settings={this.props.settings.images} favorites={this.props.favorites}*/}
                  {/*imageIndex={this.props.imageIndex} history={this.props.history}/>*/}
                {/*</div>*/}
              {/*}*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*}*/}
        {/*{this.props.filmId && this.props.gallery && !this.props.crewPage && !this.props.castPage &&*/}
          {/*<div>*/}
            {/*<Header filmId={this.props.filmId} toMovie={true}/>*/}
            {/*<div className="container container--movieinfo">*/}
              {/*{this.props.loadingMovieImages && <Spinner/>}*/}
              {/*{this.props.movieImagesError && !this.props.loadingMovieImages && <div>GALLERY ERROR!</div>}*/}
              {/*{!this.props.loadingMovieImages && !this.props.movieImagesError && this.props.movieImages && Object.keys(this.props.settings).length &&*/}
                {/*<div className="App__wrapper-movies">*/}
                  {/*<Gallery filmId={this.props.filmId} movieImages={this.props.movieImages} settings={this.props.settings.images}*/}
                  {/*imageIndex={this.props.imageIndex} history={this.props.history}/>*/}
                {/*</div>*/}
              {/*}*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*}*/}
        {/*{this.props.filmId && !this.props.gallery && this.props.crewPage && !this.props.castPage &&*/}
          {/*<div>*/}
            {/*<Header filmId={this.props.filmId} toMovie={true}/>*/}
            {/*<div className="container container--movieinfo">*/}
              {/*{this.props.loadingMovieCredits && <Spinner/>}*/}
              {/*{this.props.movieCreditsError && !this.props.loadingMovieCredits && <div>CREW ERROR!</div>}*/}
              {/*{!this.props.loadingMovieCredits && !this.props.movieCreditsError && this.props.movieCredits && Object.keys(this.props.settings).length &&*/}
                {/*<div className="App__wrapper-movies">*/}
                  {/*<Crew crew={this.props.movieCredits.crew}/>*/}
                {/*</div>*/}
              {/*}*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*}*/}
        {/*{this.props.filmId && !this.props.gallery && !this.props.crewPage && this.props.castPage &&*/}
          {/*<div>*/}
            {/*<Header filmId={this.props.filmId} toMovie={true}/>*/}
            {/*<div className="container container--movieinfo">*/}
              {/*{this.props.loadingMovieCredits && <Spinner/>}*/}
              {/*{this.props.movieCreditsError && !this.props.loadingMovieCredits && <div>CAST ERROR!</div>}*/}
              {/*{!this.props.loadingMovieCredits && !this.props.movieCreditsError && this.props.movieCredits && Object.keys(this.props.settings).length &&*/}
                {/*<div className="App__wrapper-movies">*/}
                  {/*<Cast cast={this.props.movieCredits.cast}/>*/}
                {/*</div>*/}
              {/*}*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*}*/}
        {/*{this.props.favsPage &&*/}
          {/*<div>*/}
            {/*<Header filmId={this.props.filmId} toFavs={true}/>*/}
            {/*<div className="container container--movieinfo">*/}
              {/*{this.props.favorites && Object.keys(this.props.settings).length &&*/}
                {/*<div className="App__wrapper-movies">*/}
                  {/*<Favorites settings={this.props.settings} favorites={this.props.favorites} favsPage={this.props.favsPage}/>*/}
                {/*</div>*/}
              {/*}*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*}*/}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // loadingMovies: state.loadingMovies,
    // initialLoadingError: state.initialLoadingError,
    // movieList: state.movieList,
    // settings: state.settings,
    // page: ownProps.page,
    // url: state.url,
    // history: ownProps.history,
    // genresSelected: ownProps.genresSelected || state.genresSelected,
    // searchQuery: ownProps.searchQuery,
    // loadingMovieDetails: state.loadingMovieDetails,
    // movieDetailsError: state.movieDetailsError,
    // movieDetails: state.movieDetails,
    // loadingMovieImages: state.loadingMovieImages,
    // movieImagesError: state.movieImagesError,
    // movieImages: state.movieImages,
    // loadingMovieCredits: state.loadingMovieCredits,
    // movieCreditsError: state.movieCreditsError,
    // movieCredits: state.movieCredits,
    // favorites: state.favorites,
    // imageIndex: ownProps.imageIndex
  }
};

const mapDispatchToProps = {
  fetchSettings
  // fetchGenredMovies,
  // fetchSortedMovies,
  // fetchSearchedMovies,
  // fetchPopularMovies,
  // fetchSettings,
  // loadSettingsFromCookie,
  // fetchMovieDetails,
  // fetchMovieImages,
  // fetchMovieCredits,
  // addGenres,
  // clearGenres,
  // changePage
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));