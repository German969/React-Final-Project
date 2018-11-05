import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Artist extends Component {
  constructor(props){
  	super();
  	this.state = {
  		name: props.name,
  		logo: props.logo,
  		id: props.id,
      genres: props.genres,

      query: props.query,
  	}   
    //this.token = props.token;
  }

  render(){
    return(

    <Link to={{ pathname: '/artist', state: { name: this.state.name, id: this.state.id, logo:this.state.logo, genres: this.state.genres, query:this.state.query } }}>
	<div className="card flex-row flex-wrap" style={{maxWidth: '30rem', display: 'inline-block', margin: '5px', width: '100%'}} >
        <div className="card-header border-0" style={{display: 'inline-block'}} >
            <img src={this.state.logo} alt="Artist" style={{width: '5rem'}} />
        </div>
        <div className="card-block px-2" style={{display: 'inline-block'}} >
            <h4 className="card-title">{this.state.name}</h4>
            
        </div>
        
    </div>
    </Link>

    )
  }
}

export default Artist