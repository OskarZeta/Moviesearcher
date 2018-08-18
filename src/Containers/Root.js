import React, { Component } from 'react';
import {Provider, connect} from 'react-redux';
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
        <Route path='/genres=:genres/:page' render={(routerProps) => {
          let selected = routerProps.match.params.genres.split(',');
          selected = selected.map((id) => {
            return +id;
          });
          return(
            <App page={+routerProps.match.params.page} history={routerProps.history} genresSelected={selected}/>
          );
        }}>
        </Route>
        <Route path='/genres=:genres' render={(routerProps) => {
          let selected = routerProps.match.params.genres.split(',');
          selected = selected.map((id) => {
            return +id;
          });
          return(
            <App page={this.props.page} history={routerProps.history} genresSelected={selected}/>
          );
        }}>
        </Route>
        <Route path='/:page' render={(routerProps) => {
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