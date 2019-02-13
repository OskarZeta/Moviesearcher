import axios from 'axios';
import { errorSet } from '../has_error';
import { loadingStart, loadingStop } from '../is_loading';

export const FETCH_MOVIES_SORTED = 'FETCH_MOVIES_SORTED';

const apiKey = '8282c68f5ed8f63c5bfae413614846d5';
const urlSorted = `https://api.themoviedb.org/3/discover/movie?`;
const urlSorted2 = `&api_key=${apiKey}&page=`;

function moviesLoadSorted(data) {
  return {
    type: FETCH_MOVIES_SORTED,
    movieList: data ? data.results : []
  }
}

export function fetchMoviesSorted(page, sortBy, direction, genresArray) {
  return dispatch => {
    dispatch(loadingStart());
    let url = urlSorted;
    if (sortBy && direction) {
      url = url + 'sort_by=' + sortBy + '.' + direction;
    }
    if (genresArray){
      if (sortBy && direction) {
        url = url + `&with_genres=${genresArray.toString()}`;
      } else {
        url = url + `with_genres=${genresArray.toString()}`;
      }
    }
    url = url + urlSorted2;
    return axios.get(url + page)
      .then(response => {
        dispatch(moviesLoadSorted(response.data));
        dispatch(loadingStop());
      })
      .catch(error => {
        dispatch(errorSet(error));
      })
  }
}
