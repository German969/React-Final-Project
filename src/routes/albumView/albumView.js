import React from 'react';
import search from '../../assets/search.svg';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import Track from './track';
import './albumView.css';
import { connect } from 'react-redux';

class AlbumView extends React.Component {
  constructor(props){
  	super();

  	this.state = {
	  name: props.location.state.name,
	  id: props.location.state.id,
	  logo: props.location.state.logo,
    data: null,
    release_date: props.location.state.release_date,

    dropClass: 'not-show',

    preview: 'hola',
    show_preview: 'hide-player',

		}
		
  }

  componentDidMount(){
    this.getTracks(this.state.id,this.props.token);
  }

  handleEnter(e){
  	if(e.key === 'Enter'){
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
            search: '?query='+q
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
  handler(e){
    this.setState({preview: e.target.id});
    this.setState({show_preview: 'show-player'});
    this.refs.audio_player.load();
    this.refs.audio_player.play();
    //console.log(e.target.id);
    //console.log(this.state.preview);
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
                      <h5>{this.props.artist.name} - {this.state.release_date.split('-')[0]}</h5>
                    </div>
                    
                  </header>

                  <article> 

                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={{ pathname: '/callback', hash: 'access_token='+this.props.token}}>Home</Link></li>
                        <li className="breadcrumb-item"><Link to={{ pathname: '/search', search: '?query='+this.props.query }}>Search</Link></li>
                        <li className="breadcrumb-item"><Link to={{ pathname: '/artist', state: { artist: this.props.artist } }}>{this.props.artist.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{this.state.name}</li>
                      </ol>
                    </nav>

                    <ul className="list-group list-group-flush">
  						<li id="tracklist-title" className="list-group-item">Tracklist</li>
  						{
  							tracks.map((item,index)=>
                                  <Track
                                    name={item.name}
                                    key={item.id}
                                    id={item.id}
                                    preview={item.preview_url}

                                    handler={this.handler.bind(this)}
                                  />
                              )
  						}
  						<li className="list-group-item"></li>
					</ul>
                    
                  </article>

                  <footer ref="player-fix" id="player-fix" className={this.state.show_preview} ></footer>   

              </article>

              <footer id="player" ref="player" className={this.state.show_preview} >
                    <audio id="audio_player" ref="audio_player" controls>
                      <source src={this.state.preview} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                  </footer>

            </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    query: state.query,
    artist: state.artist
  };
};

export default connect(mapStateToProps)(AlbumView);