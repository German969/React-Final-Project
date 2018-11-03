import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './homeView.css';
import search from '../../assets/search.svg';
import FavTrack from './favTrack';
import store from '../../store.js';

class HomeView extends Component {
	constructor (props) {
    	super();
    	this.client_id = '12ca3037b7724515af3e606f1e211235';
    	this.redirect_uri = 'http:%2F%2Flocalhost%3A3000%2Fcallback';
    	this.response_type = 'token';
    	this.scope = 'user-read-private user-read-email';

      this.favs = null;
      
      this.state = {
        favs: [],
        token: null
      }

      store.subscribe(() => {
        this.setState({
          favs: store.getState().favs,
          token: store.getState().token
        });
      });

      const queryString = require('query-string');
      var parsed = queryString.parse(props.location.hash);

      store.dispatch({
        type: 'TOKEN',
        token: parsed.access_token
      });

      this.processFavs2();
      
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
            search: '?query='+q+'&token='+this.state.token
      })
    }

    /*processFavs(){
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
    }*/

    processFavs2(){
      let keys = Object.keys(localStorage);
      keys = keys.filter(item => localStorage.getItem(item) === 'true');

      if(keys.length > 0){
        console.log(keys.toString());

        let url = "https://api.spotify.com/v1/tracks/?ids="+keys.toString();

        console.log(url);

        fetch(url, { 
          method: 'get', 
          headers: new Headers({
              'Authorization': 'Bearer '+this.state.token, 
          }), 
        })
        .then(response => response.json())
        .then(data => store.dispatch({
          type: 'FAVS',
          favs: data.tracks
        }));
      };
    }

    render() {

      let favourites = '';

      if(this.state.favs.length > 0){
        favourites = <div>
          
                      <h1>Favourite Songs</h1>

                      {this.state.favs.map((item,index) => 

                          <FavTrack 
                            key={index}
                            name={item.name}
                            artist={item.artists[0].name}
                            album={item.album.name}
                            logo={item.album.images[0] ? item.album.images[0].url : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}
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
