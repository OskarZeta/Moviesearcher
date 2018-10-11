import {ERROR_SET, ERROR_CLEAR} from '../actions/has_error';

export function error(state = {isError: false, errorText: ""}, action) {
  switch (action.type) {
    case ERROR_SET: {
      return {isError: true, errorText: action.errorText};
    }
    case ERROR_CLEAR: {
      return {isError: false, errorText: ""}
    }
    default: {
      return state;
    }
  }
}