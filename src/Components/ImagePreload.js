import React from 'react';
import Spinner from './Spinner';

const ImagePreload = ({type}) =>
  <div className={`image-preload image-preload--${type}`}>
    <Spinner/>
  </div>

export default ImagePreload;
