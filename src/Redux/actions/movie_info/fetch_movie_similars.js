import { errorSet } from '../has_error';
import axios from 'axios';

const apiKey = '8282c68f5ed8f63c5bfae413614846d5';

//export const MOVIE_SIMILAR_REQUEST = 'MOVIE_SIMILAR_REQUEST';
//export const MOVIE_SIMILAR_FAIL = 'MOVIE_SIMILAR_FAIL';
export const FETCH_MOVIE_SIMILARS = 'FETCH_MOVIE_SIMILARS';

const urlSimilars1 = `https://api.themoviedb.org/3/movie/`;
const urlSimilars2 = `/similar?api_key=${apiKey}&language=en-US&page=1`;

function movieLoadSimilars(data) {
  return {
    type: FETCH_MOVIE_SIMILARS,
    movieDetails: data
  }
}

export function fetchMovieImages(id) {
  return (dispatch) => {
    return axios.get(urlSimilars1 + id + urlSimilars2)
      .then((response) => {
        dispatch(movieLoadSimilars(response));
      })
      .catch((error) => {
        dispatch(errorSet(error));
      })
  }
}


// function movieSimilarRequest() {
//   return {
//     type: MOVIE_SIMILAR_REQUEST,
//     loadingMovieSimilar: true,
//     movieSimilarError: false
//   }
// }
// function movieSimilarFail() {
//   return {
//     type: MOVIE_SIMILAR_FAIL,
//     loadingMovieSimilar: false,
//     movieSimilarError: true
//   }
// }
// function movieSimilarSuccess(json) {
//   return {
//     type: MOVIE_SIMILAR_SUCCESS,
//     loadingMovieSimilar: false,
//     movieSimilarError: false,
//     movieSimilar: json
//   }
// }
//
// export function fetchMovieSimilar(id, page) {
//   return (dispatch) => {
//     dispatch(movieSimilarRequest());
//     return fetch(urlSimilar1 + id + urlSimilar2 + page)
//       .then((initialResponse) => {
//         if (initialResponse.ok) {
//           return initialResponse.json();
//         } else {
//           dispatch(movieSimilarFail());
//         }
//       })
//       .then((json) => {
//         dispatch(movieSimilarSuccess(json))
//       }, (error) => {
//         dispatch(movieSimilarFail());
//         console.log(error);
//       });
//   }
// }