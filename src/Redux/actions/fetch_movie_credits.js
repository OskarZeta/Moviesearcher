import 'whatwg-fetch';
import { apiKey } from '../actions/fetch_movies';

export const MOVIE_CREDITS_REQUEST = 'MOVIE_CREDITS_REQUEST';
export const MOVIE_CREDITS_FAIL = 'MOVIE_CREDITS_FAIL';
export const MOVIE_CREDITS_SUCCESS = 'MOVIE_CREDITS_SUCCESS';

const urlCredits1 = `https://api.themoviedb.org/3/movie/`;
const urlCredits2 = `/credits?api_key=${apiKey}`;

function movieCreditsRequest() {
  return {
    type: MOVIE_CREDITS_REQUEST,
    loadingMovieCredits: true,
    movieCreditsError: false
  }
}
function movieCreditsFail() {
  return {
    type: MOVIE_CREDITS_FAIL,
    loadingMovieCredits: false,
    movieCreditsError: true
  }
}
function movieCreditsSuccess(json) {
  return {
    type: MOVIE_CREDITS_SUCCESS,
    loadingMovieCredits: false,
    movieCreditsError: false,
    movieCredits: json
  }
}

export function fetchMovieCredits(id) {
  return (dispatch) => {
    dispatch(movieCreditsRequest());
    return fetch(urlCredits1 + id + urlCredits2)
      .then((initialResponse) => {
        if (initialResponse.ok) {
          return initialResponse.json();
        } else {
          dispatch(movieCreditsFail());
        }
      })
      .then((json) => {
        dispatch(movieCreditsSuccess(json))
      }, (error) => {
        dispatch(movieCreditsFail());
        console.log(error);
      });
  }
}