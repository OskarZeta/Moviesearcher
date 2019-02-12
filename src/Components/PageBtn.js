import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const PageBtn = ({ page, direction, query, history }) => {
  const makePageAndText = () => {
    let text = '';
    let newPage = page;
    if (direction === 'prev') {
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
  return (
    <div>
      <Link
        className={'Pagination__' + direction}
        to={
          `${query ? history.location.pathname + '?' + query + '/' : '/'}${makePageAndText().page}`
        }
      >
        <span>{makePageAndText().text}</span>
      </Link>
    </div>
  );
}

export default withRouter(PageBtn);
