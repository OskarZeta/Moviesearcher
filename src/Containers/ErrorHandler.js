import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  errorClear
} from '../Redux/actions/has_error';


class ErrorHandler extends Component {
  render() {
    if (this.props.error.isError) {
      return(
        <div className="App">
          <div className="container container--error-page">
            <h1 className="App__error-header">ERROR! :(</h1>
            <div className="App__error-text">
              <span>{this.props.error.errorText}</span>
              <a className="App__error-link" href="/Moviesearcher/">Home</a>
            </div>
          </div>
        </div>
      );
    }
    return(
      this.props.children
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.error
  }
};

const mapDispatchToProps = {
  errorClear
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler);
