import {PAGE_NEXT, PAGE_PREV, CHANGE_PAGE} from '../actions/change_page';

export function page(state=1, action) {
  switch (action.type) {
    // case PAGE_NEXT: {
    //   return Object.assign({}, state, {
    //     page: state.page + 1,
    //   })
    // }
    // case PAGE_PREV: {
    //   return Object.assign({}, state, {
    //     page: state.page - 1,
    //   })
    // }
    case CHANGE_PAGE: {
      // return Object.assign({}, state, {
      //   page: action.page
      // })
      return action.page;
    }
    default: {
      return state;
    }
  }
}