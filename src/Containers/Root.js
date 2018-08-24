import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';

class Root extends Component {
  render() {
    return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={(routerProps) => {
          return(
            <App page={this.props.page} history={routerProps.history}/>
          );
        }}>
        </Route>

        <Route path='/sort_by/:sortValue.:sortDir/genres=:genres/:page' render={(routerProps) => {
          let selected = routerProps.match.params.genres.split(',');
          selected = selected.map((id) => {
            return +id;
          });
          return(
            <App page={+routerProps.match.params.page} history={routerProps.history} sortValue={routerProps.match.params.sortValue} sortDir={routerProps.match.params.sortDir} genresSelected={selected}/>
          );
        }}>
        </Route>
        <Route path='/sort_by/:sortValue.:sortDir/genres=:genres' render={(routerProps) => {
          let selected = routerProps.match.params.genres.split(',');
          selected = selected.map((id) => {
            return +id;
          });
          return(
            <App page={this.props.page} history={routerProps.history} sortValue={routerProps.match.params.sortValue} sortDir={routerProps.match.params.sortDir} genresSelected={selected}/>
          );
        }}>
        </Route>

        <Route path='/sort_by/:sortValue.:sortDir/:page' render={(routerProps) => {
          return(
            <App page={+routerProps.match.params.page} history={routerProps.history} sortValue={routerProps.match.params.sortValue} sortDir={routerProps.match.params.sortDir}/>
          );
        }}>
        </Route>
        <Route path='/sort_by/:sortValue.:sortDir' render={(routerProps) => {
          return(
            <App page={this.props.page} history={routerProps.history} sortValue={routerProps.match.params.sortValue} sortDir={routerProps.match.params.sortDir}/>
          );
        }}>
        </Route>


        <Route path='/genres=:genres/:page' render={(routerProps) => {
          let selected = routerProps.match.params.genres.split(',');
          selected = selected.map((id) => {
            return +id;
          });
          return(
            <App page={+routerProps.match.params.page} history={routerProps.history} genresSelected={selected} clearInput={true} goHome={true}/>
          );
        }}>
        </Route>
        <Route path='/genres=:genres' render={(routerProps) => {
          let selected = routerProps.match.params.genres.split(',');
          selected = selected.map((id) => {
            return +id;
          });
          return(
            <App page={this.props.page} history={routerProps.history} genresSelected={selected} clearInput={true} goHome={true}/>
          );
        }}>
        </Route>
        <Route path='/search=:query/:page' render={(routerProps) => {
          //console.log('search/page');
          return(
            <App page={+routerProps.match.params.page} history={routerProps.history} searchQuery={routerProps.match.params.query} goHome={false}/>
          );
        }}>
        </Route>
        <Route path='/search=:query' render={(routerProps) => {
          //console.log('search');
          return(
            <App page={this.props.page} history={routerProps.history} searchQuery={routerProps.match.params.query} goHome={false}/>
          );
        }}>
        </Route>
        <Route exact path='/filmId/:id' render={(routerProps) => {
          let id;
          if (isNaN(+routerProps.match.params.id)) {
            id = 'error';
          } else {
            id = +routerProps.match.params.id;
          }
          return(
            <App filmId={id} history={routerProps.history}/>
          );
        }}>
        </Route>
        <Route path='/:page' render={(routerProps) => {
          console.log('BOB PAGE');
          return(
            <App page={+routerProps.match.params.page} history={routerProps.history}/>
          );
        }}>
        </Route>
      </Switch>
    </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.page
  }
};

export default connect(mapStateToProps)(Root);