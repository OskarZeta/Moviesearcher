import {FETCH_MOVIES_DEFAULT} from '../actions/movie_list/fetch_movies_default';
import {FETCH_MOVIES_SORTED} from '../actions/movie_list/fetch_movies_sorted';
import {FETCH_MOVIES_SEARCHED} from '../actions/movie_list/fetch_movies_searched';

export function movieList(state=[], action) {
  switch (action.type) {
    case FETCH_MOVIES_DEFAULT: {
      return action.movieList;
      // return Object.assign({}, state, {
      //   movieList: action.movieList
      // });
    }
    case FETCH_MOVIES_SORTED: {
      return action.movieList;
      // return Object.assign({}, state, {
      //   movieList: action.movieList
      // });
    }
    case FETCH_MOVIES_SEARCHED: {
      return action.movieList;
      // return Object.assign({}, state, {
      //   movieList: action.movieList
      // });
    }
    default: {
      return state;
    }
  }
}