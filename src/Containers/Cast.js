import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovieCredits } from '../Redux/actions/movie_info/fetch_movie_credits';

class Cast extends Component {
  loadCast() {
    let cast = this.props.movieCredits.cast;
    if (this.props.type === 'crew') {
      cast = this.props.movieCredits.crew;
    }
    return cast.map((person, index) =>
      <li className="MovieInfo__person" key={index}>
        <span className="MovieInfo__person-name">{person.name}</span>
        <span className="MovieInfo__person-character">{
          this.props.type === 'cast' ? person.character : person.job
        }</span>
      </li>
    );
  }
  componentDidMount() {
    if (!Object.keys(this.props.movieCredits).length) {
      this.props.fetchMovieCredits(this.props.id);
    }
  }
  render() {
    return(
      <div className="container container--movieinfo">
        <ul className="App__credits">
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
