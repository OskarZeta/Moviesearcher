import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovieCredits } from '../../Redux/actions/movie_info/fetch_movie_credits';
import ShowLink from '../../Components/ShowLink';
import Spinner from '../../Components/Spinner';

const castToShowPreview = 8;

class CastPreview extends Component {
  state = {
    isLoaded: false
  }
  loadCast() {
    let cast = this.props.movieCredits.cast;
    if (this.props.type === 'crew') {
      cast = this.props.movieCredits.crew.filter(person =>
        person.job === "Director"
      );
    }
    if (cast.length === 0) {
      return(
        <div className="MovieInfo__info MovieInfo__info--na">Not available</div>
      );
    } else {
      cast = cast.filter((_, i) => i < castToShowPreview);
      return cast.map((person, index) =>
        <div className="MovieInfo__person" key={person.id}>
          <span className="MovieInfo__person-name">{person.name}</span>
          <span className="MovieInfo__person-character">{this.props.type === 'cast' ? person.character : person.job}</span>
        </div>
      );
    }
  }
  componentDidMount(){
    this.props.fetchMovieCredits(this.props.id);
  }
  render(){
    const isLoaded = !!Object.keys(this.props.movieCredits).length;
    const type = this.props.type;
    return(
      <>
        <h2 className="MovieInfo__section-header">{type}</h2>
        <div className="MovieInfo__info MovieInfo__info--credits">
          {isLoaded && this.props.movieCredits[type].length !== 0 &&
            <ShowLink id={this.props.id} type={type}/>
          }
          {!isLoaded && <Spinner/>}
          {isLoaded && this.loadCast()}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    movieCredits: state.movieCredits,
  }
};
const mapDispatchToProps = {
  fetchMovieCredits
};

export default connect(mapStateToProps, mapDispatchToProps)(CastPreview);
