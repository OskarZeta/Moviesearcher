export const PAGE_NEXT = 'PAGE_NEXT';
export const PAGE_PREV = 'PAGE_PREV';
export const CHANGE_PAGE = 'CHANGE_PAGE';

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