import axios from 'axios';

import { errorSet } from '../has_error';
import { loadingStart, loadingStop } from '../is_loading';

const apiKey = '8282c68f5ed8f63c5bfae413614846d5';

export const FETCH_MOVIES_SEARCHED = 'FETCH_MOVIES_SEARCHED';

const urlSearch1 = `https://api.themoviedb.org/3/search/movie?query=`;
const urlSearch2 = `&api_key=${apiKey}&page=`;

function moviesLoadSorted(data) {
  return {
    type: FETCH_MOVIES_SEARCHED,
    movieList: data ? data.results : []
  }
}

export function fetchMoviesSearched(page, query) {
  return dispatch => {
    dispatch(loadingStart());
    return axios.get(urlSearch1 + query + urlSearch2 + page)
      .then(response => {
        dispatch(moviesLoadSorted(response.data));
        dispatch(loadingStop());
      })
      .catch(error => {
        dispatch(errorSet(error));
      })
  }
}
