import {FETCH_MOVIE_CREDITS} from '../actions/movie_info/fetch_movie_credits';

export function movieCredits(state = {}, action) {
  switch (action.type) {
    case FETCH_MOVIE_CREDITS: {
      return Object.assign({}, action.movieCredits);
    }
    default: {
      return state;
    }
  }
}