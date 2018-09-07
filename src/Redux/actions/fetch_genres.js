import 'whatwg-fetch';
import { apiKey, apiAddress } from '../actions/fetch_movies';

export const FETCH_GENRES_REQUEST = 'FETCH_GENRES_REQUEST';
export const FETCH_GENRES_FAIL = 'FETCH_GENRES_FAIL';
export const FETCH_GENRES_SUCCESS = 'FETCH_GENRES_SUCCESS';

const urlGenres = `${apiAddress}/genre/movie/list?language=en-US&api_key=${apiKey}`;

function fetchGenresRequest() {
  return {
    type: FETCH_GENRES_REQUEST,
    loadingGenres: true
  }
}
function fetchGenresFail() {
  return {
    type: FETCH_GENRES_FAIL,
    loadingOptions: false,
    genresLoadingError: true,
    genreList: {}
  }
}
function fetchGenresSuccess(json) {
  return {
    type: FETCH_GENRES_SUCCESS,
    loadingGenres: false,
    genreList: json
  }
}

export function fetchGenres() {
  return ((dispatch) => {
    dispatch(fetchGenresRequest());
    return fetch(urlGenres)
      .then((initialResponse) => {
        if (initialResponse.ok) {
          return initialResponse.json();
        } else {
          dispatch(fetchGenresFail());
        }
      })
      .then((json) => {
        json = json.genres.map((genre) => {
          return Object.assign(genre, {
            selected: false
          });
        });
        dispatch(fetchGenresSuccess(json));
      }, (error)=> {
        dispatch(fetchGenresFail());
        console.log(error);
      });
  });
}