//import 'whatwg-fetch';
import axios from 'axios';
import { errorSet } from '../has_error';
import { loadingStart, loadingStop } from '../is_loading';

// export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
// export const FETCH_MOVIES_FAIL = 'FETCH_MOVIES_FAIL';
// export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';

export const FETCH_MOVIES_DEFAULT = 'FETCH_MOVIES_DEFAULT';

const apiKey = '8282c68f5ed8f63c5bfae413614846d5';
const urlPolular = `https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${apiKey}&page=`;
// const urlGenred1 = `https://api.themoviedb.org/3/discover/movie?with_genres=`;
// const urlDiscover = `https://api.themoviedb.org/3/discover/movie?sort_by=`;
// const urlPopularity = `popularity`;
// const urlVotesAverage = `vote_average`;
// const urlVotesNumber = `vote_count`;
// const urlOriginalTitle = `original_title`;
// const urlReleaseDate = `release_date`;
// const urlGenred2 = `&api_key=${apiKey}&page=`;
// const urlSearch1 = `https://api.themoviedb.org/3/search/movie?query=`;
// const urlSearch2 = `&api_key=${apiKey}&page=`;

// export function fetchMoviesRequest() {
//   return {
//     type: FETCH_MOVIES_REQUEST,
//     loadingMovies: true,
//     initialLoadingError: false
//   }
// }
// function moviesLoadFail() {
//   return {
//     type: FETCH_MOVIES_FAIL,
//     loadingMovies: false,
//     initialLoadingError: true,
//     movieList: []
//   }
// }

// function moviesLoadSuccess(json) {
//   return {
//     type: FETCH_MOVIES_SUCCESS,
//     loadingMovies: false,
//     initialLoadingError: false,
//     movieList: json ? json.results : []
//   }
// }

function moviesLoadDefault(data) {
  return {
    type: FETCH_MOVIES_DEFAULT,
    movieList: data ? data.results : []
  }
}

export function fetchMoviesDefault(page) {
  return (dispatch) => {
    dispatch(loadingStart());
    return axios.get(urlPolular + page)
      .then((response) => {
        dispatch(moviesLoadDefault(response.data));
        dispatch(loadingStop());
      })
      .catch((error) => {
        console.log(error);
        dispatch(errorSet("Error while retrieving list of popular movies from server."));
      })
  }
}

// export function fetchPopularMovies(page) {
//   return (dispatch) => {
//     dispatch(fetchMoviesRequest());
//     return fetch(urlPolular + page)
//       .then((initialResponse) => {
//         if (initialResponse.ok) {
//           return initialResponse.json();
//         } else {
//           dispatch(moviesLoadFail());
//         }
//       })
//       .then((json) => {
//         dispatch(moviesLoadSuccess(json));
//       }, (error) => {
//         dispatch(moviesLoadFail());
//         console.log(error);
//       })
//   }
// }

// export function fetchGenredMovies(page, genresArray) {
//   return (dispatch) => {
//     dispatch(fetchMoviesRequest());
//     return fetch(urlGenred1 + genresArray.toString() + urlGenred2 + page)
//       .then((initialResponse) => {
//         if (initialResponse.ok) {
//           return initialResponse.json();
//         } else {
//           dispatch(moviesLoadFail());
//         }
//       })
//       .then((json) => {
//         dispatch(moviesLoadSuccess(json));
//       }, (error) => {
//         dispatch(moviesLoadFail());
//         console.log(error);
//       })
//   }
// }
//
// export function fetchSortedMovies(page, sortBy, direction, genresArray) {
//   return (dispatch) => {
//     dispatch(fetchMoviesRequest());
//     let url = urlDiscover;
//     switch (sortBy) {
//       case 'popularity' : {
//         url = url + urlPopularity + `.${direction}`;
//         break;
//       }
//       case 'votes_average' : {
//         url = url + urlVotesAverage + `.${direction}`;
//         break;
//       }
//       case 'votes_number' : {
//         url = url + urlVotesNumber + `.${direction}`;
//         break;
//       }
//       case 'original_title' : {
//         url = url + urlOriginalTitle + `.${direction}`;
//         break;
//       }
//       case 'release_date' : {
//         url = url + urlReleaseDate + `.${direction}`;
//         break;
//       }
//       default : {
//         throw new Error('Wrong sorting type input');
//       }
//     }
//     if (genresArray){
//       if (genresArray.length > 0) {
//         url = url + `&with_genres=${genresArray.toString()}`;
//       }
//     }
//     url = url + urlGenred2;
//     return fetch(url + page)
//       .then((initialResponse) => {
//         if (initialResponse.ok) {
//           return initialResponse.json();
//         } else {
//           dispatch(moviesLoadFail());
//         }
//       })
//       .then((json) => {
//         dispatch(moviesLoadSuccess(json));
//       }, (error) => {
//         dispatch(moviesLoadFail());
//         console.log(error);
//       })
//   }
// }
//
// export function fetchSearchedMovies(page, query) {
//   return (dispatch) => {
//     dispatch(fetchMoviesRequest());
//     return fetch(urlSearch1 + query + urlSearch2 + page)
//       .then((initialResponse) => {
//         if (initialResponse.ok) {
//           return initialResponse.json();
//         } else {
//           dispatch(moviesLoadFail());
//         }
//       })
//       .then((json) => {
//         dispatch(moviesLoadSuccess(json));
//       }, (error) => {
//         dispatch(moviesLoadFail());
//         console.log(error);
//       });
//   }
// }