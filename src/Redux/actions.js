import 'whatwg-fetch';

export const FETCH_MOVIES_FAIL = 'FETCH_MOVIES_FAIL';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_SETTINGS_FAIL = 'FETCH_SETTINGS_FAIL';
export const FETCH_SETTINGS_SUCCESS = 'FETCH_SETTINGS_SUCCESS';
export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export const PAGE_NEXT = 'PAGE_NEXT';
export const PAGE_PREV = 'PAGE_PREV';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const CHANGE_URL = 'CHANGE_URL';
export const FETCH_GENRES_REQUEST = 'FETCH_GENRES_REQUEST';
export const FETCH_GENRES_FAIL = 'FETCH_GENRES_FAIL';
export const FETCH_GENRES_SUCCESS = 'FETCH_GENRES_SUCCESS';
export const TRIGGER_GENRES = 'TRIGGER_GENRES';
export const ADD_GENRE = 'ADD_GENRE';
export const REMOVE_GENRE = 'REMOVE_GENRE';
export const CLEAR_GENRES = 'CLEAR_GENRES';
export const SAVE_SEARCH_QUERY = 'SAVE_SEARCH_QUERY';
export const CLEAR_SEARCH_QUERY = 'CLEAR_SEARCH_QUERY';
export const MOVIE_DETAILS_REQUEST = 'MOVIE_DETAILS_REQUEST';
export const MOVIE_DETAILS_FAIL = 'MOVIE_DETAILS_FAIL';
export const MOVIE_DETAILS_SUCCESS = 'MOVIE_DETAILS_SUCCESS';
export const MOVIE_SIMILAR_REQUEST = 'MOVIE_SIMILAR_REQUEST';
export const MOVIE_SIMILAR_FAIL = 'MOVIE_SIMILAR_FAIL';
export const MOVIE_SIMILAR_SUCCESS = 'MOVIE_SIMILAR_SUCCESS';

const apiAddress = 'https://api.themoviedb.org/3';
//const moviesPopular = '/movie/popular?page=';
const apiKey = '8282c68f5ed8f63c5bfae413614846d5';
//const urlSettings = `${apiAddress}/configuration?api_key=${apiKey}`;
const urlGenres = `${apiAddress}/genre/movie/list?language=en-US&api_key=${apiKey}`;

const urlPolular = `https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${apiKey}&page=`;
const urlGenred1 = `https://api.themoviedb.org/3/discover/movie?with_genres=`;
const urlDiscover = `https://api.themoviedb.org/3/discover/movie?sort_by=`;
const urlPopularity = `popularity`;
const urlVotesAverage = `vote_average`;
const urlVotesNumber = `vote_count`;
const urlOriginalTitle = `original_title`;
const urlGenred2 = `&api_key=${apiKey}&page=`;
const urlSearch1 = `https://api.themoviedb.org/3/search/movie?query=`;
const urlSearch2 = `&api_key=${apiKey}&page=`;
const urlDetails1 = `https://api.themoviedb.org/3/movie/`;
const urlDetails2 = `?api_key=${apiKey}&language=en-US`;
const urlSimilar1 = `https://api.themoviedb.org/3/movie/`;
const urlSimilar2 = `/similar?api_key=${apiKey}&language=en-US&page=`;
//https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&language=en-US&page=1


export function changeURL(url) {
  return {
    type: CHANGE_URL,
    urlApp: url
  }
}

function fetchMoviesRequest() {
  return {
    type: FETCH_MOVIES_REQUEST,
    loadingMovies: true,
    initialLoadingError: false
  }
}

function settingsLoadFail() {
  return {
    type: FETCH_SETTINGS_FAIL,
    loadingMovies: false,
    initialLoadingError: true,
    settings: {}
  }
}
function settingsLoadSuccess(json) {
  return {
    type: FETCH_SETTINGS_SUCCESS,
    loadingMovies: false,
    settings: json
  }
}

export function loadSettingsFromCookie(settings) {
  return {
    type: LOAD_SETTINGS,
    settings: settings
  }
}

function moviesLoadFail() {
  return {
    type: FETCH_MOVIES_FAIL,
    loadingMovies: false,
    initialLoadingError: true,
    movieList: []
  }
}
function moviesLoadSuccess(json) {
  return {
    type: FETCH_MOVIES_SUCCESS,
    loadingMovies: false,
    initialLoadingError: false,
    movieList: json ? json.results : []
  }
}

function movieDetailsRequest() {
  return {
    type: MOVIE_DETAILS_REQUEST,
    loadingMovieDetails: true,
    movieDetailsError: false
  }
}
function movieDetailsFail() {
  return {
    type: MOVIE_DETAILS_FAIL,
    loadingMovieDetails: false,
    movieDetailsError: true
  }
}
function movieDetailsSuccess(json) {
  return {
    type: MOVIE_DETAILS_SUCCESS,
    loadingMovieDetails: false,
    movieDetailsError: false,
    movieDetails: json
  }
}

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

function fetchGenresRequest() {
  return {
    type: FETCH_GENRES_REQUEST,
    loadingGenres: true
  }
}

function fetchGenresFail() {
  return {
    type: FETCH_GENRES_FAIL,
    loadingOptions: false,
    genresLoadingError: true,
    genreList: {}
  }
}

function fetchGenresSuccess(json) {
  return {
    type: FETCH_GENRES_SUCCESS,
    loadingGenres: false,
    genreList: json
  }
}

export function pageNext() {
  return {
    type: PAGE_NEXT
  }
}
export function pagePrev() {
  return {
    type: PAGE_PREV
  }
}

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page: page
  }
}

export function triggerGenres() {
  return{
    type: TRIGGER_GENRES,
    genresTriggered: true
  }
}

export function clearGenres() {
  return{
    type: CLEAR_GENRES
  }
}

export function addGenres(id) {
  return {
    type: ADD_GENRE,
    id: id
  }
}

export function removeGenres(id) {
  return{
    type: REMOVE_GENRE,
    id: id
  }
}

export function saveSearchQuery(query) {
  return{
    type: SAVE_SEARCH_QUERY,
    searchQuery: query
  }
}

export function clearSearchQuery() {
  return{
    type: CLEAR_SEARCH_QUERY,
    searchQuery: ''
  }
}

export function fetchGenres() {
  //let url = `https://api.themoviedb.org/genre/movie/list?language=en-US&api_key=${apiKey}`;
  return ((dispatch) => {
    dispatch(fetchGenresRequest());
    return fetch(urlGenres)
      .then((initialResponse) => {
        if (initialResponse.ok) {
          return initialResponse.json();
        } else {
          dispatch(fetchGenresFail());
        }
      })
      .then((json) => {
        json = json.genres.map((genre) => {
          return Object.assign(genre, {
            selected: false
          });
        });
        dispatch(fetchGenresSuccess(json));
      }, (error)=> {
        dispatch(fetchGenresFail());
          console.log(error);
        });
  });
}

export function fetchSettings(settingsFromCookie) {
  return (dispatch) => {
    if (!settingsFromCookie) {
      dispatch(fetchMoviesRequest());
      return fetch(`${apiAddress}/configuration?api_key=${apiKey}`)
        .then((initialResponse) => {
          if (initialResponse.ok) {
            return initialResponse.json();
          } else {
            dispatch(settingsLoadFail());
          }
        })
        .then((json) => {
          dispatch(settingsLoadSuccess(json));
          let date = new Date();
          date.setDate(date.getDate() + 3);
          document.cookie = `settings=${JSON.stringify(json)} path=/; expires=${date.toUTCString()}`;
        }, (error) => {
          dispatch(settingsLoadFail());
          console.log(error);
        })
    } else {
      dispatch(settingsLoadSuccess(settingsFromCookie));
    }
  }
}

export function fetchPopularMovies(page) {
  return (dispatch) => {
    dispatch(fetchMoviesRequest());
    return fetch(urlPolular + page)
      .then((initialResponse) => {
        if (initialResponse.ok) {
          return initialResponse.json();
        } else {
          dispatch(moviesLoadFail());
        }
      })
      .then((json) => {
        dispatch(moviesLoadSuccess(json));
      }, (error) => {
        dispatch(moviesLoadFail());
        console.log(error);
      })
  }
}

export function fetchGenredMovies(page, genresArray) {
  return (dispatch) => {
    dispatch(fetchMoviesRequest());
    return fetch(urlGenred1 + genresArray.toString() + urlGenred2 + page)
      .then((initialResponse) => {
        if (initialResponse.ok) {
          return initialResponse.json();
        } else {
          dispatch(moviesLoadFail());
        }
      })
      .then((json) => {
        dispatch(moviesLoadSuccess(json));
      }, (error) => {
        dispatch(moviesLoadFail());
        console.log(error);
      })
  }
}

export function fetchSortedMovies(page, sortBy, direction, genresArray) {
  //console.log(sortBy, direction);
  return (dispatch) => {
    dispatch(fetchMoviesRequest());
    let url = urlDiscover;
    switch (sortBy) {
      case 'popularity' : {
        url = url + urlPopularity + `.${direction}`;
        break;
      }
      case 'votes_average' : {
        url = url + urlVotesAverage + `.${direction}`;
        break;
      }
      case 'votes_number' : {
        url = url + urlVotesNumber + `.${direction}`;
        break;
      }
      case 'original_title' : {
        url = url + urlOriginalTitle + `.${direction}`;
        break;
      }
      default : {
        throw new Error('Wrong sorting type input');
      }
    }
    //console.log(url);
    if (genresArray){
      if (genresArray.length > 0) {
        url = url + `&with_genres=${genresArray.toString()}`;
      }
    }
    url = url + urlGenred2;
    //console.log(url);
    return fetch(url + page)
      .then((initialResponse) => {
        //console.log(initialResponse);
        if (initialResponse.ok) {
          return initialResponse.json();
        } else {
          dispatch(moviesLoadFail());
        }
      })
      .then((json) => {
        dispatch(moviesLoadSuccess(json));
      }, (error) => {
        dispatch(moviesLoadFail());
        console.log(error);
      })
  }
}

export function fetchSearchedMovies(page, query) {
  return (dispatch) => {
    dispatch(fetchMoviesRequest());
    return fetch(urlSearch1 + query + urlSearch2 + page)
      .then((initialResponse) => {
        if (initialResponse.ok) {
          return initialResponse.json();
        } else {
          dispatch(moviesLoadFail());
        }
      })
      .then((json) => {
        dispatch(moviesLoadSuccess(json));
      }, (error) => {
        dispatch(moviesLoadFail());
        console.log(error);
      });
  }
}

export function fetchMovieDetails(id) {
  return (dispatch) => {
    dispatch(movieDetailsRequest());
    return fetch(urlDetails1 + id + urlDetails2)
      .then((initialResponse) => {
        if (initialResponse.ok) {
          return initialResponse.json();
        } else {
          dispatch(movieDetailsFail());
        }
      })
      .then((json) => {
        dispatch(movieDetailsSuccess(json))
      }, (error) => {
        dispatch(movieDetailsFail());
        console.log(error);
      });
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