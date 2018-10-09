import React, { Component } from 'react';

class Spinner extends Component {
  render(){
    {/*<div className="lds-roller">*/}
      {/*<div></div>*/}
      {/*<div></div>*/}
      {/*<div></div>*/}
      {/*<div></div>*/}
      {/*<div></div>*/}
      {/*<div></div>*/}
      {/*<div></div>*/}
      {/*<div></div>*/}
    {/*</div>*/}
    return(
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default Spinner;