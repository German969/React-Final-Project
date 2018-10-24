import React from 'react';
import './track.css';

class Track extends React.Component {
  constructor(props){
  	super();

  	this.token = props.token;

  	this.state = {
  	  name: props.name,
  	  id: props.id,

      className: 'far fa-star star-icon',
  	}

    //console.log(localStorage.getItem('1Y4HsZWu66hsDxGrOVgJqa'));
  }
  addFav(e){
    let newState = '';
    if(localStorage.hasOwnProperty(this.state.id)){

      if(localStorage.getItem(this.state.id) == 'true'){

        localStorage.setItem(e.target.id, 'false');
        newState = 'far fa-star star-icon';

      }else{

        localStorage.setItem(e.target.id, 'true');
        newState = 'far fa-star star-icon-fav';

      }

    }else{

      localStorage.setItem(e.target.id, 'true');
      newState = 'far fa-star star-icon-fav';

    };

    this.setState({'className': newState});
  }
  render(){

    var className = '';

    if(localStorage.hasOwnProperty(this.state.id) && localStorage.getItem(this.state.id) == 'true'){
      className = 'far fa-star star-icon-fav';
    }else{
      className = 'far fa-star star-icon';
    }

    return(
    	<li className="list-group-item">{this.state.name}<i id={this.state.id} className={className} onClick={this.addFav.bind(this)}></i></li>
    )
  }
}

export default Track