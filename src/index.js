import 'bootstrap/dist/css/bootstrap.min.css';
//import $ from 'jquery';
//import Popper from 'popper.js';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import setStore from './Redux/store';
import App from './Containers/App';
import ErrorHandler from './Containers/ErrorHandler';
//import Root from './Containers/Root';
import { BrowserRouter } from 'react-router-dom';
//import registerServiceWorker from './registerServiceWorker';

// const initialState = {
//   movieList: [],
//   movieCredits: [],
//   movieDetails: [],
//   movieImages: [],
//   movieSimilars: [],
//   settings: {},
//   genreList: [],
//   genresSelected: [],
//   favorites: [],
//   page: 1,
//   error: ""
// };

//const store = setStore(initialState);
const store = setStore();

ReactDOM.render(
  <Provider store={store}>
    <ErrorHandler>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App/>
      </BrowserRouter>
    </ErrorHandler>
  </Provider>,
  document.getElementById('root')
);

//registerServiceWorker();
