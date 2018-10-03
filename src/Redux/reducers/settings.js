import {LOAD_SETTINGS} from '../actions/fetch_settings';

export function settings(state={}, action) {
  switch (action.type) {
    case LOAD_SETTINGS: {
      // return Object.assign({}, state, {
      //   settings: action.settings
      // });
      return action.settings;
    }
    default: {
      return state;
    }
  }
}