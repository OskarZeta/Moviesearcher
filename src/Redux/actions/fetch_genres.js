import axios from 'axios';

import { errorSet } from './has_error';

const apiKey = '8282c68f5ed8f63c5bfae413614846d5';

//export const FETCH_GENRES_REQUEST = 'FETCH_GENRES_REQUEST';
//export const FETCH_GENRES_FAIL = 'FETCH_GENRES_FAIL';
export const FETCH_GENRES = 'FETCH_GENRES';

const urlGenres = `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${apiKey}`;

// function fetchGenresRequest() {
//   return {
//     type: FETCH_GENRES_REQUEST,
//     loadingGenres: true
//   }
// }
// function fetchGenresFail() {
//   return {
//     type: FETCH_GENRES_FAIL,
//     loadingOptions: false,
//     genresLoadingError: true,
//     genreList: {}
//   }
// }
// function fetchGenresSuccess(json) {
//   return {
//     type: FETCH_GENRES_SUCCESS,
//     loadingGenres: false,
//     genreList: json
//   }
// }

function loadGenres(json) {
  return {
    type: FETCH_GENRES,
    genreList: json
  }
}

export function fetchGenres() {
  return ((dispatch) => {
    return axios.get(urlGenres)
      .then((response) => {
        dispatch(loadGenres(response.data.genres));
        //console.log(response.data.genres);
        return response.data.genres.map((genre) => {
          return Object.assign(genre, {
            selected: false
          });
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(errorSet("Error while retrieving list of genres from server."));
      });
  });
}