import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addGenres, clearGenres, fetchMovieSimilar } from '../Redux/actions';
import MovieList from '../Components/MovieList';
import Movie from '../Components/Movie';

class MovieInfo extends Component {
  componentDidMount() {
    this.props.clearGenres();
    this.props.fetchMovieSimilar(this.props.movieDetails.id, 1);
  }
  render(){
    return(
      <div className="MovieInfo">
        <div className="MovieInfo__wrapper">
          <h1 className="MovieInfo__title">{this.props.movieDetails.title}</h1>
          <div className="MovieInfo__votebox" style={{background:
                this.props.movieDetails.vote_average >= 7 ? 'linear-gradient(-45deg, #b4e391 0%, #61c419 50%,#b4e391 100%)' :
                this.props.movieDetails.vote_average < 7 && this.props.movieDetails.vote_average > 3 ? 'linear-gradient(-45deg, #fefcea 0%,#f1da36 50%,#fefcea 100%)' :
                  'linear-gradient(135deg, rgba(243,197,189,1) 0%,rgba(232,108,87,1) 0%,rgba(255,170,170,1) 0%,rgba(255,0,0,1) 50%,rgba(255,170,170,1) 100%)'}}>
            {this.props.movieDetails.vote_average.toString().split('.').length > 1 &&
              <div>
                <span className="MovieInfo__votebox-1">{this.props.movieDetails.vote_average.toString().split('.')[0] + '.'}</span>
                <span className="MovieInfo__votebox-2">{this.props.movieDetails.vote_average.toString().split('.')[1]}</span>
              </div>
            }
            {this.props.movieDetails.vote_average.toString().split('.').length <= 1 &&
              <div>
                <span className="MovieInfo__votebox-1">{this.props.movieDetails.vote_average.toString().split('.')[0]}</span>
              </div>
            }
          </div>
          <picture>
            <source srcSet={this.props.settings.base_url + this.props.settings.backdrop_sizes[2] + this.props.movieDetails.backdrop_path} media="(min-width: 1300px)"/>
            <source srcSet={this.props.settings.base_url + this.props.settings.backdrop_sizes[1] + this.props.movieDetails.backdrop_path} media="(min-width: 800px)"/>
            <img className="MovieInfo__backdrop" src={this.props.settings.base_url + this.props.settings.backdrop_sizes[0] + this.props.movieDetails.backdrop_path}/>
          </picture>
          <span className="MovieInfo__section-header">original title</span>
          <p className="MovieInfo__info">
            {this.props.movieDetails.original_title + ' (' +this.props.movieDetails.original_language + ')'}
          </p>
          <span className="MovieInfo__section-header">tagline</span>
          {this.props.movieDetails.tagline.length > 0 &&
            <p className="MovieInfo__info">{'"' + this.props.movieDetails.tagline + '"'}</p>
          }
          {this.props.movieDetails.tagline.length === 0 &&
            <p className="MovieInfo__info">Not available</p>
          }
          <span className="MovieInfo__section-header">description</span>
          {this.props.movieDetails.overview.length > 0 &&
            <p className="MovieInfo__info">{this.props.movieDetails.overview}</p>
          }
          {this.props.movieDetails.overview.length === 0 &&
            <p className="MovieInfo__info">Not available</p>
          }
          <span className="MovieInfo__section-header">release date</span>
          <p className="MovieInfo__info">
            {this.props.movieDetails.release_date}
          </p>
          <span className="MovieInfo__section-header">genres</span>
          <div className="MovieInfo__info">
            {this.props.movieDetails.genres.map((genre) => {
              return <div key={genre.id}>
                <Link className="MovieInfo__genre-href" to={`/genres=${genre.id}`} onClick={() => {
                  //this.props.clearGenres();
                  this.props.addGenres(genre.id);
                }}>
                  {genre.name}
                </Link>
              </div>
            })}
          </div>
          <span className="MovieInfo__section-header">budget</span>
          <p className="MovieInfo__info">
            {this.props.movieDetails.budget + '$'}
          </p>
          <div className="MovieInfo__vote-wrapper">
            <div>
              <span className="MovieInfo__section-header">average vote:</span>
              <p className="MovieInfo__info" style={{
                backgroundColor: this.props.movieDetails.vote_average >=7 ? '#90ffc9' :
                                 this.props.movieDetails.vote_average < 7 && this.props.movieDetails.vote_average > 3 ? '#FFFF9D' : '#FF8E79'
              }}>
                {this.props.movieDetails.vote_average}
              </p>
            </div>
            <div>
              <span className="MovieInfo__section-header">number of votes:</span>
              <p className="MovieInfo__info">
                {this.props.movieDetails.vote_count}
              </p>
            </div>
            <div>
              <span className="MovieInfo__section-header">popularity:</span>
              <p className="MovieInfo__info">
                {this.props.movieDetails.popularity}
              </p>
            </div>
          </div>
          <span className="MovieInfo__section-header">similar movies</span>
          <div className="MovieInfo__info">
            {this.props.loadingMovieSimilar && <div>Loading...</div>}
            {this.props.movieSimilarError && !this.props.loadingMovieSimilar && <div>ERROR!</div>}
            {!this.props.loadingMovieSimilar && !this.props.movieSimilarError && this.props.movieSimilar &&
              <div className="MovieInfo__similar-wrapper">
                <MovieList movieList={this.props.movieSimilar.results} settings={this.props.settings} usePreview={true}/>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movieSimilar: state.movieSimilar
  }
};

const mapDispatchToProps = {
  addGenres,
  clearGenres,
  fetchMovieSimilar
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
