import {ERROR_SET, ERROR_CLEAR} from '../actions/has_error';

export function error(state = {isError: false, errorText: ""}, action) {
  // console.log(state);
  switch (action.type) {
    case ERROR_SET: {
      ////console.log('error set!');
      // return Object.assign({}, state, {
      //   error: action.error
      // })
      //return action.error;
      return {isError: true, errorText: action.errorText};
    }
    case ERROR_CLEAR: {
      ////console.log('error clear!');
      // return Object.assign({}, state, {
      //   error: ""
      // })
      return {isError: false, errorText: ""}
    }
    default: {
      return state;
    }
  }
}