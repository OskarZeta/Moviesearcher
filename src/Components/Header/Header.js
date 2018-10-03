import React, { Component } from 'react';
import Search from '../../Containers/Search';
// import Home from '../Containers/Home';
import Sidebar from '../../Containers/Sidebar';
import { Link, Switch, Route } from 'react-router-dom';

class Header extends Component {
  clickOptions(e){
    let sidebar = document.querySelector('.Sidebar');
    sidebar.classList.toggle('hidden');
    let btn = document.querySelector('.Header__options');
    btn.classList.toggle('Header__btn--active');
  }
  render() {
    return(
      <header className="Header">
        <div className="container container--header">
          <Link className="Header__home" to="/">
            <h1>Moviesearcher App</h1>
          </Link>
          <ul className="Header__additional">
            <li className="Header__options Header__btn" onClick={(e) => {this.clickOptions(e)}}>
              <span>Options</span>
            </li>
            <li className="Header__sidebar">
              <Sidebar query={this.props.query}/>
              {/*<Switch>*/}
                {/*<Route exact path="/">*/}
                  {/*<Sidebar/>*/}
                {/*</Route>*/}
                {/*<Route path="/genres=:genres">*/}
                  {/*<Sidebar/>*/}
                {/*</Route>*/}
              {/*</Switch>*/}
            </li>
            <li className="Header__favorites Header__btn">
              <Link to="/favorites">
                <span>Favorites</span>
              </Link>
            </li>
            <li className="Header__search">
              <Search/>
            </li>
          </ul>
        </div>
      </header>
    );
    // return (
    //   <header className="Header">
    //     <div className="container container--header">
    //       {/*<Home/>*/}
    //       {/*{!this.props.filmId && !this.props.toFavs &&*/}
    //
    //         <ul className="Header__additional">
    //           {/*<li className={`Header__options Header__btn ${(this.props.genresSelected.length === 0 && !this.props.sortValue) ? `` : `Header__btn--active`}`} onClick={(e) => {this.clickOptions(e)}}>*/}
    //             {/*<span>Options</span>*/}
    //           {/*</li>*/}
    //           {/*<li className={`Header__sidebar ${(this.props.genresSelected.length === 0 && !this.props.sortValue) ? `hidden` : ``}`}>*/}
    //             {/*<Sidebar*/}
    //               {/*history={this.props.history}*/}
    //               {/*genresSelected={this.props.genresSelected}*/}
    //               {/*searchQuery={this.props.searchQuery}*/}
    //               {/*goHome={this.props.goHome}*/}
    //               {/*sortValue={this.props.sortValue}*/}
    //               {/*sortDir={this.props.sortDir}*/}
    //             {/*/>*/}
    //           {/*</li>*/}
    //           <li className="Header__favorites Header__btn">
    //             <Link to="/favorites">
    //               <span>Favorites</span>
    //             </Link>
    //           </li>
    //           <li className="Header__search">
    //             {/*<Search history={this.props.history} searchQuery={this.props.searchQuery} />*/}
    //           </li>
    //         </ul>
    //       {/*}*/}
    //       {/*{this.props.filmId && !this.props.toMovie && !this.props.toFavs &&*/}
    //         {/*<ul className="Header__additional">*/}
    //           {/*<li className="Header__favorites Header__btn">*/}
    //             {/*<Link to="/favorites">*/}
    //               {/*<span>Favorites</span>*/}
    //             {/*</Link>*/}
    //           {/*</li>*/}
    //         {/*</ul>*/}
    //       {/*}*/}
    //       {/*{this.props.filmId && this.props.toMovie && !this.props.toFavs &&*/}
    //         {/*<ul className="Header__additional Header__additional--movie">*/}
    //           {/*<li className="Header__favorites Header__btn">*/}
    //             {/*<Link to="/favorites">*/}
    //               {/*<span>Favorites</span>*/}
    //             {/*</Link>*/}
    //           {/*</li>*/}
    //           {/*<li className="Header__back Header__btn">*/}
    //             {/*<Link to={`/filmId/${this.props.filmId}`}>*/}
    //               {/*To movie*/}
    //             {/*</Link>*/}
    //           {/*</li>*/}
    //         {/*</ul>*/}
    //       {/*}*/}
    //       {/*{this.props.toFavs && !this.props.toMovie &&*/}
    //         {/*<ul className="Header__additional">*/}
    //           {/*<li className="Header__favorites Header__btn Header__favorites-nonbtn Header__btn--active">*/}
    //             {/*<span style={{display: "block", padding: "5px"}}>Favorites</span>*/}
    //           {/*</li>*/}
    //         {/*</ul>*/}
    //       {/*}*/}
    //     </div>
    //   </header>
    // );
  }
}

export default Header;