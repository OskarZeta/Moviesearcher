import axios from 'axios';

import { errorSet } from './has_error';

const apiKey = '8282c68f5ed8f63c5bfae413614846d5';

//export const FETCH_SETTINGS_FAIL = 'FETCH_SETTINGS_FAIL';
//export const FETCH_SETTINGS_SUCCESS = 'FETCH_SETTINGS_SUCCESS';
//export const FETCH_SETTINGS = 'FETCH_SETTINGS';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';

// function settingsLoadFail() {
//   return {
//     type: FETCH_SETTINGS_FAIL,
//     loadingMovies: false,
//     initialLoadingError: true,
//     settings: {}
//   }
// }
// function settingsLoadSuccess(json) {
//   return {
//     type: FETCH_SETTINGS_SUCCESS,
//     loadingMovies: false,
//     settings: json
//   }
// }
// export function loadSettingsFromCookie(settings) {
//   return {
//     type: LOAD_SETTINGS,
//     settings: settings
//   }
// }

function settingsLoad(data) {
  return {
    type: LOAD_SETTINGS,
    settings: data
  }
}

// function loadSettingsFromCookie(settings) {
//   return {
//     type: LOAD_SETTINGS,
//     settings: settings
//   }
// }

// export function loadSettingsFromCookie(settings) {
//   return {
//     type: LOAD_SETTINGS,
//     settings: settings
//   }
// }

export function fetchSettings(settingsFromCookie) {
  return (dispatch) => {
    if (!settingsFromCookie) {
      return axios.get(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
        .then((response) => {
          dispatch(settingsLoad(response.data));
          let date = new Date();
          date.setDate(date.getDate() + 3);
          document.cookie = `settings=${JSON.stringify(response.data)} path=/; expires=${date.toUTCString()}`;
        })
        .catch((error) => {
          dispatch(errorSet(error));
        })
    } else {
      dispatch(settingsLoad(settingsFromCookie));
      //dispatch(loadSettingsFromCookie(settingsFromCookie));
    }
  }
}