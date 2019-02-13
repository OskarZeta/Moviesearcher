import axios from 'axios';
import { errorSet } from '../has_error';

const apiKey = '8282c68f5ed8f63c5bfae413614846d5';

export const FETCH_MOVIE_IMAGES = 'FETCH_MOVIE_IMAGES';

const urlImages1 = `https://api.themoviedb.org/3/movie/`;
const urlImages2 = `/images?api_key=${apiKey}`;

function movieLoadImages(data) {
  return {
    type: FETCH_MOVIE_IMAGES,
    movieImages: data
  }
}

export function fetchMovieImages(id) {
  return dispatch =>
    axios.get(urlImages1 + id + urlImages2)
      .then(response => {
        dispatch(movieLoadImages(response.data));
      })
      .catch(error => {
        dispatch(errorSet(
          "An error has occurred during the call to tmdb API. " +
          "Check your address bar (you've probably entered wrong film ID) " +
          "or try contacting tmdb's tech support."
        ));
      })
}
