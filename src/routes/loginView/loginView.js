import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './loginView.css';

class LoginView extends Component {
	constructor () {
    	super();
    	this.handleClick = this.handleClick.bind(this);
    	this.client_id = '12ca3037b7724515af3e606f1e211235';
    	//this.client_secret = 'd55c3c27c9704252a46228c0b0ba0d7c';
    	this.redirect_uri = 'http://localhost:3000/callback';
      //this.redirect_uri = 'http://186.109.215.69:3000/callback';
    	this.response_type = 'token';
    	this.scope = 'user-read-private user-read-email';
  	}
  	handleClick () {
  		
      let url = 'https://accounts.spotify.com/authorize?client_id='+this.client_id+'&redirect_uri='+this.redirect_uri+'&scope='+this.scope+'&response_type='+this.response_type+'&state=123';
      console.log(url);
      window.location.href = url;
	}
    render() {
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
                		<p>First you need to log into your Spotify account</p>
                		<button
                			type="button"
                			className="btn btn-primary"
                			onClick={this.handleClick}
                			>Log in with Spotify
                		</button>
                	</article>
            	</article>
            </div>
        );
    }
}

export default LoginView;
