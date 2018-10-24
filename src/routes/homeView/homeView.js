import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './homeView.css';
import search from '../../assets/search.svg';
import FavTrack from './favTrack';
//import axios from 'axios'
//import {  withRouter } from 'react-router-dom';

class HomeView extends Component {
	constructor (props) {
    	super();
    	//this.handleClick = this.handleClick.bind(this);
    	this.client_id = '12ca3037b7724515af3e606f1e211235';
    	//this.client_secret = 'd55c3c27c9704252a46228c0b0ba0d7c';
    	this.redirect_uri = 'http:%2F%2Flocalhost%3A3000%2Fcallback';
    	this.response_type = 'token';
    	this.scope = 'user-read-private user-read-email';

      this.favs = null;

      //console.log(props.location.pathname);

      const queryString = require('query-string');
      var parsed = queryString.parse(props.location.hash);

      this.token = parsed.access_token;
      this.state = {
        data : [],
      }

      this.processFavs();

      //console.log(Object.keys(localStorage));
      
  	}

    handleClick(e){
      var sb = this.refs.searchbox;
      this.performSearch(sb.value);
    }
    handleEnter(e){
      if(e.key === 'Enter'){
        this.performSearch(e.target.value);
      }
    }

    performSearch(str){
      let q = str.replace(" ","%20");

      this.props.history.push({
            pathname: '/search',
            search: '?query='+q+'&token='+this.token
      })
    }

    processFavs(){
      let keys = Object.keys(localStorage);
      keys = keys.filter(item => localStorage.getItem(item) === 'true');

      if(keys.length > 0){
        console.log(keys.toString());

        let url = "https://api.spotify.com/v1/tracks/?ids="+keys.toString();

        console.log(url);

        fetch(url, { 
          method: 'get', 
          headers: new Headers({
              'Authorization': 'Bearer '+this.token, 
          }), 
        })
        .then(response => response.json())
        .then(data => this.setState({'data' : data.tracks}));
      };
    }

    render() {

      let favourites = '';

      if(this.state.data.length > 0){
        favourites = <div>
          
                      <h1>Favourite Songs</h1>

                      {this.state.data.map((item,index) => 

                          <FavTrack 
                            name={item.name}
                            artist={item.artists[0].name}
                            album={item.album.name}
                            logo={item.album.images[0].url}
                          />

                        )} 

                     </div>
      }

        return (
        	<div id="home-container">
        		<header>
        			<img src={logo} className="main-view__logo" alt="logo" />
        		</header>
            	<article className="home-view container">
                	<header>
                		<h5>Welcome to</h5>
                		<h1>Spotisearch</h1>
                	</header>
                	<article>
                		<p>Search your favourite songs over Spotify, just enter an artist's name in the following searchbox and enjoy!</p>
                    <div className="input-group mb-3">
                     <div className="input-group-prepend">
                       <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={this.handleClick.bind(this)}>
                        <img src={search} className="search_icon" alt="search" />
                       </button>
                     </div>
                     <input ref="searchbox" type="text" className="form-control" placeholder="Type the name of your favourite artist" aria-label="Example text with button addon" aria-describedby="button-addon1" onKeyPress={this.handleEnter.bind(this)} />
                    </div>

                    {favourites}
                    
                	</article>
            	</article>
            </div>
        );
    }
}

export default HomeView;
