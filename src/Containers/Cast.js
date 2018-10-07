import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovieCredits } from '../Redux/actions/movie_info/fetch_movie_credits';
import Spinner from '../Components/Spinner';

class Cast extends Component {
  loadCast(){
    let cast = this.props.movieCredits.cast;
    return cast.map((person, index) => {
      return(
        <li className="MovieInfo__person" key={index}>
          <span className="MovieInfo__person-name">{person.name}</span>
          <span className="MovieInfo__person-character">{person.character}</span>
        </li>
      );
    });
  }
  componentDidMount(){
    if (Object.keys(this.props.movieCredits).length === 0) {
      this.props.fetchMovieCredits(this.props.id);
    }
  }
  render(){
    return(
      <div className="container container--movieinfo">
        <ul className="App__credits">
          {Object.keys(this.props.movieCredits).length === 0 && <Spinner/>}
          {Object.keys(this.props.movieCredits).length !== 0 && this.loadCast()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movieCredits: state.movieCredits
  }
};

const mapDispatchToProps = {
  fetchMovieCredits
};

export default connect(mapStateToProps, mapDispatchToProps)(Cast);