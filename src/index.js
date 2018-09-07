import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import setStore from './Redux/store';
import Root from './Containers/Root';
import registerServiceWorker from './registerServiceWorker';

const initialState = {
  loadingMovies: false,
  initialLoadingError: false,
  loadingGenres: false,
  genresLoadingError: false,
  movieList: [],
  settings: {},
  genreList: [],
  //genresTriggered: false,
  genresSelected: [],
  page: 1,
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  imageIndex: 1
};

const store = setStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
