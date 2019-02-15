import React from 'react';

const Article = ({ title, children }) =>
  <>
    <h2 className="MovieInfo__section-header">{title}</h2>
    <p className="MovieInfo__info">{children}</p>
  </>

export default Article;
