import React, { Component } from 'react';
import PageBtn from '../Containers/PageBtn';

class Pagination extends Component {
  render() {
    return (
      <div className="Pagination">
        <PageBtn direction="prev" page={this.props.page} genresSelected={this.props.genresSelected}/>
        <PageBtn direction="next" page={this.props.page} genresSelected={this.props.genresSelected}/>
      </div>
    );
  }
}

export default Pagination;