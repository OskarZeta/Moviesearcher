import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMovieDetails } from '../../Redux/actions/movie_info/fetch_movie_details';
import { fetchMovieSimilars } from '../../Redux/actions/movie_info/fetch_movie_similars';
import GalleryPreview from './GalleryPreview';
import ImageShow from '../ImageShow';
import Poster from './Poster';
import Article from '../../Components/Article';
import SimilarMovies from './SimilarMovies';
import CastPreview from './CastPreview';
import Spinner from '../../Components/Spinner';

class MovieInfo extends Component {
  componentDidMount() {
    this.props.fetchMovieDetails(this.props.id);
  }
  componentDidUpdate(prewProps) {
    if (this.props.id !== prewProps.id) {
      if (!this.props.isError) {
        this.props.fetchMovieDetails(this.props.id);
      }
    }
  }
  render() {
    const {
      title, vote_average, poster_path, release_date,
      id, original_title, tagline, overview, budget,
      genres, vote_count, popularity, original_language
    } = this.props.movieDetails;
    const { settings, query, loading } = this.props;
    const na = <i>Not available</i>;
    return(
      <div className="App__content">
        <div className="container container--movieinfo">
          {loading && <Spinner/>}
          {!loading && Object.keys(this.props.movieDetails).length !== 0 &&
            <div className="MovieInfo__wrapper">
              {Object.keys(query).length !== 0 &&
                <ImageShow
                  settings={settings}
                  imageIndex={query.image - 1} from="movie"
                />
              }
              <h1 className="MovieInfo__title">
                <span>{title}</span>
              </h1>
              <div className="MovieInfo__main">
                <div className="MovieInfo__left-column">
                  <Poster vote_average={vote_average}
                    settings={settings.images} poster_path={poster_path}
                    id={id} title={title}
                  />
                </div>
                <div className="MovieInfo__right-column">
                  <GalleryPreview settings={settings.images} id={id}/>
                  <Article title="original title"> {`${original_title} (${original_language})`} </Article>
                  <Article title="tagline">{tagline.length ? `"${tagline}"` : na}</Article>
                  <Article title="description">{overview.length ? overview : na}</Article>
                  <Article title="release date">{release_date ? release_date : na}</Article>
                  <h2 className="MovieInfo__section-header">genres</h2>
                  <div className="MovieInfo__info MovieInfo__info--row">
                    {genres.length > 0 && genres.map((genre, index) =>
                      <Link
                        key={index} className="MovieInfo__genre-href"
                        to={`/sort_by?genres=${genre.id}`}
                      > {genre.name}
                      </Link>
                    )}
                    {genres.length === 0 && na}
                  </div>
                  <Article title="budget">{`${budget} $`}</Article>
                  <h2 className="MovieInfo__section-header">credits</h2>
                  <CastPreview type="crew" id={id}/>
                  <CastPreview type="cast" id={id}/>
                  <div className="MovieInfo__votes">
                    <div className="MovieInfo__vote-wrapper">
                      <h2 className="MovieInfo__section-header">average vote:</h2>
                      <span className="MovieInfo__number">{vote_average}</span>
                    </div>
                    <div className="MovieInfo__vote-wrapper">
                      <h2 className="MovieInfo__section-header">number of votes:</h2>
                      <span className="MovieInfo__number">{vote_count}</span>
                    </div>
                    <div className="MovieInfo__vote-wrapper">
                      <h2 className="MovieInfo__section-header">popularity:</h2>
                      <span className="MovieInfo__number">{popularity}</span>
                    </div>
                  </div>
                </div>
              </div>
              <SimilarMovies id={id} settings={settings}/>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movieDetails: state.movieDetails,
    loading: state.loading
  }
};
const mapDispatchToProps = {
  fetchMovieDetails,
  fetchMovieSimilars
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
