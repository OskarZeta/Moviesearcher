//import { combineReducers } from 'redux';
import {
  FETCH_MOVIES_REQUEST,
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
  LOAD_SETTINGS,
  SAVE_SEARCH_QUERY,
  CLEAR_SEARCH_QUERY,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_FAIL,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_SIMILAR_REQUEST,
  MOVIE_SIMILAR_FAIL,
  MOVIE_SIMILAR_SUCCESS,
  MOVIE_IMAGES_REQUEST,
  MOVIE_IMAGES_FAIL,
  MOVIE_IMAGES_SUCCESS,
  MOVIE_CREDITS_REQUEST,
  MOVIE_CREDITS_FAIL,
  MOVIE_CREDITS_SUCCESS,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  CLEAR_IMAGES,
  // IMAGE_PREV,
  // IMAGE_NEXT
} from './actions';

export default function rootReducer(state, action) {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST: {
      return Object.assign({}, state, {
        loadingMovies: action.loadingMovies,
        //initialLoadingError: action.initialLoadingError
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
        loadingMovies: !state.settings,
        initialLoadingError: action.initialLoadingError
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
        //genresTriggered: action.genresTriggered
        genresSelected: []
      })
    }
    case SAVE_SEARCH_QUERY: {
      return Object.assign({}, state, {
        //searchQuery: action.searchQuery
      })
    }
    case CLEAR_SEARCH_QUERY: {
      return Object.assign({}, state, {
        //searchQuery: ''
      })
    }
    case MOVIE_DETAILS_REQUEST: {
      return Object.assign({}, state, {
        loadingMovieDetails: action.loadingMovieDetails,
        movieDetailsError: action.movieDetailsError
      })
    }
    case MOVIE_DETAILS_FAIL: {
      return Object.assign({}, state, {
        loadingMovieDetails: action.loadingMovieDetails,
        movieDetailsError: action.movieDetailsError
      })
    }
    case MOVIE_DETAILS_SUCCESS: {
      return Object.assign({}, state, {
        loadingMovieDetails: action.loadingMovieDetails,
        movieDetailsError: action.movieDetailsError,
        movieDetails: action.movieDetails
      })
    }
    case MOVIE_SIMILAR_REQUEST: {
      return Object.assign({}, state, {
        loadingMovieSimilar: action.loadingMovieSimilar,
        movieSimilarError: action.movieSimilarError
      })
    }
    case MOVIE_SIMILAR_FAIL: {
      return Object.assign({}, state, {
        loadingMovieSimilar: action.loadingMovieSimilar,
        movieSimilarError: action.movieSimilarError
      })
    }
    case MOVIE_SIMILAR_SUCCESS: {
      return Object.assign({}, state, {
        loadingMovieSimilar: action.loadingMovieSimilar,
        movieSimilarError: action.movieSimilarError,
        movieSimilar: action.movieSimilar
      })
    }
    case MOVIE_IMAGES_REQUEST: {
      return Object.assign({}, state, {
        loadingMovieImages: action.loadingMovieImages,
        movieImagesError: action.movieImagesError
      })
    }
    case MOVIE_IMAGES_FAIL: {
      return Object.assign({}, state, {
        loadingMovieImages: action.loadingMovieImages,
        movieImagesError: action.movieImagesError
      })
    }
    case MOVIE_IMAGES_SUCCESS: {
      return Object.assign({}, state, {
        loadingMovieImages: action.loadingMovieImages,
        movieImagesError: action.movieImagesError,
        movieImages: action.movieImages
      })
    }
    case MOVIE_CREDITS_REQUEST: {
      return Object.assign({}, state, {
        loadingMovieCredits: action.loadingMovieCredits,
        movieCreditsError: action.movieCreditsError
      })
    }
    case MOVIE_CREDITS_FAIL: {
      return Object.assign({}, state, {
        loadingMovieCredits: action.loadingMovieCredits,
        movieCreditsError: action.movieCreditsError
      })
    }
    case MOVIE_CREDITS_SUCCESS: {
      return Object.assign({}, state, {
        loadingMovieCredits: action.loadingMovieCredits,
        movieCreditsError: action.movieCreditsError,
        movieCredits: action.movieCredits
      })
    }
    case ADD_FAVORITE: {
      return Object.assign({}, state, {
        favorites: state.favorites.concat(action.movie)
      })
    }
    case REMOVE_FAVORITE: {
      // state.favorites.filter((fave) => {
      //   console.log(fave.id !== action.id);
      //   return fave.id !== action.id;
      // });
      // return Object.assign({}, state, {});
      return Object.assign({}, state, {
        favorites: state.favorites.filter((fave) => {
          return fave.id !== action.id;
        })
      })
    }
    case CLEAR_IMAGES: {
      return Object.assign({}, state, {
        movieImages: action.movieImages
      })
    }
    // case IMAGE_NEXT: {
    //   return Object.assign({}, state, {
    //     imageIndex: state.imageIndex + 1,
    //   })
    // }
    // case IMAGE_PREV: {
    //   return Object.assign({}, state, {
    //     imageIndex: state.imageIndex - 1,
    //   })
    // }
    default : {
      return state;
    }
  }
}

// const rootReducer =  combineReducers({

// });

//export default rootReducer;