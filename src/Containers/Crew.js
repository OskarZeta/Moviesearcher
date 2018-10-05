import React, { Component } from 'react';

class Crew extends Component {
  loadCrew(){
    if(this.props.crew){
      let crew = this.props.crew;
      return crew.map((person, index) => {
        return(
          <li className="MovieInfo__person" key={index}>
            <span className="MovieInfo__person-name">{person.name}</span>
            <span className="MovieInfo__person-character">{person.job}</span>
          </li>
        );
      });
    }
  }
  render(){
    return(
      <div>
        <ul className="App__credits">
          {this.loadCrew()}
        </ul>
      </div>
    );
  }
}

export default Crew;
