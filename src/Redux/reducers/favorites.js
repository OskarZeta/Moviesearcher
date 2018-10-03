import {ADD_FAVORITE, REMOVE_FAVORITE} from '../actions/change_favorites';

export function favorites(state, action) {
  switch (action.type) {
    case ADD_FAVORITE: {
      return Object.assign({}, state, {
        favorites: state.favorites.concat(action.movie)
      })
    }
    case REMOVE_FAVORITE: {
      return Object.assign({}, state, {
        favorites: state.favorites.filter((fave) => {
          return fave.id !== action.id;
        })
      })
    }
    default: {
      return [];
    }
  }
}