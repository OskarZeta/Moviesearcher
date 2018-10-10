import {FETCH_MOVIE_SIMILARS} from '../actions/movie_info/fetch_movie_similars';

export function movieSimilars(state = {}, action) {
  switch (action.type) {
    case FETCH_MOVIE_SIMILARS: {
      return Object.assign({}, action.movieSimilars);
    }
    default: {
      return state;
    }
  }
}