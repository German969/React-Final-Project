import React, { Component } from 'react';

class Artist extends React.Component {
  constructor(props){
  	super();
  	this.state = {
  		name: props.name,
  		logo: props.logo,
  	}
  	console.log(this.state.logo);
  }
  render(){
    return(



<div className="card flex-row flex-wrap" style={{maxWidth: '30rem', display: 'inline-block', margin: '5px', width: '100%'}} >
        <div className="card-header border-0" style={{display: 'inline-block'}} >
            <img src={this.state.logo} alt="Artist's image" style={{width: '5rem'}} />
        </div>
        <div className="card-block px-2" style={{display: 'inline-block'}} >
            <h4 className="card-title">{this.state.name}</h4>
            
        </div>
        
    </div>



    )
  }
}

/*
<div className="card" style={{width: '18rem'}}>
  <img className="card-img-top" src={this.state.logo} alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title">{this.state.name}</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>
*/

export default Artist