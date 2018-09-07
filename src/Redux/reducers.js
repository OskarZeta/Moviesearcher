import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_FAIL,
  FETCH_MOVIES_SUCCESS
} from './actions/fetch_movies';
import {
  FETCH_SETTINGS_FAIL,
  FETCH_SETTINGS_SUCCESS,
  LOAD_SETTINGS
} from './actions/fetch_settings';
import {
  FETCH_GENRES_REQUEST,
  FETCH_GENRES_FAIL,
  FETCH_GENRES_SUCCESS
} from './actions/fetch_genres';
import {
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_FAIL,
  MOVIE_DETAILS_SUCCESS
} from './actions/fetch_movie_details';
import {
  MOVIE_IMAGES_REQUEST,
  MOVIE_IMAGES_FAIL,
  MOVIE_IMAGES_SUCCESS
} from './actions/fetch_movie_images';
import {
  MOVIE_SIMILAR_REQUEST,
  MOVIE_SIMILAR_FAIL,
  MOVIE_SIMILAR_SUCCESS
} from './actions/fetch_movie_similars';
import {
  MOVIE_CREDITS_REQUEST,
  MOVIE_CREDITS_FAIL,
  MOVIE_CREDITS_SUCCESS
} from './actions/fetch_movie_credits';
import {
  ADD_GENRE,
  REMOVE_GENRE,
  CLEAR_GENRES
} from './actions/change_genres';
import {
  PAGE_NEXT,
  PAGE_PREV,
  CHANGE_PAGE
} from './actions/change_page';
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE
} from './actions/change_favorites';

export default function rootReducer(state, action) {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST: {
      return Object.assign({}, state, {
        loadingMovies: action.loadingMovies,
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
        genresSelected: []
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
      return Object.assign({}, state, {
        favorites: state.favorites.filter((fave) => {
          return fave.id !== action.id;
        })
      })
    }
    default : {
      return state;
    }
  }
}