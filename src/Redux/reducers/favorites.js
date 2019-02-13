import {ADD_FAVORITE, REMOVE_FAVORITE, LOAD_FAVORIES} from '../actions/change_favorites';

export function favorites(state = [], action) {
  switch (action.type) {
    case ADD_FAVORITE: {
      return state.concat(action.movie);
    }
    case REMOVE_FAVORITE: {
      return state.filter(fave =>
        fave.id !== action.id
      );
    }
    case LOAD_FAVORIES: {
      let parsed = JSON.parse(localStorage.getItem('favorite_movies'));
      return parsed ? parsed : state;
    }
    default: {
      return state;
    }
  }
}
