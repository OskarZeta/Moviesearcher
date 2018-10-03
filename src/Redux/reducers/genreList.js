import {FETCH_GENRES} from '../actions/fetch_genres';

export function genreList(state=[], action) {
  switch (action.type) {
    case FETCH_GENRES: {
      // return Object.assign({}, state, {
      //   genreList: action.genreList
      // });
      return action.genreList;
    }
    default: {
      return state;
    }
  }
}