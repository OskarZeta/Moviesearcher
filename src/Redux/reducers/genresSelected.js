import {ADD_GENRE, REMOVE_GENRE, CLEAR_GENRES} from '../actions/change_genres';

export function genresSelected(state, action) {
  switch (action.type) {
    case ADD_GENRE: {
      return Object.assign({}, state, {
        genresSelected: state.genresSelected.concat(action.id)
      });
    }
    case REMOVE_GENRE: {
      return Object.assign({}, state, {
        genresSelected: state.genresSelected.filter((genre) => {
          return genre !== action.id;
        })
      })
    }
    case CLEAR_GENRES: {
      return Object.assign({}, state, {
        genresSelected: []
      })
    }
    default: {
      return [];
    }
  }
}