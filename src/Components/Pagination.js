import React, { Component } from 'react';
import PageBtn from '../Containers/PageBtn';

class Pagination extends Component {
  render() {
    return (
      <div className="Pagination">
        <PageBtn direction="prev" searchQuery={this.props.searchQuery} page={this.props.page} genresSelected={this.props.genresSelected}/>
        <PageBtn direction="next" searchQuery={this.props.searchQuery} page={this.props.page} genresSelected={this.props.genresSelected}/>
      </div>
    );
  }
}

export default Pagination;