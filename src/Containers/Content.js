import React, { Component } from 'react';
import { fetchInitialData, changePage, loadOtherMovies } from '../Redux/actions';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MovieList from '../Components/MovieList';
import Pagination from '../Components/Pagination';


class Content extends Component {
  render(){
    return(
      <div className="App__wrapper-movies">
        <MovieList movieList={this.props.movieList} settings={this.props.settings.images}/>
        <Pagination page={this.props.page}/>
      </div>
    );
  };
}

export default Content;