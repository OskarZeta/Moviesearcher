import axios from 'axios';
import { errorSet } from '../has_error';

const apiKey = '8282c68f5ed8f63c5bfae413614846d5';

export const FETCH_MOVIE_CREDITS = 'FETCH_MOVIE_CREDITS';

const urlCredits1 = `https://api.themoviedb.org/3/movie/`;
const urlCredits2 = `/credits?api_key=${apiKey}`;

function movieLoadCredits(data) {
  return {
    type: FETCH_MOVIE_CREDITS,
    movieCredits: data
  }
}

export function fetchMovieCredits(id) {
  return dispatch =>
    axios.get(urlCredits1 + id + urlCredits2)
      .then(response => {
        dispatch(movieLoadCredits(response.data));
      })
      .catch(error => {
        dispatch(errorSet(
          "An error has occurred during the call to tmdb API. " +
          "Check your address bar (you've probably entered wrong film ID) " +
          "or try contacting tmdb's tech support."
        ));
      })
}
