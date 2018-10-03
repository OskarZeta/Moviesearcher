import axios from 'axios';
import { errorSet } from '../has_error';
import { loadingStart, loadingStop } from '../is_loading';

//export const MOVIE_DETAILS_REQUEST = 'MOVIE_DETAILS_REQUEST';
//export const MOVIE_DETAILS_FAIL = 'MOVIE_DETAILS_FAIL';
export const FETCH_MOVIE_DETAILS = 'FETCH_MOVIE_DETAILS';

const apiKey = '8282c68f5ed8f63c5bfae413614846d5';
const urlDetails1 = `https://api.themoviedb.org/3/movie/`;
const urlDetails2 = `?api_key=${apiKey}&language=en-US`;

function movieLoadDetails(data) {
  return {
    type: FETCH_MOVIE_DETAILS,
    movieDetails: data
  }
}

export function fetchMovieDetails(id) {
  return (dispatch) => {
    dispatch(loadingStart());
    return axios.get(urlDetails1 + id + urlDetails2)
      .then((response) => {
        //console.log(response);
        dispatch(movieLoadDetails(response.data));
        dispatch(loadingStop());
      })
      .catch((error) => {
        dispatch(errorSet(error));
      })
  }
}

// function movieDetailsRequest() {
//   return {
//     type: MOVIE_DETAILS_REQUEST,
//     loadingMovieDetails: true,
//     movieDetailsError: false
//   }
// }
// function movieDetailsFail() {
//   return {
//     type: MOVIE_DETAILS_FAIL,
//     loadingMovieDetails: false,
//     movieDetailsError: true
//   }
// }
// function movieDetailsSuccess(json) {
//   return {
//     type: MOVIE_DETAILS_SUCCESS,
//     loadingMovieDetails: false,
//     movieDetailsError: false,
//     movieDetails: json
//   }
// }
//
// export function fetchMovieDetails(id) {
//   return (dispatch) => {
//     dispatch(movieDetailsRequest());
//     return fetch(urlDetails1 + id + urlDetails2)
//       .then((initialResponse) => {
//         if (initialResponse.ok) {
//           return initialResponse.json();
//         } else {
//           dispatch(movieDetailsFail());
//         }
//       })
//       .then((json) => {
//         dispatch(movieDetailsSuccess(json))
//       }, (error) => {
//         dispatch(movieDetailsFail());
//         console.log(error);
//       });
//   }
// }