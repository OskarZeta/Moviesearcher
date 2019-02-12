import React from 'react';

const ErrorPage = () =>
  <div className="container container--error-page">
    <h1 className="App__error-header">ERROR! :(</h1>
    <div className="App__error-text">
      <span>Page not found.</span>
      <a className="App__error-link" href="/Moviesearcher/">Home</a>
    </div>
  </div>

export default ErrorPage;
