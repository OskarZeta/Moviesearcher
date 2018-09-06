import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  changePage,
  clearGenres,
} from '../Redux/actions';
import { Link } from 'react-router-dom';

class Home extends Component {
  clickHandler () {
    this.props.changePage(1);
    this.props.clearGenres();
  }
  render(){
    return (
      <Link className="Header__home" to="/" onClick={() => {this.clickHandler()}}>
        <h1>Moviesearcher App</h1>
      </Link>
    );
  }
}

const mapDispatchToProps =  {
  changePage,
  clearGenres,
};

export default connect(null, mapDispatchToProps)(Home);