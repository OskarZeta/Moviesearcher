import axios from 'axios';
import { errorSet } from './has_error';

export const FETCH_GENRES = 'FETCH_GENRES';

const apiKey = '8282c68f5ed8f63c5bfae413614846d5';
const urlGenres = `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${apiKey}`;

function loadGenres(json) {
  return {
    type: FETCH_GENRES,
    genreList: json
  }
}

export function fetchGenres() {
  return ((dispatch) => {
    return axios.get(urlGenres)
      .then((response) => {
        dispatch(loadGenres(response.data.genres));
        return response.data.genres.map((genre) => {
          return Object.assign(genre, {
            selected: false
          });
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(errorSet("Error while retrieving list of genres from server."));
      });
  });
}