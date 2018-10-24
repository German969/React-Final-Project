import React from 'react';

class FavTrack extends React.Component {
  constructor(props){
  	super();

  	this.state = {
  		name: props.name,
  		artist: props.artist,
  		album: props.album,
  		logo: props.logo,
  	}

  }
  render(){
    return(
    	<div className="card flex-row flex-wrap" style={{maxWidth: '30rem', display: 'inline-block', margin: '5px', width: '100%'}} >
        	<div className="card-header border-0" style={{display: 'inline-block'}} >
            	<img src={this.state.logo} alt="Album" style={{width: '5rem'}} />
        	</div>
        	<div className="card-block px-2 albumCover" style={{display: 'inline-block'}} >
            	<h4 className="card-title albumTitle">{this.state.name}</h4>
           		<p className="card-text albumYear">{this.state.artist}</p>
           		<p className="card-text albumYear">{this.state.album}</p>
        	</div>
        
    	</div>
    )
  }
}

export default FavTrack