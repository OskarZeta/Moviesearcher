import axios from 'axios';
import { errorSet } from '../has_error';
import { loadingStart, loadingStop } from '../is_loading';

export const FETCH_MOVIES_DEFAULT = 'FETCH_MOVIES_DEFAULT';

const apiKey = '8282c68f5ed8f63c5bfae413614846d5';
const urlPolular = `https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${apiKey}&page=`;

function moviesLoadDefault(data) {
  return {
    type: FETCH_MOVIES_DEFAULT,
    movieList: data ? data.results : []
  }
}

export function fetchMoviesDefault(page) {
  return dispatch => {
    dispatch(loadingStart());
    return axios.get(urlPolular + page)
      .then(response => {
        dispatch(moviesLoadDefault(response.data));
        dispatch(loadingStop());
      })
      .catch(error => {
        console.log(error);
        dispatch(errorSet("Error while retrieving list of popular movies from server."));
      })
  }
}
