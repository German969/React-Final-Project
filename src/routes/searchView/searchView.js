import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import search from '../../assets/search.svg';
import Artist from './artist';

class SearchView extends Component {
  constructor(props){
  	super();
  	const queryString = require('query-string');
    let parsed = queryString.parse(props.location.search);

 	//console.log(parsed);

    let q = parsed.query;

    //console.log(q);

    this.token = parsed.token;

    //console.log(this.token);

    this.state = {
        query : q,
        data: null,
      }

    this.performSearch2(q);
  }
  handleEnter(e){
  	console.log('Enter');
  }
  handleClick(e){
  	console.log('Click');
  }

  performSearch2(str){

      let q = str.replace(" ","%20");

      let url = "https://api.spotify.com/v1/search?q="+q+"&type=artist"

      fetch(url, { 
          method: 'get', 
          headers: new Headers({
              'Authorization': 'Bearer '+this.token, 
          }) 
      })
      .then(response => response.json())
      .then(data => this.setState({ data : data.artists.items }));

    }

  render(){
  	let items = this.state.data;
  	var artists = '';

  	if(items){
  		artists = <Items items={items} />;
  	};

    return(
    	<div id="home-container">
        		<header>
        			<img src={logo} className="main-view__logo" alt="logo" />
        		</header>
            	<article className="home-view container">
                	<header>
                		<h1>Artists</h1>
                	</header>
                	<article>
                		<p>You are currently searching: "{this.state.query}"</p>
                    <div className="input-group mb-3">
                     <div className="input-group-prepend">
                       <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={this.handleClick.bind(this)}>
                        <img src={search} className="search_icon" alt="search" />
                       </button>
                     </div>
                     <input ref="searchbox" type="text" className="form-control" placeholder="Search for your favourite artists here" aria-label="Example text with button addon" aria-describedby="button-addon1" onKeyPress={this.handleEnter.bind(this)} />
                    </div>

                    {artists}

                    
                	</article>
            	</article>
            </div>
    )
  }
}

class Items extends React.Component {
	constructor(props){
		super();
		this.items = props.items;
	}
  render(){
  	return(
    <div>
  		{this.items.map((item,index) =>
         	<Artist
          		name={item.name}
          		logo={item.images[0].url}
          		key={item.id}
       		 />)}
  	</div>
  	)
  }
}

export default SearchView;