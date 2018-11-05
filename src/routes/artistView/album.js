import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './album.css';

class Album extends Component {
  constructor(props){
  	super();
  	this.state = {
  		artist: props.artist,

      album: {
        name: props.name,
        logo: props.logo,
        id: props.id,
        release_date: props.release_date.split("-")[0]
      }
  	}   
  }

  render(){
    return(


      <Link to={{ pathname: '/album', state: { 
                                                artist:this.state.artist,
                                                album: this.state.album
                                                } }}>
	   <div className="card flex-row flex-wrap" style={{maxWidth: '30rem', display: 'inline-block', margin: '5px', width: '100%'}} >
        <div className="card-header border-0" style={{display: 'inline-block'}} >
            <img src={this.state.album.logo} alt="Album" style={{width: '5rem'}} />
        </div>
        <div className="card-block px-2 albumCover" style={{display: 'inline-block'}} >
            <h4 className="card-title albumTitle">{this.state.album.name}</h4>
            <p className="card-text albumYear">{this.state.album.release_date}</p>
        </div>
        
    </div>
    </Link>
   
    )
  }
}

export default Album