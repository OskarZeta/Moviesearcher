import {FETCH_MOVIE_DETAILS} from '../actions/movie_info/fetch_movie_details';

export function movieDetails(state={}, action) {
  switch (action.type) {
    case FETCH_MOVIE_DETAILS: {
      return Object.assign({}, action.movieDetails);
    }
    default: {
      return state;
    }
  }
}