import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovieCredits } from '../Redux/actions/movie_info/fetch_movie_credits';
import Spinner from '../Components/Spinner';

class Crew extends Component {
  loadCrew(){
    let crew = this.props.movieCredits.crew;
    return crew.map((person, index) => {
      return(
        <li className="MovieInfo__person" key={index}>
          <span className="MovieInfo__person-name">{person.name}</span>
          <span className="MovieInfo__person-character">{person.job}</span>
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
          {Object.keys(this.props.movieCredits).length !== 0 && this.loadCrew()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Crew);