import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../Redux/actions';


class FaveBtn extends Component {
  componentDidMount(){
    //console.log(this.props.isFav);
  }
  clickHandler(e){
    //e.preventDefault();
    if (!this.props.isFav){
      this.props.addFavorite(this.props.id);
    } else {
      this.props.removeFavorite(this.props.id);
    }
    //console.log(this.props.id);
  }
  render(){
    return(
      <div className="FaveBtn">
        <button onClick={(e) => {this.clickHandler(e)}}>ADD TO FAVORITES</button>
        <span>
          {!this.props.isFav && 'not favorite'}
          {this.props.isFav && 'favorite'}
        </span>
      </div>
    );
  }
}

const mapDispatchToProps= {
  addFavorite,
  removeFavorite
};

export default connect(null, mapDispatchToProps)(FaveBtn);