import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import setStore from './Redux/store';
import App from './Containers/App';
import ErrorHandler from './Containers/ErrorHandler';
import { BrowserRouter } from 'react-router-dom';

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