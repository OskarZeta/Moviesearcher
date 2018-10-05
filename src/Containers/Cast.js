import React, { Component } from 'react';

class Cast extends Component {
  loadCast(){
    if(this.props.cast){
      let cast = this.props.cast;
      return cast.map((person, index) => {
        return(
          <li className="MovieInfo__person" key={index}>
            <span className="MovieInfo__person-name">{person.name}</span>
            <span className="MovieInfo__person-character">{person.character}</span>
          </li>
        );
      });
    }
  }
  render(){
    return(
      <div>
        <ul className="App__credits">
          {this.loadCast()}
        </ul>
      </div>
    );
  }
}

export default Cast;