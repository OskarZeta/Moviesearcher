import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addGenres, clearGenres } from '../Redux/actions/change_genres';
import { fetchMovieSimilar } from '../Redux/actions/movie_info/fetch_movie_similars';
import { fetchMovieImages } from '../Redux/actions/movie_info/fetch_movie_images';
import { fetchMovieCredits } from '../Redux/actions/movie_info/fetch_movie_credits';
import MovieList from '../Components/MovieList';
import ImageShow from '../Components/ImageShow';
import Spinner from '../Components/Spinner';
import FaveBtn from '../Containers/FaveBtn';

const imagesToShowPreview = 4;
const castToShowPreview = 8;

class MovieInfo extends Component {
  loadImage(e) {
    e.target.parentNode.parentNode.querySelector('.image-preload').classList.add('hidden');
  }
  loadImages() {
    if (this.props.movieImages) {
      let images = this.props.movieImages.backdrops;
      if (images.length === 0) {
        if (document.querySelector('.MovieInfo__show-link--gallery')) {
          document.querySelector('.MovieInfo__show-link--gallery').classList.add("hidden");
        }
        return(
          <div className="MovieInfo__info" style={{border: 'none', fontStyle: 'italic', margin: 0}}>
            Not available
          </div>
        );
      } else {
        if (document.querySelector('.MovieInfo__show-link--gallery')) {
          document.querySelector('.MovieInfo__show-link--gallery').classList.remove("hidden");
        }
        return images.map((image, index) => {
          let addressMobile = this.props.settings.secure_base_url + this.props.settings.poster_sizes[1] + image.file_path;
          let addressTablet = this.props.settings.secure_base_url + this.props.settings.poster_sizes[2] + image.file_path;
          let addressDesktop = this.props.settings.secure_base_url + this.props.settings.poster_sizes[3] + image.file_path;
          if (index < imagesToShowPreview) {
            return(
              <Link className="MovieInfo__image-preview" key={index} to={`/filmId/${this.props.movieDetails.id}/image=${index+1}`}>
                <picture>
                  <source srcSet={addressDesktop} media="(min-width: 1300px)" />
                  <source srcSet={addressTablet} media="(min-width: 800px)" />
                  <img className="MovieInfo__img" onLoad={(e) => {this.loadImage(e)}} src={addressMobile} alt="movie-poster"/>
                </picture>
                <div className="image-preload image-preload--gallery-preview">
                  <Spinner/>
                </div>
              </Link>
            );
          }
        });
      }
    }
  }
  loadCast() {
    if (this.props.movieCredits) {
      let cast = this.props.movieCredits.cast;
      if (cast.length === 0) {
        if (document.querySelector('.MovieInfo__show-link--cast')) {
          document.querySelector('.MovieInfo__show-link--cast').classList.add("hidden");
        }
        return(
          <div className="MovieInfo__info MovieInfo__info--na">
            Not available
          </div>
        );
      } else {
        if (document.querySelector('.MovieInfo__show-link--cast')) {
          document.querySelector('.MovieInfo__show-link--cast').classList.remove("hidden");
        }
        return cast.map((person, index) => {
          if (index < castToShowPreview) {
            return(
              <div className="MovieInfo__person" key={person.id}>
                <span className="MovieInfo__person-name">{person.name}</span>
                <span className="MovieInfo__person-character">{person.character}</span>
              </div>
            );
          }
        });
      }
    }
  }
  loadCrew() {
    if (this.props.movieCredits) {
      let crew = this.props.movieCredits.crew;
      if (crew.length === 0) {
        if (document.querySelector('.MovieInfo__show-link--crew')) {
          document.querySelector('.MovieInfo__show-link--crew').classList.add("hidden");
        }
        return(
          <div className="MovieInfo__info MovieInfo__info--na">
            Not available
          </div>
        );
      } else {
        if (document.querySelector('.MovieInfo__show-link--crew')) {
          document.querySelector('.MovieInfo__show-link--crew').classList.remove("hidden");
        }
        let crewDirectors = crew.filter((person) => {
          return person.job === "Director";
        });
        return crewDirectors.map((person) => {
          return(
            <div className="MovieInfo__person" key={person.id}>
              <span className="MovieInfo__person-name">{person.name}</span>
              <span className="MovieInfo__person-character">{person.job}</span>
            </div>
          );
        });
      }
    }
  }
  componentDidMount() {
    this.props.clearGenres();
    this.props.fetchMovieSimilar(this.props.movieDetails.id, 1);
    this.props.fetchMovieImages(this.props.movieDetails.id);
    this.props.fetchMovieCredits(this.props.movieDetails.id);
  }
  render(){
    return(
      <div className="App__content">
        <div className="MovieInfo">
          {this.props.imageIndex && this.props.movieImages && this.props.settings &&
            <ImageShow imageIndex={this.props.imageIndex - 1} movieImages={this.props.movieImages} settings={this.props.settings} history={this.props.history} from="movie"/>
          }
          <div className="MovieInfo__wrapper">
            <h1 className="MovieInfo__title">
              <span>{this.props.movieDetails.title}</span>
            </h1>
            <div className="MovieInfo__main">
              <div className="MovieInfo__left-column">
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
                {this.props.movieDetails.poster_path !== null &&
                  <div className="MovieInfo__poster-wrapper">
                    <picture>
                      <source srcSet={
                        this.props.settings.secure_base_url + this.props.settings.poster_sizes[4] + this.props.movieDetails.poster_path
                      } media="(min-width: 1300px)"/>
                      <source srcSet={
                        this.props.settings.secure_base_url + this.props.settings.poster_sizes[3] + this.props.movieDetails.poster_path
                      } media="(min-width: 800px)"/>
                      <img
                        className="MovieInfo__poster"
                        onLoad={(e) => {this.loadImage(e)}}
                        src={this.props.settings.secure_base_url + this.props.settings.poster_sizes[3] + this.props.movieDetails.poster_path}
                        alt="movie-poster"
                      />
                    </picture>
                    <div className="image-preload image-preload--movie-poster">
                      <Spinner/>
                    </div>
                  </div>
                }
                {this.props.movieDetails.poster_path === null &&
                  <div className="MovieInfo__poster-wrapper">
                    <div className="MovieInfo__placeholder">
                      <div className="MovieInfo__placeholder-mobile"></div>
                      <div className="MovieInfo__placeholder-tablet"></div>
                      <div className="MovieInfo__placeholder-desktop"></div>
                    </div>
                  </div>
                }
                <FaveBtn favorites={this.props.favorites} id={this.props.movieDetails.id} name={this.props.movieDetails.title} poster={this.props.movieDetails.poster_path}
                         isFav = {this.props.favorites.length > 0 ? (!!this.props.favorites.filter((favMovie) => {
                             return favMovie.id === this.props.movieDetails.id;}).length > 0)
                           : false}
                         moviePage={true}
                />
              </div>
              <div className="MovieInfo__right-column">
                <h2 className="MovieInfo__section-header">image gallery</h2>
                <div className="MovieInfo__info MovieInfo__info--gallery">
                  <div className="MovieInfo__show-link MovieInfo__show-link--gallery">
                    <Link to={`/filmId/${this.props.movieDetails.id}/images`} >
                      <span>show full gallery</span>
                    </Link>
                  </div>
                  {this.props.loadingMovieImages && <Spinner/>}
                  {this.props.movieImagesError && !this.props.loadingMovieImages && <div>ERROR IN GALLERY!</div>}
                  {!this.props.movieImagesError && !this.props.loadingMovieImages && this.props.movieImages && this.props.settings &&
                    <div className="MovieInfo__images-wrapper">
                      {this.loadImages()}
                    </div>
                  }
                </div>
                <h2 className="MovieInfo__section-header">original title</h2>
                <p className="MovieInfo__info">
                  {this.props.movieDetails.original_title + ' (' +this.props.movieDetails.original_language + ')'}
                </p>
                <h2 className="MovieInfo__section-header">tagline</h2>
                {this.props.movieDetails.tagline.length > 0 &&
                <p className="MovieInfo__info">{'"' + this.props.movieDetails.tagline + '"'}</p>
                }
                {this.props.movieDetails.tagline.length === 0 &&
                <p className="MovieInfo__info" style={{fontStyle: "italic"}}>Not available</p>
                }
                <h2 className="MovieInfo__section-header">description</h2>
                {this.props.movieDetails.overview.length > 0 &&
                <p className="MovieInfo__info">{this.props.movieDetails.overview}</p>
                }
                {this.props.movieDetails.overview.length === 0 &&
                <p className="MovieInfo__info MovieInfo__info--na">Not available</p>
                }
                <h2 className="MovieInfo__section-header">release date</h2>
                <p className="MovieInfo__info">
                  {this.props.movieDetails.release_date}
                </p>
                <h2 className="MovieInfo__section-header">genres</h2>
                <div className="MovieInfo__info MovieInfo__info--row">
                  {this.props.movieDetails.genres.length > 0 && this.props.movieDetails.genres.map((genre, index) => {
                    return (
                      <Link key={index} className="MovieInfo__genre-href" to={`/genres=${genre.id}`} onClick={() => {
                        this.props.addGenres(genre.id);
                      }}>
                        {genre.name}
                      </Link>
                    )
                  })}
                  {this.props.movieDetails.genres.length === 0 &&
                    <div className="MovieInfo__info MovieInfo__info--na">
                      Not available
                    </div>
                  }
                </div>
                <h2 className="MovieInfo__section-header">budget</h2>
                <p className="MovieInfo__info">
                  {this.props.movieDetails.budget + '$'}
                </p>
                <h2 className="MovieInfo__section-header">credits</h2>
                <h2 className="MovieInfo__section-header">crew</h2>
                <div className="MovieInfo__info MovieInfo__info--credits">
                  <div className="MovieInfo__show-link MovieInfo__show-link--crew">
                    <Link to={`/filmId/${this.props.movieDetails.id}/crew`} >
                      <span>show full crew</span>
                    </Link>
                  </div>
                  {this.loadCrew()}
                </div>
                <h2 className="MovieInfo__section-header">cast</h2>
                <div className="MovieInfo__info MovieInfo__info--credits">
                  <div className="MovieInfo__show-link MovieInfo__show-link--cast">
                    <Link to={`/filmId/${this.props.movieDetails.id}/cast`} >
                      <span>show full cast</span>
                    </Link>
                  </div>
                  {this.loadCast()}
                </div>
                <div className="MovieInfo__votes">
                  <div className="MovieInfo__vote-wrapper">
                    <h2 className="MovieInfo__section-header">average vote:</h2>
                    <span className="MovieInfo__number">
                      {this.props.movieDetails.vote_average}
                    </span>
                  </div>
                  <div className="MovieInfo__vote-wrapper">
                    <h2 className="MovieInfo__section-header">number of votes:</h2>
                    <span className="MovieInfo__number">
                      {this.props.movieDetails.vote_count}
                    </span>
                  </div>
                  <div className="MovieInfo__vote-wrapper">
                    <h2 className="MovieInfo__section-header">popularity:</h2>
                    <span className="MovieInfo__number">
                      {this.props.movieDetails.popularity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="MovieInfo__section-header MovieInfo__section-header--similars">similar movies</h2>
            <div className="MovieInfo__info MovieInfo__info--similars">
              {this.props.loadingMovieSimilar && <div>Loading...</div>}
              {this.props.movieSimilarError && !this.props.loadingMovieSimilar && <div>ERROR!</div>}
              {!this.props.loadingMovieSimilar && !this.props.movieSimilarError && this.props.movieSimilar && this.props.movieSimilar.results.length > 0 && this.props.favorites &&
                <div className="MovieInfo__similar-wrapper">
                  <MovieList movieList={this.props.movieSimilar.results} settings={this.props.settings} usePreview={true} favorites={this.props.favorites}/>
                </div>
              }
              {!this.props.loadingMovieSimilar && !this.props.movieSimilarError && this.props.movieSimilar && this.props.movieSimilar.results.length === 0 && this.props.favorites &&
                <div className="MovieInfo__info MovieInfo__info--na MovieInfo__info--na-similars">
                  Not available
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movieSimilar: state.movieSimilar,
    movieImages: state.movieImages,
    movieCredits: state.movieCredits
  }
};
const mapDispatchToProps = {
  addGenres,
  clearGenres,
  fetchMovieSimilar,
  fetchMovieImages,
  fetchMovieCredits,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
