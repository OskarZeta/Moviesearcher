import axios from 'axios';
//import { apiKey } from '../movie_list/fetch_movies_default';
import { errorSet } from '../has_error';
//import { loadingStart, loadingStop } from '../is_loading';

const apiKey = '8282c68f5ed8f63c5bfae413614846d5';

export const FETCH_MOVIE_CREDITS = 'FETCH_MOVIE_CREDITS';

const urlCredits1 = `https://api.themoviedb.org/3/movie/`;
const urlCredits2 = `/credits?api_key=${apiKey}`;

// function movieCreditsRequest() {
//   return {
//     type: MOVIE_CREDITS_REQUEST,
//     loadingMovieCredits: true,
//     movieCreditsError: false
//   }
// }
// function movieCreditsFail() {
//   return {
//     type: MOVIE_CREDITS_FAIL,
//     loadingMovieCredits: false,
//     movieCreditsError: true
//   }
// }
// function movieCreditsSuccess(json) {
//   return {
//     type: MOVIE_CREDITS_SUCCESS,
//     loadingMovieCredits: false,
//     movieCreditsError: false,
//     movieCredits: json
//   }
// }

function movieLoadCredits(data) {
  return {
    type: FETCH_MOVIE_CREDITS,
    movieCredits: data
  }
}

export function fetchMovieCredits(id) {
  return (dispatch) => {
    //dispatch(loadingStart());
    return axios.get(urlCredits1 + id + urlCredits2)
      .then((response) => {
        dispatch(movieLoadCredits(response.data));
        //dispatch(loadingStop());
      })
      .catch((error) => {
        dispatch(errorSet(error));
      })
  }
}