import React, { Component } from 'react';
import '../App.css';
import {
  addGenres, clearGenres,
  saveSearchQuery, clearSearchQuery,
  loadSettingsFromCookie,
  fetchGenredMovies, fetchSearchedMovies, fetchPopularMovies, fetchSortedMovies, fetchSettings,
  fetchMovieDetails,
  fetchMovieImages,
  clearImages
} from '../Redux/actions';
//import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MovieList from '../Components/MovieList';
import MovieInfo from '../Containers/MovieInfo';
import Gallery from '../Components/Gallery';
import Sidebar from './Sidebar';
import Header from '../Components/Header';
import Pagination from '../Components/Pagination';

// const apiKey = '8282c68f5ed8f63c5bfae413614846d5';
// const apiAddress = 'https://api.themoviedb.org/3';
// const moviesToShowDefault = '/movie/popular?page=';

/*
const loadMoviesFormServer = (url) => {
  return new Promise (function (success, error) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        let movieList = JSON.parse(this.responseText).results;
        if (movieList) {
          success(movieList);
        } else {
          error(new Error('movies were not loaded!'));
        }
      }
    });
    //xhr.open("GET", `${apiAddress}/movie/popular?page=1&language=en-US&api_key=${apiKey}`);
    xhr.open('GET', `${apiAddress}${url}&language=en-US&api_key=${apiKey}`);
    xhr.send();
  });
};

const loadGenres = () => {
  return new Promise(function (success, error) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        let genres = JSON.parse(this.responseText);
        if (genres) {
          success(genres);
        } else {
          error(new Error('genres were not loaded!'));
        }
      }
    });
    xhr.open('GET', `${apiAddress}/genre/movie/list?language=en-US&api_key=${apiKey}`);
    xhr.send();
  });
};

const loadSettings = () => {
  return new Promise(function (success, error) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        let settings = JSON.parse(this.responseText);
        if (settings) {
          success(settings);
        } else {
          error(new Error('settings were not loaded!'));
        }
      }
    });
    xhr.open('GET', `${apiAddress}/configuration?api_key=${apiKey}`);
    xhr.send();
  });
};

class Genre extends Component {
  render() {
    return (
      <label className="Genre__label">
        <input type="checkbox" name="tag" onChange={(e) => {this.props.selectGenres(e, this.props.id)}}/>
        <span className="Genre__name">{this.props.genreName}</span>
      </label>
    );
  }
}

class Search extends Component {
  render() {
    return(
      <div className="Search">
        <input type="search" name="search" placeholder="search for movies" onChange={(e) => {this.props.searchMovies(e)}}/>
      </div>
    );
  }
}

class Sidebar extends Component {
  genreList() {
    if (this.props.genres){
      let list = this.props.genres;
      return list.map((genre) => {
        return(
          <Genre key={genre.id} id={genre.id} genreName={genre.name} selectGenres={this.props.selectGenres}/>
        );
      });
    }
  };
  render() {
    return (
      <div className="Sidebar">
        <form>
          <Search searchMovies={this.props.searchMovies}/>
        </form>
        <form>
          <div className="Sidebar__checkboxes">
            {this.genreList()}
          </div>
          <input type="submit" value="Confirm"/>
        </form>
      </div>);
  }
}

class Movie extends Component {
  render() {
    let address = this.props.additional.base_url + this.props.additional.poster_sizes[3] + this.props.movieInfo.poster_path;
    return (
      <article className="Movie" style={{width: +this.props.additional.poster_sizes[3].split('w').pop()}}>
        <h2>{this.props.movieInfo.title}</h2>
        <img src={address}/>
      </article>
    )
  }
}

class MovieList extends Component {
  movieList() {
    let list = this.props.list;
    let settings = this.props.settings;
    settings = JSON.parse(settings.split('=').pop());
    let additional = {
      base_url: settings.images.base_url,
      backdrop_sizes: settings.images.backdrop_sizes,
      logo_sizes: settings.images.logo_sizes,
      poster_sizes: settings.images.poster_sizes,
      profile_sizes: settings.images.profile_sizes,
      still_sizes: settings.images.still_sizes
    };
    return list.map((movie) => {
      return(
        <Movie key={movie.id} movieInfo={movie} additional={additional}/>
      );
    });
  };
  render() {
    return(
      <div className="Movies__wrapper">
        {this.movieList()}
      </div>
    )
  }
}

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <h1>The Moviesearcher</h1>
      </header>
    );
  }
}

class PageBtn extends Component {
  render() {
    let text = '';
    if (this.props.direction === 'prev') {
      text = 'Back';
    } else {
      text = 'Next';
    }
    let to = '/' + this.props.reference;
    return (
      <div className="shit">
        <button className={this.props.direction}>
          {text}
        </button>

        <Link className={this.props.direction} to={to} />
        {text}
        <div>sda</div>
      </div>
    )
  }
}

class Pagination extends Component {
  render() {
    return (
      <div className="Pagination" onClick={(e) => {this.props.clickPage(e)}}>
        <PageBtn direction="prev"/>
        <PageBtn direction="next"/>
      </div>
    );
  }
}

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: this.props.initialList || '',
      page: this.props.page
    }
  }
  updateMovieList() {
    if (!this.state.movieList) {
      loadMoviesFormServer(moviesToShowDefault+this.state.page).then(
        (movies) => {
          this.setState({
            movieList: movies
          });
        }
      );
    }
    let settings = this.props.settings;
    settings = JSON.parse(settings.split('=').pop());
    let additional = {
      base_url: settings.images.base_url,
      backdrop_sizes: settings.images.backdrop_sizes,
      logo_sizes: settings.images.logo_sizes,
      poster_sizes: settings.images.poster_sizes,
      profile_sizes: settings.images.profile_sizes,
      still_sizes: settings.images.still_sizes
    };
    if (this.state.movieList) {
      let list = this.state.movieList;
      list = list.map((movie) => {
        return(
          <Movie key={movie.id} movieInfo={movie} additional={additional}/>
        );
      });
      return (
        <div className="Container__movies">
          {list}
        </div>
      );
    } else {
      return (
        <div>
          WAIT
        </div>
      );
    }
  };
  clickPage(e) {
    let newPage = this.state.page;
    if (e.target.classList.contains('prev')) { //Checks if "Back" button pressed
      if (this.state.page > 1) {
        newPage = this.state.page - 1;
      } else {
        return;
      }
    } else if (e.target.classList.contains('next')) { //Checks if "Next" button pressed
      newPage = this.state.page + 1;
    }
    if (newPage !== this.state.page) { //Checks if page changed (prevents further script execution if "Back" button pressed on first page)
      let urlCopy = this.state.urlStr.slice(0);
      let url;
      if (urlCopy.indexOf('&') >= 0) { //Checks if current list of movies is modified somehow (with search query, selected genre(s) etc.)
        let urlAfter = urlCopy.split('page=')[1];
        url = urlCopy.split('page=')[0] + 'page=' + newPage + '&' + urlAfter.split('&')[1];
        console.log(url);
      } else { //Checks if the list is 'clear' (with default 'sort by popularity desc' parameters)
        url = urlCopy.split('page=')[0] + 'page=' + newPage;
      }
      loadMoviesFormServer(url).then(
        (movies) => {
          this.setState({
            movieList : movies,
            page: newPage,
            urlStr : url
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  render() {
    return (
      <div className="Container">
        {this.updateMovieList()}
        <div className="Container__pagination" onClick={(e) => {this.clickPage(e)}}>
          <PageBtn direction="prev" reference={(+this.state.page - 1 > 0) ? +this.state.page - 1 : 1}/>
          <PageBtn direction="next" reference={+this.state.page + 1}/>
        </div>
      </div>
    );
  }
}
 */

class App extends Component {

  /*
  //Pagination
  clickPage = (e) => {
    let newPage = this.state.page;
    if (e.target.classList.contains('prev')) { //Checks if "Back" button pressed
      if (this.state.page > 1) {
        newPage = this.state.page - 1;
      } else {
        return;
      }
    } else if (e.target.classList.contains('next')) { //Checks if "Next" button pressed
      newPage = this.state.page + 1;
    }
    if (newPage !== this.state.page) { //Checks if page changed (prevents further script execution if "Back" button pressed on first page)
      let urlCopy = this.state.urlStr.slice(0);
      let url;
      if (urlCopy.indexOf('&') >= 0) { //Checks if current list of movies is modified somehow (with search query, selected genre(s) etc.)
        let urlAfter = urlCopy.split('page=')[1];
        url = urlCopy.split('page=')[0] + 'page=' + newPage + '&' + urlAfter.split('&')[1];
        console.log(url);
      } else { //Checks if the list is 'clear' (with default 'sort by popularity desc' parameters)
        url = urlCopy.split('page=')[0] + 'page=' + newPage;
      }
      loadMoviesFormServer(url).then(
        (movies) => {
          this.setState({
            movieList : movies,
            page: newPage,
            urlStr : url
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  //Genres selector
  selectGenres = (e, id) => {
    let initialPage = 1;
    if (e.target.checked) { //Check if you select a genre
      let initialGenreList = '&with_genres=' + id;
      if (!this.state.genreTrigger) { //Check if ever clicked any genre checkbox
        loadMoviesFormServer('/discover/movie?page=' + initialPage + initialGenreList).then( //didn't click
          (movies) => {
            this.setState({
              movieList : movies,
              genreTrigger: true,
              page: initialPage,
              urlStr : '/discover/movie?page=' + initialPage + initialGenreList
            });
          },
          (error) => {
            console.log(error);
          }
        );
      } else { //clicked at least once
        let newUrl = this.state.urlStr + ',' + id;
        let newUrlCopy = newUrl.slice(0);
        newUrl = newUrlCopy.split('page=')[0] + 'page=' + initialPage + '&' + newUrlCopy.split('&')[1];
        loadMoviesFormServer(newUrl).then(
          (movies) => {
            this.setState({
              movieList : movies,
              page:  initialPage,
              urlStr : newUrl
            });
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } else { // Check if you unselect a genre
      let currentUrl = this.state.urlStr;
      let currentUrlCopy = currentUrl.slice(0);
      currentUrl = currentUrlCopy.split('page=')[0] + 'page=' + initialPage + '&' + currentUrlCopy.split('&')[1];
      let genreList = currentUrl.split('with_genres=')[1];
      genreList = JSON.parse('[' +genreList+ ']');
      let index = genreList.indexOf(id);
      genreList.splice(index, 1);
      if (genreList.length > 0) { //Check if any specific genre(s) selected
        currentUrl = currentUrl.split('with_genres=')[0] + 'with_genres=' + genreList;
        loadMoviesFormServer(currentUrl).then(
          (movies) => {
            this.setState({
              movieList : movies,
              page: initialPage,
              urlStr : currentUrl
            });
          },
          (error) => {
            console.log(error);
          }
        );
      } else { // Check if none of specific genre(s) selected
        loadMoviesFormServer(moviesToShowDefault + initialPage).then(
          (movies) => {
            this.setState({
              movieList : movies,
              urlStr: moviesToShowDefault + initialPage,
              page: 1,
              genreTrigger: false
            });
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  };

  searchMovies = (e) => {
    let initialPage = 1;
    let text = e.target.value.trim();
    let url = `/search/movie?api_key=${apiKey}&language=en-US&page=${initialPage}&query=${text}`;
    loadMoviesFormServer(url).then(
      (movies) => {
        this.setState({
          movieList : movies,
          page: initialPage,
          urlStr: url
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  componentDidMount() {
    if (!document.cookie) {
      loadSettings().then(
        (settings) => {
          document.cookie = `settings=${JSON.stringify(settings)}`;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.setState({
      settings : document.cookie
    });
    loadGenres().then(
      (genres) => {
        this.setState({
          genreList : genres.genres
        });
      },
      (error) => {
        console.log(error);
      }
    );
    loadMoviesFormServer(moviesToShowDefault+this.props.initialPage).then(
      (movies) => {
        this.setState({
          movieList : movies,
          urlStr: moviesToShowDefault+this.props.initialPage
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  */

// <div className="App">
// <Header/>
// <div className="App__wrapper">
// <Sidebar genres={this.state.genreList} selectGenres={this.selectGenres} searchMovies={this.searchMovies}/>
// <Switch>
// <Route exact path='/' render={(props) => {
//   return (
//     <Container {...props} initialList={this.state.movieList} settings={this.state.settings} page={this.props.initialPage} clickPage={this.clickPage}/>
//   );
// }} />
//
// <Route path='/?tag=:genre' render={(props) => {
//   return (
//     <Container {...props} settings={this.state.settings} page={props.match.params.page} />
//   );
// }} />
//
// <Route path='/:page' render={(props) => {
//   return (
//     <Container {...props} settings={this.state.settings} page={props.match.params.page} />
//   );
// }} />
//
// <Route path='/?search=:query' render={(props) => {
//   console.log('search');
//   return (
//     <Container {...props} settings={this.state.settings} page={props.match.params.page} query={props.match.params.query}/>
//   );
// }} />
//
// <Route path='/zalupa' render={(props) => {
//   return <div>ZALUPA</div>
// }} />
//
// </Switch>
// </div>
// </div>

  getSettings() {
    if (!document.cookie) {
      this.props.fetchSettings();
    } else {
      this.props.fetchSettings(JSON.parse(document.cookie.split(';')[0].split(' ')[0].split('settings=')[1]));
    }
  }

  componentDidMount() {
    if (this.props.filmId === 'error') {
      //console.log('wrong id');
      this.props.history.push('/');
    }

    if (Number.isNaN(this.props.page)) {
      //console.log('wrong page', this.props.page);
      this.props.history.push('/');
    }
    //load settings (MUST)
    this.getSettings();
    //load initial data
    if (this.props.filmId) {
      //this.props.clearGenres();
      if (!this.props.gallery) {
        this.props.fetchMovieDetails(this.props.filmId);
        if (this.props.imageIndex) {
          //console.log('imageFromMoviePage');
        }
      } else {
        this.props.fetchMovieImages(this.props.filmId);
        if (this.props.imageIndex) {
          //console.log('imageFromGallery');
        }
      }
    } else {
      if (this.props.genresSelected.length > 0) {
        this.props.genresSelected.forEach((id) => {
          this.props.addGenres(id);
        });
        if (this.props.sortValue && this.props.sortDir){
          this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir, this.props.genresSelected);
        } else {
          this.props.fetchGenredMovies(this.props.page, this.props.genresSelected);
        }
      }
      else if (this.props.searchQuery) {
        this.props.fetchSearchedMovies(this.props.page, this.props.searchQuery);
      }
      else {
        if (this.props.sortValue && this.props.sortDir){
          this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir);
        } else {
          this.props.fetchPopularMovies(this.props.page);
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    //console.log('imageToShow');
    if (this.props.filmId) {
      //this.props.clearGenres();

      if (this.props.filmId !== prevProps.filmId || ((this.props.filmId === prevProps.filmId) && this.props.gallery !== prevProps.gallery)){
        this.props.fetchMovieDetails(this.props.filmId);
        //this.props.clearImages();
      } else if (this.props.filmId === prevProps.filmId) {
        if (this.props.imageIndex) {
          //console.log('imageToShow');
          if ((this.props.imageIndex !== prevProps.imageIndex) && !this.props.gallery) {
            ////console.log(this.props.imageIndex);
            //console.log(this.props.imageToShow);
          } else if ((this.props.imageIndex !== prevProps.imageIndex) && this.props.gallery) {
            ////console.log('imageFromGallery');
          }
        }
      }
    }
    else if (this.props.favorites !== prevProps.favorites) {
      localStorage.setItem('favorites', JSON.stringify(this.props.favorites));
    }
    else if (this.props.searchQuery !== prevProps.searchQuery) {
      if (this.props.searchQuery) {
        this.props.fetchSearchedMovies(this.props.page, this.props.searchQuery);
      } else if (this.props.sortValue !== prevProps.sortValue || this.props.sortDir !== prevProps.sortDir) {
        if (this.props.sortValue && this.props.sortDir) {
          this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir);
        }
      } else {
        this.props.fetchPopularMovies(this.props.page);
      }
    }
    else if (this.props.sortValue !== prevProps.sortValue || this.props.sortDir !== prevProps.sortDir) {
      if (this.props.sortValue && this.props.sortDir){
        if (this.props.genresSelected.length > 0) {
          this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir, this.props.genresSelected);
        } else {
          this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir);
        }
      } else {
        this.props.fetchPopularMovies(this.props.page);
      }
    }
    else if (this.props.genresSelected !== prevProps.genresSelected) {
      //console.log('genres update');
      if (this.props.searchQuery !== prevProps.searchQuery){
        if (this.props.genresSelected.length === 0) {
          if (this.props.searchQuery) {
            this.props.fetchSearchedMovies(this.props.page, this.props.searchQuery);
          } else {
            this.props.fetchPopularMovies(this.props.page);
          }
        } else {
          this.props.fetchGenredMovies(this.props.page, this.props.genresSelected);
        }
      } else {
        if (this.props.sortValue && this.props.sortDir) {
          if (this.props.genresSelected.length > 0) {
            this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir, this.props.genresSelected);
          } else {
            this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir);
          }
        } else {
          this.props.fetchGenredMovies(this.props.page, this.props.genresSelected);
        }
      }
    }
    else if (this.props.page !== prevProps.page) {
      if (this.props.genresSelected.length > 0 ) {
        if (this.props.sortValue && this.props.sortDir) {
          this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir, this.props.genresSelected);
        } else {
          this.props.fetchGenredMovies(this.props.page, this.props.genresSelected);
        }
      } else if (this.props.sortValue && this.props.sortDir) {
        this.props.fetchSortedMovies(this.props.page, this.props.sortValue, this.props.sortDir);
      } else if (this.props.searchQuery) {
        this.props.fetchSearchedMovies(this.props.page, this.props.searchQuery)
      } else {
        this.props.fetchPopularMovies(this.props.page);
      }
    }
  }

  render() {
    return (
      <div className="App">
        {!this.props.filmId &&
          <div className="App__moviesearch">
            <Header history={this.props.history} searchQuery={this.props.searchQuery}/>
            <div className="App__wrapper">
                <Sidebar
                  history={this.props.history}
                  genresSelected={this.props.genresSelected}
                  searchQuery={this.props.searchQuery}
                  goHome={this.props.goHome}
                  sortValue={this.props.sortValue}
                  sortDir={this.props.sortDir}
                />
              {this.props.loadingMovies && <div>Loading...</div>}
              {this.props.initialLoadingError && !this.props.loadingMovies && <div>ERROR!</div>}
              {!this.props.loadingMovies && !this.props.initialLoadingError && this.props.movieList.length > 0 && Object.keys(this.props.settings).length && this.props.favorites &&
                <div className="App__wrapper-movies" style={{paddingLeft: 200}}>
                  <MovieList movieList={this.props.movieList} settings={this.props.settings.images} favorites={this.props.favorites}/>
                  <Pagination page={this.props.page} genresSelected={this.props.genresSelected} searchQuery={this.props.searchQuery} sortValue={this.props.sortValue} sortDir={this.props.sortDir}/>
                </div>
              }
            </div>
          </div>
        }
        {this.props.filmId && !this.props.gallery &&
          <div className="App__movieread">
            <Header filmId={this.props.filmId}/>
            <div className="App__wrapper">
              <Sidebar disable={true}/>
              {this.props.loadingMovieDetails && <div>Loading...</div>}
              {this.props.movieDetailsError && !this.props.loadingMovieDetails && <div>ERROR!</div>}
              {!this.props.loadingMovieDetails && !this.props.movieDetailsError && this.props.movieDetails && Object.keys(this.props.settings).length && this.props.favorites &&
                <div className="App__wrapper-movies">
                  <MovieInfo movieDetails={this.props.movieDetails} settings={this.props.settings.images} favorites={this.props.favorites}
                  imageIndex={this.props.imageIndex} history={this.props.history}/>
                </div>
              }
            </div>
          </div>
        }
        {this.props.filmId && this.props.gallery &&
          <div className="App__movieread">
            <Header filmId={this.props.filmId} toMovie={true}/>
            <div className="App__wrapper">
              <Sidebar disable={true}/>
              {this.props.loadingMovieImages && <div>Loading gallery...</div>}
              {this.props.movieImagesError && !this.props.loadingMovieImages && <div>GALLERY ERROR!</div>}
              {!this.props.loadingMovieImages && !this.props.movieImagesError && this.props.movieImages && Object.keys(this.props.settings).length &&
                <div className="App__wrapper-movies">
                  <Gallery filmId={this.props.filmId} movieImages={this.props.movieImages} settings={this.props.settings.images}
                  imageIndex={this.props.imageIndex} history={this.props.history}/>
                </div>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loadingMovies: state.loadingMovies,
    initialLoadingError: state.initialLoadingError,
    movieList: state.movieList,
    settings: state.settings,
    page: ownProps.page,
    url: state.url,
    history: ownProps.history,
    genresSelected: ownProps.genresSelected || state.genresSelected,
    searchQuery: ownProps.searchQuery,
    loadingMovieDetails: state.loadingMovieDetails,
    movieDetailsError: state.movieDetailsError,
    movieDetails: state.movieDetails,
    loadingMovieImages: state.loadingMovieImages,
    movieImagesError: state.movieImagesError,
    movieImages: state.movieImages,
    favorites: state.favorites,
    imageIndex: ownProps.imageIndex
  }
};

const mapDispatchToProps = {
  fetchGenredMovies,
  fetchSortedMovies,
  fetchSearchedMovies,
  fetchPopularMovies,
  fetchSettings,
  loadSettingsFromCookie,
  fetchMovieDetails,
  fetchMovieImages,
  addGenres,
  clearGenres,
  saveSearchQuery,
  clearSearchQuery,
  clearImages
};

export default connect(mapStateToProps, mapDispatchToProps)(App);