import 'whatwg-fetch';
import { apiKey } from './fetch_movies_default';

export const MOVIE_SIMILAR_REQUEST = 'MOVIE_SIMILAR_REQUEST';
export const MOVIE_SIMILAR_FAIL = 'MOVIE_SIMILAR_FAIL';
export const MOVIE_SIMILAR_SUCCESS = 'MOVIE_SIMILAR_SUCCESS';

const urlSimilar1 = `https://api.themoviedb.org/3/movie/`;
const urlSimilar2 = `/similar?api_key=${apiKey}&language=en-US&page=`;

function movieSimilarRequest() {
  return {
    type: MOVIE_SIMILAR_REQUEST,
    loadingMovieSimilar: true,
    movieSimilarError: false
  }
}
function movieSimilarFail() {
  return {
    type: MOVIE_SIMILAR_FAIL,
    loadingMovieSimilar: false,
    movieSimilarError: true
  }
}
function movieSimilarSuccess(json) {
  return {
    type: MOVIE_SIMILAR_SUCCESS,
    loadingMovieSimilar: false,
    movieSimilarError: false,
    movieSimilar: json
  }
}

export function fetchMovieSimilar(id, page) {
  return (dispatch) => {
    dispatch(movieSimilarRequest());
    return fetch(urlSimilar1 + id + urlSimilar2 + page)
      .then((initialResponse) => {
        if (initialResponse.ok) {
          return initialResponse.json();
        } else {
          dispatch(movieSimilarFail());
        }
      })
      .then((json) => {
        dispatch(movieSimilarSuccess(json))
      }, (error) => {
        dispatch(movieSimilarFail());
        console.log(error);
      });
  }
}