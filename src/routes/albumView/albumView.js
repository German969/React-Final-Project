import React from 'react';
import search from '../../assets/search.svg';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import Track from './track';
import './albumView.css';

class AlbumView extends React.Component {
  constructor(props){
  	super();

  	this.token = props.location.state.token;

  	this.state = {
	  name: props.location.state.name,
	  id: props.location.state.id,
	  logo: props.location.state.logo,
    data: null,
    release_date: props.location.state.release_date,
    artist: props.location.state.artist,

    a_id: props.location.state.a_id,
    a_logo: props.location.state.a_logo,
    a_genres: props.location.state.a_genres,

    query: props.location.state.query,

    dropClass: 'not-show',
		}

		//console.log(props.location.state.id);

		this.getTracks(props.location.state.id,props.location.state.token);
  }
  handleEnter(e){
  	if(e.key === 'Enter'){
      console.log('hola')
        this.performSearch(e.target.value);
      }
  }
  handleClick(e){
  	var sb = this.refs.searchbox;
    this.performSearch(sb.value);
  }
  handleSubmit(e){
  	this.performSearch(e.target.value);
  }
  performSearch(str){

    console.log(this.state.token);

      let q = str.replace(" ","%20");

      this.props.history.push({
            pathname: '/search',
            search: '?query='+q+'&token='+this.token
      })

    }
  showSearch(e){
    if(this.state.dropClass === 'not-show'){
      this.setState({'dropClass':'show'});
    }else{
      this.setState({'dropClass':'not-show'});
    }
  }
  getTracks(id,token){
  	let url = "https://api.spotify.com/v1/albums/"+id+"/tracks";

    //let tracksData = [];

    fetch(url, { 
          method: 'get', 
          headers: new Headers({
              'Authorization': 'Bearer '+token, 
          }) 
      })
      .then(response => response.json())
      .then(data => this.setState({data : data}));
  }
  render(){
  	let data = this.state.data;
    var tracks = [];

    if(data){
      tracks = data.items;
    };
  	return(
    <div id="home-container">

          <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="#">
              <img src={logo} width="30" height="30" alt="Spotify logo" />
            </a>
            <form className="form-inline">
              <input id="searchHeader" className="form-control mr-sm-2 fontAwesome" type="search" placeholder="&#xF002; Search artist" aria-label="Search" onKeyPress={this.handleEnter.bind(this)} onSubmit={this.handleSubmit.bind(this)} />

              

              <div id="searchDropIcon" className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.showSearch.bind(this)}>
                  <i className="fa fa-search"></i>
                </button>
              </div>

             

            </form>
          </nav>

          <div id="searchDropdown" ref="searchDropdown" className={this.state.dropClass}>
            <div className="input-group mb-3">
                     <div className="input-group-prepend">
                       <button className="btn btn-outline-secondary search_white" type="button" id="button-addon1" onClick={this.handleClick.bind(this)}>
                        <img src={search} className="search_icon" alt="search" />
                       </button>
                     </div>
                     <input ref="searchbox" type="text" className="form-control" placeholder="Search for your favourite artists here" aria-label="Example text with button addon" aria-describedby="button-addon1" onKeyPress={
                      this.handleEnter.bind(this)}
                      />
                    </div>
          </div>

            
              <article className="home-view container">
                  <header className="artistHeader">
                    <img className="artistImage" src={this.state.logo} alt="Artist" style={{width: '10rem', height: 'auto'}}/>
                    <div style={{display: 'inline-block'}}>
                      <h1 className="artistName">{this.state.name}</h1>  
                      <h5>{this.state.artist} - {this.state.release_date.split('-')[0]}</h5>
                    </div>
                    
                  </header>

                  <article> 

                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/callback">Home</Link></li>
                        <li className="breadcrumb-item"><Link to={{ pathname: '/search', search: '?query='+this.state.query+'&token='+this.token }}>Search</Link></li>
                        <li className="breadcrumb-item"><Link to={{ pathname: '/artist', state: { name: this.state.artist, id: this.state.a_id, logo:this.state.a_logo, genres: this.state.a_genres, query:this.state.query, token: this.token} }}>{this.state.artist}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{this.state.name}</li>
                      </ol>
                    </nav>

                    <ul className="list-group list-group-flush">
  						<li id="tracklist-title" className="list-group-item">Lista de canciones</li>
  						{
  							tracks.map((item,index)=>
                                  <Track
                                    name={item.name}
                                    key={item.id}
                                    id={item.id}
                                    token={this.token}
                                  />
                              )
  						}
  						<li className="list-group-item"></li>
					</ul>

                    
                    
                  </article>

              </article>

            </div>
    )
  }
}

export default AlbumView