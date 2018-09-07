import 'whatwg-fetch';
import { apiKey } from '../actions/fetch_movies';

export const MOVIE_DETAILS_REQUEST = 'MOVIE_DETAILS_REQUEST';
export const MOVIE_DETAILS_FAIL = 'MOVIE_DETAILS_FAIL';
export const MOVIE_DETAILS_SUCCESS = 'MOVIE_DETAILS_SUCCESS';

const urlDetails1 = `https://api.themoviedb.org/3/movie/`;
const urlDetails2 = `?api_key=${apiKey}&language=en-US`;

function movieDetailsRequest() {
  return {
    type: MOVIE_DETAILS_REQUEST,
    loadingMovieDetails: true,
    movieDetailsError: false
  }
}
function movieDetailsFail() {
  return {
    type: MOVIE_DETAILS_FAIL,
    loadingMovieDetails: false,
    movieDetailsError: true
  }
}
function movieDetailsSuccess(json) {
  return {
    type: MOVIE_DETAILS_SUCCESS,
    loadingMovieDetails: false,
    movieDetailsError: false,
    movieDetails: json
  }
}

export function fetchMovieDetails(id) {
  return (dispatch) => {
    dispatch(movieDetailsRequest());
    return fetch(urlDetails1 + id + urlDetails2)
      .then((initialResponse) => {
        if (initialResponse.ok) {
          return initialResponse.json();
        } else {
          dispatch(movieDetailsFail());
        }
      })
      .then((json) => {
        dispatch(movieDetailsSuccess(json))
      }, (error) => {
        dispatch(movieDetailsFail());
        console.log(error);
      });
  }
}