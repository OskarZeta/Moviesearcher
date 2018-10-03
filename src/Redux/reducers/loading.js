import {LOADING_START, LOADING_STOP} from '../actions/is_loading';

export function loading(state = false, action) {
  // console.log(state);
  switch (action.type) {
    case LOADING_START: {
      return true;
    }
    case LOADING_STOP: {
      return false
    }
    default: {
      return state;
    }
  }
}