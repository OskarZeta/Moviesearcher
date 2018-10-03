import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class PageBtn extends Component {
  makePageAndText() {
    let text = '';
    let newPage = this.props.page;
    if (this.props.direction === 'prev') {
      text = 'Back';
      if (newPage !== 1) {
        newPage = newPage - 1;
      }
    } else {
      text = 'Next';
      newPage = newPage + 1;
    }
    return {
      text: text,
      page: newPage
    }
  }
  render() {
    return (
      <div>
        <Link className={'Pagination__' + this.props.direction}
              to={
                `${this.props.query ? this.props.history.location.pathname + '?' + this.props.query + '/' : '/'}${this.makePageAndText().page}`
              }
        >
          <span>{this.makePageAndText().text}</span>
        </Link>
      </div>
    )
  }
}

export default withRouter(PageBtn);