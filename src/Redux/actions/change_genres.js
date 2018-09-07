export const ADD_GENRE = 'ADD_GENRE';
export const REMOVE_GENRE = 'REMOVE_GENRE';
export const CLEAR_GENRES = 'CLEAR_GENRES';

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
  return {
    type: REMOVE_GENRE,
    id: id
  }
}