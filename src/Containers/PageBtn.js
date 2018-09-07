import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { pageNext, pagePrev, changePage } from '../Redux/actions/change_page';

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
        {this.props.genresSelected.length === 0 && !this.props.searchQuery && !(this.props.sortValue && this.props.sortDir) &&
          <Link className={'Pagination__' + this.props.direction} to={`/${this.makePageAndText().page}`}>
            <span>{this.makePageAndText().text}</span>
          </Link>
        }
        {this.props.genresSelected.length !== 0 && !this.props.searchQuery && !(this.props.sortValue && this.props.sortDir) &&
          <Link className={'Pagination__' + this.props.direction} to={`/genres=${this.props.genresSelected}/${this.makePageAndText().page}`}>
            <span>{this.makePageAndText().text}</span>
          </Link>
        }
        {(this.props.sortValue && this.props.sortDir) && this.props.genresSelected.length !== 0 && !this.props.searchQuery &&
          <Link className={'Pagination__' + this.props.direction} to={`/sort_by/${this.props.sortValue}.${this.props.sortDir}/genres=${this.props.genresSelected}/${this.makePageAndText().page}`}>
            <span>{this.makePageAndText().text}</span>
          </Link>
        }
        {(this.props.sortValue && this.props.sortDir) && this.props.genresSelected.length === 0 && !this.props.searchQuery &&
          <Link className={'Pagination__' + this.props.direction} to={`/sort_by/${this.props.sortValue}.${this.props.sortDir}/${this.makePageAndText().page}`}>
            <span>{this.makePageAndText().text}</span>
          </Link>
        }
        {this.props.searchQuery &&
          <Link className={'Pagination__' + this.props.direction} to={`/search=${this.props.searchQuery}/${this.makePageAndText().page}`}>
            <span>{this.makePageAndText().text}</span>
          </Link>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    page: ownProps.page,
    genresSelected: ownProps.genresSelected || state.genresSelected,
    searchQuery: ownProps.searchQuery
  }
};

const mapDispatchToProps = {
  pageNext,
  pagePrev,
  changePage
};

export default connect(mapStateToProps, mapDispatchToProps)(PageBtn);