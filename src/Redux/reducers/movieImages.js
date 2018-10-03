import {FETCH_MOVIE_IMAGES} from '../actions/movie_info/fetch_movie_images';

export function movieImages(state, action) {
  switch (action.type) {
    case FETCH_MOVIE_IMAGES: {
      return Object.assign({}, state, {
        movieImages: action.movieImages
      });
    }
    default: {
      return [];
    }
  }
}