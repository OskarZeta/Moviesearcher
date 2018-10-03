import axios from 'axios';

import { errorSet } from '../has_error';
const apiKey = '8282c68f5ed8f63c5bfae413614846d5';

export const FETCH_MOVIES_SORTED = 'FETCH_MOVIES_SORTED';

const urlSorted = `https://api.themoviedb.org/3/discover/movie?`;
const urlSorted2 = `&api_key=${apiKey}&page=`;

function moviesLoadSorted(data) {
  //console.log(data);
  return {
    type: FETCH_MOVIES_SORTED,
    movieList: data ? data.results : []
  }
}

export function fetchMoviesSorted(page, sortBy, direction, genresArray) {
  //console.log(page, sortBy, direction, genresArray);
  return (dispatch) => {
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
    //console.log(url + page);
    return axios.get(url + page)
      .then((response) => {
        dispatch(moviesLoadSorted(response.data));
      })
      .catch((error) => {
        dispatch(errorSet(error));
      })
  }
}