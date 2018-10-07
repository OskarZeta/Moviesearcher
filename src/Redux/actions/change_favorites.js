export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const LOAD_FAVORIES = 'LOAD_FAVORIES';

export function addFavorite(movie) {
  return{
    type: ADD_FAVORITE,
    movie: movie
  }
}
export function removeFavorite(id) {
  return{
    type: REMOVE_FAVORITE,
    id: id
  }
}
export function loadFavorites() {
  return{
    type: LOAD_FAVORIES
  }
}