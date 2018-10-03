import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { changePage } from '../Redux/actions/change_page';
//import { clearGenres } from '../Redux/actions/change_genres';
import { withRouter } from 'react-router-dom';

class Search extends Component {
  componentDidMount(){
    //console.log(this.props.query);
  }
  componentDidUpdate(){
    //console.log(this.props.query);
  }
  searchRequest(e){
    //console.log(this.props.query, e.target.value);
    let query = e.target.value.trim();
    if (query.length > 0) {
      this.props.history.push(`/search?q=${query}`);
    } else {
      this.props.history.push(`/`);
    }
    // this.props.changePage(1);
    // this.props.clearGenres();
    // let query = e.target.value;
    // if (query.length > 0) {
    //   this.props.history.push(`/search=${query}`);
    // } else {
    //   this.props.history.push(`/`);
    // }
  }
  render(){
    //value={this.props.query ? this.props.query.q : ""}
    //console.log(this.props.query);
    return(
      <div>
        {/*{this.props.searchQuery &&*/}
          {/*<input type="search" value={this.props.searchQuery} autoFocus onChange={(e) => {this.searchRequest(e)}}/>*/}
        {/*}*/}
        {/*{!this.props.searchQuery &&*/}
          {/*<input type="search" onChange={(e) => {this.searchRequest(e)}} placeholder="Search..."/>*/}
        {/*}*/}
        {this.props.query &&
          <input
            type="search"
            autoFocus={!!this.props.query}
            defaultValue={this.props.query.q}
            onChange={(e) => {this.searchRequest(e)}} placeholder="Search..."
          />
        }
        {!this.props.query &&
          <input
            type="search"
            autoFocus={!!this.props.query}
            onChange={(e) => {this.searchRequest(e)}} placeholder="Search..."
          />
        }
        {/*<input*/}
          {/*type="search"*/}
          {/*autoFocus={!!this.props.query}*/}
          {/*value={this.props.query ? this.props.query.q : ""}*/}
          {/*onChange={(e) => {this.searchRequest(e)}} placeholder="Search..."*/}
        {/*/>*/}
      </div>
    );
  }
}

//const mapDispatchToProps = {
  //changePage,
  //clearGenres
//};

//export default withRouter(connect(null, mapDispatchToProps)(Search));
export default withRouter(Search);