import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { fetchSettings } from '../Redux/actions/fetch_settings';
import { loadFavorites } from '../Redux/actions/change_favorites';
import { connect } from 'react-redux';
import '../css/style.css';
import Header from '../Components/Header/Header';
import HeaderMovie from '../Components/Header/HeaderMovie';
import HeaderMovieDetails from '../Components/Header/HeaderMovieDetails';
import HeaderFavorites from '../Components/Header/HeaderFavorites';
import MovieList from './MovieList/MovieList';
import MovieListSorted from './MovieList/MovieListSorted';
import MovieListSearched from './MovieList/MovieListSearched';
import MovieListFavorites from './MovieList/MovieListFavorites';
import MovieInfo from './MovieInfo';
import Gallery from './Gallery';
import Cast from './Cast';
import Crew from './Crew';

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
    this.props.loadFavorites();
  }
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => {
          return(
            <div className="App">
              <Header/>
              <MovieList page={1}/>
            </div>
          );
        }}/>
        <Route path='/sort_by' render={(props) => {
          return(
            <div className="App">
              <Header query={this.makeQueryAndPage(props.location.search).query}/>
              <MovieListSorted query={this.makeQueryAndPage(props.location.search).query} page={this.makeQueryAndPage(props.location.search).page}/>
            </div>
          );
        }}/>
        <Route path='/search' render={(props) => {
          return(
            <div className="App">
              <Header query={this.makeQueryAndPage(props.location.search).query}/>
              <MovieListSearched query={this.makeQueryAndPage(props.location.search).query} page={this.makeQueryAndPage(props.location.search).page}/>
            </div>
          );
        }}/>
        <Route path='/filmId/:id/images' render={(props) => {
          return(
            <div className="App">
              <HeaderMovieDetails id={+props.match.params.id}/>
              <Gallery id={+props.match.params.id} query={this.makeQueryAndPage(props.location.search).query}/>
            </div>
          );
        }}/>
        <Route path='/filmId/:id/(cast|crew)' render={(props) => {
          return(
            <div className="App">
              <HeaderMovieDetails id={+props.match.params.id}/>
              {props.match.params[0] === "cast" &&
                <Cast id={+props.match.params.id}/>
              }
              {props.match.params[0] === "crew" &&
                <Crew id={+props.match.params.id}/>
              }
            </div>
          );
        }}/>
        <Route path='/filmId/:id' render={(props) => {
          return(
            <div className="App">
              <HeaderMovie/>
              <MovieInfo id={+props.match.params.id} query={this.makeQueryAndPage(props.location.search).query}/>
            </div>
          );
        }}/>
        <Route path='/favorites' render={() => {
          return(
            <div className="App">
              <HeaderFavorites/>
              <MovieListFavorites/>
            </div>
          );
        }}/>
        <Route path='/:page(\d+)' render={(props) => {
          return(
            <div className="App">
              <Header/>
              <MovieList page={+props.match.params.page}/>
            </div>
          );
        }}/>
        <Route render={(props) => {
          return(
            <div className="App">
              <div className="container container--error-page">
                <h1 className="App__error-header">ERROR! :(</h1>
                <div className="App__error-text">
                  <span>Page not found.</span>
                  <a className="App__error-link" href="/Moviesearcher/">Home</a>
                </div>
              </div>
            </div>
          );
        }}/>
      </Switch>
    );
  }
}

const mapDispatchToProps = {
  fetchSettings,
  loadFavorites
};

export default withRouter(connect(null, mapDispatchToProps)(App));