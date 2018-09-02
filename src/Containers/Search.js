import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePage, clearGenres } from '../Redux/actions';

class Search extends Component {
  searchRequest(e){
    this.props.changePage(1);
    this.props.clearGenres();
    let query = e.target.value;
    if (query.length > 0) {
      this.props.history.push(`/search=${query}`);
    } else {
      this.props.history.push(`/`);
    }
  }
  render(){
    return(
      <div>
        {this.props.searchQuery &&
          <input type="search" value={this.props.searchQuery} autoFocus onChange={(e) => {this.searchRequest(e)}}/>
        }
        {!this.props.searchQuery &&
          <input type="search" onChange={(e) => {this.searchRequest(e)}} placeholder="Search..."/>
        }
      </div>
    );
  }
}

const mapDispatchToProps = {
  changePage,
  clearGenres
};

export default connect(null, mapDispatchToProps)(Search);