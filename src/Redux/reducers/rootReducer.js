import { combineReducers } from 'redux';
import {movieList} from './movieList';
import {movieCredits} from './movieCredits';
import {movieDetails} from './movieDetails';
import {movieImages} from './movieImages';
import {movieSimilars} from './movieSimilars';
import {settings} from './settings';
import {genreList} from './genreList';
import {favorites} from './favorites';
import {error} from './error';
import {loading} from './loading';

const rootReducer = combineReducers({
  movieList,
  movieCredits,
  movieDetails,
  movieImages,
  movieSimilars,
  settings,
  genreList,
  favorites,
  error,
  loading
});

export default rootReducer;