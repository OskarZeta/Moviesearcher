import axios from 'axios';
import { errorSet } from '../has_error';

const apiKey = '8282c68f5ed8f63c5bfae413614846d5';

export const FETCH_MOVIE_SIMILARS = 'FETCH_MOVIE_SIMILARS';

const urlSimilars1 = `https://api.themoviedb.org/3/movie/`;
const urlSimilars2 = `/similar?api_key=${apiKey}&language=en-US&page=1`;

function movieLoadSimilars(data) {
  return {
    type: FETCH_MOVIE_SIMILARS,
    movieSimilars: data
  }
}

export function fetchMovieSimilars(id) {
  return dispatch =>
    axios.get(urlSimilars1 + id + urlSimilars2)
      .then(response => {
        dispatch(movieLoadSimilars(response.data));
      })
      .catch(error => {
        dispatch(errorSet(
          "An error has occurred during the call to tmdb API. " +
          "Check your address bar (you've probably entered wrong film ID) " +
          "or try contacting tmdb's tech support."
        ));
      })
}
