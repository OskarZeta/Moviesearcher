import React, { Component } from 'react';
import ImagePreload from '../../Components/ImagePreload';
import FaveBtn from '../../Containers/FaveBtn';

class Poster extends Component {
  state = {
    isLoaded: false
  }
  loadPoster = () => {
    this.setState({
      isLoaded: true
    })
  }
  makeAddress(n){
    return this.props.settings.secure_base_url + this.props.settings.poster_sizes[n] + this.props.poster_path;
  }
  render() {
    const { vote_average, poster_path, id, title } = {...this.props};
    const ratings = {
      high: 'linear-gradient(-45deg, #b4e391 0%, #61c419 50%,#b4e391 100%)',
      medium: 'linear-gradient(-45deg, #fefcea 0%,#f1da36 50%,#fefcea 100%)',
      low: 'linear-gradient(135deg, rgba(243,197,189,1) 0%,rgba(232,108,87,1) 0%,rgba(255,170,170,1) 0%,rgba(255,0,0,1) 50%,rgba(255,170,170,1) 100%)'
    };
    return(
      <>
        <div className="MovieInfo__votebox" style={
          { background:
              vote_average >= 7 ? ratings.high :
              vote_average < 7 && vote_average > 3 ? ratings.medium :
              ratings.low
          }
        }>
          {vote_average.toString().split('.').length > 1 &&
            <div>
              <span className="MovieInfo__votebox-1">{vote_average.toString().split('.')[0] + '.'}</span>
              <span className="MovieInfo__votebox-2">{vote_average.toString().split('.')[1]}</span>
            </div>
          }
          {vote_average.toString().split('.').length <= 1 &&
            <div>
              <span className="MovieInfo__votebox-1">{vote_average.toString().split('.')[0]}</span>
            </div>
          }
        </div>
        {poster_path !== null &&
          <div className="MovieInfo__poster-wrapper">
            <picture>
              <source srcSet={this.makeAddress(4)} media="(min-width: 1300px)"/>
              <source srcSet={this.makeAddress(3)} media="(min-width: 800px)"/>
              <img
                className="MovieInfo__poster"
                onLoad={this.loadPoster}
                src={this.makeAddress(3)}
                alt="movie-poster"
              />
            </picture>
            {!this.state.isLoaded && <ImagePreload type="movie-poster"/>}
          </div>
        }
        {poster_path === null &&
          <div className="MovieInfo__poster-wrapper">
            <div className="MovieInfo__placeholder">
              <div className="MovieInfo__placeholder-mobile"></div>
              <div className="MovieInfo__placeholder-tablet"></div>
              <div className="MovieInfo__placeholder-desktop"></div>
            </div>
          </div>
        }
        <FaveBtn id={id} name={title} poster={poster_path} moviePage={true} />
      </>
    );
  }
}

export default Poster;
