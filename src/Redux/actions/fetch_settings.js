import 'whatwg-fetch';
import { fetchMoviesRequest, apiKey, apiAddress } from '../actions/fetch_movies';

export const FETCH_SETTINGS_FAIL = 'FETCH_SETTINGS_FAIL';
export const FETCH_SETTINGS_SUCCESS = 'FETCH_SETTINGS_SUCCESS';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';

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