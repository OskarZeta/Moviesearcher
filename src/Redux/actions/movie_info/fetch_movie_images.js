import { errorSet } from '../has_error';
import axios from 'axios';

const apiKey = '8282c68f5ed8f63c5bfae413614846d5';

//export const MOVIE_IMAGES_REQUEST = 'MOVIE_IMAGES_REQUEST';
//export const MOVIE_IMAGES_FAIL = 'MOVIE_IMAGES_FAIL';
export const FETCH_MOVIE_IMAGES = 'FETCH_MOVIE_IMAGES';

const urlImages1 = `https://api.themoviedb.org/3/movie/`;
const urlImages2 = `/images?api_key=${apiKey}`;

function movieLoadImages(data) {
  return {
    type: FETCH_MOVIE_IMAGES,
    movieDetails: data
  }
}

export function fetchMovieImages(id) {
  return (dispatch) => {
    return axios.get(urlImages1 + id + urlImages2)
      .then((response) => {
        dispatch(movieLoadImages(response));
      })
      .catch((error) => {
        dispatch(errorSet(error));
      })
  }
}

// function movieImagesRequest() {
//   return {
//     type: MOVIE_IMAGES_REQUEST,
//     loadingMovieImages: true,
//     movieImagesError: false
//   }
// }
// function movieImagesFail() {
//   return {
//     type: MOVIE_IMAGES_FAIL,
//     loadingMovieImages: false,
//     movieImagesError: true
//   }
// }
// function movieImagesSuccess(json) {
//   return {
//     type: MOVIE_IMAGES_SUCCESS,
//     loadingMovieImages: false,
//     movieImagesError: false,
//     movieImages: json
//   }
// }
//
// export function fetchMovieImages(id) {
//   return (dispatch) => {
//     dispatch(movieImagesRequest());
//     return fetch(urlImages1 + id + urlImages2)
//       .then((initialResponse) => {
//         if (initialResponse.ok) {
//           return initialResponse.json();
//         } else {
//           dispatch(movieImagesFail());
//         }
//       })
//       .then((json) => {
//         dispatch(movieImagesSuccess(json))
//       }, (error) => {
//         dispatch(movieImagesFail());
//         console.log(error);
//       });
//   }
// }

