import axios from 'axios';
import { errorSet } from './has_error';

export const LOAD_SETTINGS = 'LOAD_SETTINGS';

const apiKey = '8282c68f5ed8f63c5bfae413614846d5';

function settingsLoad(data) {
  return {
    type: LOAD_SETTINGS,
    settings: data
  }
}

export function fetchSettings(settingsFromCookie) {
  return dispatch => {
    if (!settingsFromCookie) {
      return axios.get(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
        .then(response => {
          dispatch(settingsLoad(response.data));
          let date = new Date();
          date.setDate(date.getDate() + 3);
          document.cookie = `settings=${JSON.stringify(response.data)} path=/; expires=${date.toUTCString()}`;
        })
        .catch(error => {
          dispatch(errorSet("Error while loading settings from server."));
        })
    } else {
      dispatch(settingsLoad(settingsFromCookie));
    }
  }
}
