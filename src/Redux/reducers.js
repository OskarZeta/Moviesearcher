import { combineReducers } from 'redux';
import {
  FETCH_INITIAL_REQUEST,
  FETCH_MOVIES_FAIL,
  FETCH_MOVIES_SUCCESS,
  FETCH_SETTINGS_FAIL,
  FETCH_SETTINGS_SUCCESS,
  FETCH_GENRES_REQUEST,
  FETCH_GENRES_FAIL,
  FETCH_GENRES_SUCCESS,
  PAGE_NEXT, PAGE_PREV,
  CHANGE_PAGE,
  CHANGE_URL,
  TRIGGER_GENRES,
  ADD_GENRE,
  REMOVE_GENRE,
  CLEAR_GENRES,
  LOAD_SETTINGS
} from './actions';

export default function rootReducer(state, action) {
  switch (action.type) {
    case FETCH_INITIAL_REQUEST: {
      return Object.assign({}, state, {
        loadingMovies: action.loadingMovies
      });
    }
    case FETCH_MOVIES_FAIL: {
      return Object.assign({}, state, {
        initialLoadingError: action.initialLoadingError,
        loadingMovies: action.loadingMovies,
        movieList: action.movieList
      });
    }
    case FETCH_MOVIES_SUCCESS: {
      return Object.assign({}, state, {
        movieList: action.movieList,
        loadingMovies: !state.settings
      });
    }
    case FETCH_SETTINGS_FAIL: {
      return Object.assign({}, state, {
        initialLoadingError: action.initialLoadingError,
        loadingMovies: action.loadingMovies,
        settings: action.settings
      });
    }
    case FETCH_SETTINGS_SUCCESS: {
      return Object.assign({}, state, {
        settings: action.settings,
        loadingMovies: state.movieList.length === 0
      });
    }
    case LOAD_SETTINGS: {
      return Object.assign({}, state, {
        settings: action.settings
      });
    }
    case FETCH_GENRES_REQUEST: {
      return Object.assign({}, state, {
        loadingGenres: action.loadingGenres
      });
    }
    case FETCH_GENRES_FAIL: {
      return Object.assign({}, state, {
        genresLoadingError: action.genresLoadingError,
        loadingGenres: action.loadingGenres,
        genreList: action.genreList
      });
    }
    case FETCH_GENRES_SUCCESS: {
      return Object.assign({}, state, {
        genreList: action.genreList,
        loadingGenres: action.loadingGenres
      });
    }
    case CHANGE_URL: {
      return Object.assign({}, state, {
        url: action.url
      });
    }
    case PAGE_NEXT: {
      return Object.assign({}, state, {
        page: state.page + 1,
      })
    }
    case PAGE_PREV: {
      return Object.assign({}, state, {
        page: state.page - 1,
      })
    }
    case CHANGE_PAGE: {
      return Object.assign({}, state, {
        page: action.page
      })
    }
    case TRIGGER_GENRES: {
      return Object.assign({}, state, {
        genresTriggered: action.genresTriggered
      })
    }
    case ADD_GENRE: {
      return Object.assign({}, state, {
        genresSelected: state.genresSelected.concat(action.id)
      })
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
        genresTriggered: action.genresTriggered
      })
    }
    default : {
      return state;
    }
  }
}

// const rootReducer =  combineReducers({

// });

//export default rootReducer;