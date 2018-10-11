import axios from 'axios';
import { errorSet } from '../has_error';
import { loadingStart, loadingStop } from '../is_loading';

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
        dispatch(movieLoadDetails(response.data));
        dispatch(loadingStop());
      })
      .catch((error) => {
        dispatch(errorSet(
          "An error has occurred during the call to tmdb API. " +
          "Check your address bar (you've probably entered wrong film ID) " +
          "or try contacting tmdb's tech support."
        ));
      });
  }
}