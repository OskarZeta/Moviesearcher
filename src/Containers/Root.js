import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import '../css/style.css';
import App from './App';

class Root extends Component {
  checkId(id){
    if (isNaN(id)) {
      return 'error';
    } else {
      return id;
    }
  }
  render() {
    return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={(routerProps) => {
          return(
            <App page={this.props.page} history={routerProps.history} favorites={this.props.favorites}/>
          );
        }}>
        </Route>
        <Route path='/favorites' render={(routerProps) => {
          //console.log('favorites');
          return(
            <App page={this.props.page} history={routerProps.history} favorites={this.props.favorites} favsPage={true}/>
          );
        }}>
        </Route>
        <Route path='/sort_by/:sortValue.:sortDir/genres=:genres/:page' render={(routerProps) => {
          let selected = routerProps.match.params.genres.split(',');
          selected = selected.map((id) => {
            return +id;
          });
          return(
            <App page={+routerProps.match.params.page} history={routerProps.history} sortValue={routerProps.match.params.sortValue} sortDir={routerProps.match.params.sortDir} genresSelected={selected} favorites={this.props.favorites}/>
          );
        }}>
        </Route>
        <Route path='/sort_by/:sortValue.:sortDir/genres=:genres' render={(routerProps) => {
          let selected = routerProps.match.params.genres.split(',');
          selected = selected.map((id) => {
            return +id;
          });
          return(
            <App page={this.props.page} history={routerProps.history} sortValue={routerProps.match.params.sortValue} sortDir={routerProps.match.params.sortDir} genresSelected={selected} favorites={this.props.favorites}/>
          );
        }}>
        </Route>
        <Route path='/sort_by/:sortValue.:sortDir/:page' render={(routerProps) => {
          return(
            <App page={+routerProps.match.params.page} history={routerProps.history} sortValue={routerProps.match.params.sortValue} sortDir={routerProps.match.params.sortDir} favorites={this.props.favorites}/>
          );
        }}>
        </Route>
        <Route path='/sort_by/:sortValue.:sortDir' render={(routerProps) => {
          return(
            <App page={this.props.page} history={routerProps.history} sortValue={routerProps.match.params.sortValue} sortDir={routerProps.match.params.sortDir} favorites={this.props.favorites}/>
          );
        }}>
        </Route>
        <Route path='/genres=:genres/:page' render={(routerProps) => {
          let selected = routerProps.match.params.genres.split(',');
          selected = selected.map((id) => {
            return +id;
          });
          return(
            <App page={+routerProps.match.params.page} history={routerProps.history} genresSelected={selected} clearInput={true} goHome={true} favorites={this.props.favorites}/>
          );
        }}>
        </Route>
        <Route path='/genres=:genres' render={(routerProps) => {
          let selected = routerProps.match.params.genres.split(',');
          selected = selected.map((id) => {
            return +id;
          });
          return(
            <App page={this.props.page} history={routerProps.history} genresSelected={selected} clearInput={true} goHome={true} favorites={this.props.favorites}/>
          );
        }}>
        </Route>
        <Route path='/search=:query/:page' render={(routerProps) => {
          return(
            <App page={+routerProps.match.params.page} history={routerProps.history} searchQuery={routerProps.match.params.query} goHome={false} favorites={this.props.favorites}/>
          );
        }}>
        </Route>
        <Route path='/search=:query' render={(routerProps) => {
          return(
            <App page={this.props.page} history={routerProps.history} searchQuery={routerProps.match.params.query} goHome={false} favorites={this.props.favorites}/>
          );
        }}>
        </Route>
        <Route exact path='/filmId/:id' render={(routerProps) => {
          return(
            <App filmId={this.checkId(+routerProps.match.params.id)} history={routerProps.history} favorites={this.props.favorites} />
          );
        }}>
        </Route>
        <Route exact path='/filmId/:id/crew' render={(routerProps) => {
          return(
            <App filmId={this.checkId(+routerProps.match.params.id)} history={routerProps.history} crewPage={true}/>
          );
        }}>
        </Route>
        <Route exact path='/filmId/:id/cast' render={(routerProps) => {
          return(
            <App filmId={this.checkId(+routerProps.match.params.id)} history={routerProps.history} castPage={true}/>
          );
        }}>
        </Route>
        <Route exact path='/filmId/:id/image=:image' render={(routerProps) => {
          return(
            <App filmId={this.checkId(+routerProps.match.params.id)} history={routerProps.history} favorites={this.props.favorites} imageIndex={+routerProps.match.params.image}/>
          );
        }}>
        </Route>
        <Route exact path='/filmId/:id/images' render={(routerProps) => {
          return(
            <App filmId={this.checkId(+routerProps.match.params.id)} history={routerProps.history} gallery={true}/>
          );
        }}>
        </Route>
        <Route exact path='/filmId/:id/images/:image' render={(routerProps) => {
          return(
            <App filmId={this.checkId(+routerProps.match.params.id)} history={routerProps.history} gallery={true} imageIndex={+routerProps.match.params.image}/>
          );
        }}>
        </Route>
        <Route path='/:page' render={(routerProps) => {
          console.log('BOB PAGE');
          return(
            <App page={+routerProps.match.params.page} history={routerProps.history} favorites={this.props.favorites}/>
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
    page: state.page,
    favorites: state.favorites
  }
};

export default connect(mapStateToProps)(Root);