import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import search from '../../assets/search.svg';
import Artist from './artist';
import { Link } from 'react-router-dom'
import './searchView.css';
import { connect } from 'react-redux';


class SearchView extends Component {
  constructor(props){
  	super();
  	const queryString = require('query-string');
    let parsed = queryString.parse(props.location.search);

 	  //console.log(parsed);

    let q = parsed.query;

    //console.log(q);

    //this.token = parsed.token;

    this.state = {
        query : q,
        data: null,
      }

    
  }

  componentDidMount(){
    //console.log('props.token');
    //console.log(this.props.token);

    this.performSearch2(this.state.query);
  }

  handleEnter(e){
  	if(e.key === 'Enter'){
  		  //console.log(e.target.value);
        this.performSearch2(e.target.value);

        var str = e.target.value;

        let q = str.replace(" ","%20");

        /*console.log('props.token');
        console.log(this.props.token);
        console.log('this.token');
        console.log(this.token);*/

      	this.props.history.push({
            pathname: '/search',
            search: '?query='+q
      	});

      }
  }
  handleClick(e){
  	console.log(this.refs.searchbox);
  	var sb = this.refs.searchbox;
    this.performSearch2(sb.value);
    var str = sb.value;

    let q = str.replace(" ","%20");

      this.props.history.push({
            pathname: '/search',
            search: '?query='+q
      })
  }

  performSearch2(str){

      let q = str.replace(" ","%20");

      let url = "https://api.spotify.com/v1/search?q="+q+"&type=artist";

      fetch(url, { 
          method: 'get', 
          headers: new Headers({
              'Authorization': 'Bearer '+this.props.token, 
          }) 
      })
      .then(response => response.json())
      .then(data => this.setState({ data : data.artists.items }));

    }

  render(){
  	let items = this.state.data;
  	var artists = '';

  	if(items){
      //console.log(this.state.q);
  		artists = <div id="artists-container">
  					{items.map((item,index) =>
         				<Artist
          					name={item.name}
          					logo={item.images[0] ? item.images[0].url : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}
          					key={item.id}
          					id={item.id}
                    genres={item.genres.toString()}
                    token={this.props.token}

                    query={this.state.query}
       		 		/>)}
  				</div>;
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

                    <nav aria-label="breadcrumb">
  						<ol className="breadcrumb">
    						<li className="breadcrumb-item"><Link to={{ pathname: '/callback/', search: '#access_token='+this.props.token}}>Home</Link></li>
    						<li className="breadcrumb-item active" aria-current="page">Search</li>
  						</ol>
					</nav>

                    {artists}

                    
                	</article>
            	</article>
            </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(SearchView);