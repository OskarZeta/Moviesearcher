import {ADD_FAVORITE, REMOVE_FAVORITE, LOAD_FAVORIES} from '../actions/change_favorites';

export function favorites(state = [], action) {
  switch (action.type) {
    case ADD_FAVORITE: {
      return state.concat(action.movie);
    }
    case REMOVE_FAVORITE: {
      return state.filter((fave) => {
        return fave.id !== action.id;
      });
    }
    case LOAD_FAVORIES: {
      if (JSON.parse(localStorage.getItem('favorites'))) {
        return JSON.parse(localStorage.getItem('favorites'));
      } else {
        return state;
      }
    }
    default: {
      return state;
    }
  }
}