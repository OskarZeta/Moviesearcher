import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { fetchSettings } from '../Redux/actions/fetch_settings';
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
import MovieInfo from './MovieInfo/MovieInfo';
import Gallery from './Gallery';
import Cast from './Cast';
import ErrorPage from '../Components/ErrorPage';

const queryString = require('query-string');

class App extends Component {
  getSettings() {
    this.props.fetchSettings(
      document.cookie ?
        JSON.parse(document.cookie.split(';')[0].split(' ')[0].split('settings=')[1]) :
        undefined
      );
  }
  makeQueryAndPage(searchQuery){
    return {
      query: searchQuery.split('/')[1] ? queryString.parse(searchQuery.split('/')[0]) : queryString.parse(searchQuery),
      page: searchQuery.split('/')[1] ? +searchQuery.split('/')[1] : 1
    }
  }
  componentDidMount() {
    this.getSettings();
  }
  render() {
    const settings = this.props.settings;
    return (
      <div className="App">
        {Object.keys(settings).length !== 0 &&
          <Switch>
            <Route exact path='/' render={() =>
              <>
                <Header/>
                <MovieList page={1} settings={settings}/>
              </>
            }/>
            <Route path='/sort_by' render={props =>
              <>
                <Header query={this.makeQueryAndPage(props.location.search).query}/>
                <MovieListSorted
                  query={this.makeQueryAndPage(props.location.search).query}
                  page={this.makeQueryAndPage(props.location.search).page}
                  settings={settings}
                />
              </>
            }/>
            <Route path='/search' render={props =>
              <>
                <Header query={this.makeQueryAndPage(props.location.search).query}/>
                <MovieListSearched
                  query={this.makeQueryAndPage(props.location.search).query}
                  page={this.makeQueryAndPage(props.location.search).page}
                  settings={settings}
                />
              </>
            }/>
            <Route path='/filmId/:id/gallery' render={props =>
              <>
                <HeaderMovieDetails id={+props.match.params.id}/>
                <Gallery
                  id={+props.match.params.id}
                  query={this.makeQueryAndPage(props.location.search).query}
                  settings={settings}
                />
              </>
            }/>
            <Route path='/filmId/:id/(cast|crew)' render={props =>
              <>
                <HeaderMovieDetails id={+props.match.params.id}/>
                <Cast id={+props.match.params.id} type={props.match.params[0]}/>
              </>
            }/>
            <Route path='/filmId/:id' render={props =>
              <>
                <HeaderMovie/>
                <MovieInfo
                  id={+props.match.params.id}
                  query={this.makeQueryAndPage(props.location.search).query}
                  settings={settings}
                />
              </>
            }/>
            <Route path='/favorites' render={() =>
              <>
                <HeaderFavorites/>
                <MovieListFavorites settings={settings}/>
              </>
            }/>
            <Route path='/:page(\d+)' render={props =>
              <>
                <Header/>
                <MovieList page={+props.match.params.page} settings={settings}/>
              </>
            }/>
            <Route component={ErrorPage}/>
          </Switch>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings
  }
};

const mapDispatchToProps = {
  fetchSettings
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
