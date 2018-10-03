import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  errorClear
} from '../Redux/actions/has_error';


class ErrorHandler extends Component {
  //componentDidCatch(error, info){
    //console.log(error, info);
    //this.props.errorClear();
  //}
  render(){
    if (this.props.error.isError) {
      return(
        <div>
          {this.props.error.errorText}
        </div>
      );
    }
    return(
      this.props.children
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error
  }
};

const mapDispatchToProps = {
  errorClear
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler);