import { combineReducers } from 'redux';
import {movieList} from './movieList';
import {movieCredits} from './movieCredits';
import {movieDetails} from './movieDetails';
import {movieImages} from './movieImages';
import {movieSimilars} from './movieSimilars';
import {settings} from './settings';
import {genreList} from './genreList';
import {genresSelected} from './genresSelected';
import {favorites} from './favorites';
import {page} from './page';
import {error} from './error';

const rootReducer = combineReducers({
  movieList,
  movieCredits,
  movieDetails,
  movieImages,
  movieSimilars,
  settings,
  genreList,
  genresSelected,
  favorites,
  page,
  error
});

export default rootReducer;