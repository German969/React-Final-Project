import React from 'react';
import search from '../../assets/search.svg';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import './artistView.css';
import Album from './album';
import { connect } from 'react-redux';

class ArtistView extends React.Component {
  constructor(props){
  	super();


    //this.token = props.location.state.token;

		this.state = {
			name: props.location.state.name,
			id: props.location.state.id,
			logo: props.location.state.logo,
      genres: props.location.state.genres,
      data: null,

      query: props.location.state.query,

      //token: props.location.state.token,

      dropClass: 'not-show',
		}

    //console.log(this.state.query);

    //this.getAlbums(props.location.state.id,props.location.state.token);
	}

  componentDidMount(){
    //console.log(this.props.token);
    this.getAlbums(this.state.id,this.props.token);
  }

  handleClick(e){
      var sb = this.refs.searchbox;
      this.performSearch(sb.value);
    }
  handleEnter(e){
    console.log('handleEnter');
    if(e.key === 'Enter'){
      console.log('hola')
        this.performSearch(e.target.value);
      }
  }
  handleSubmit(e){
    console.log('submit');
    this.performSearch(e.target.value);
  }
  performSearch(str){

    //console.log(this.state.token);

      let q = str.replace(" ","%20");

      this.props.history.push({
            pathname: '/search',
            search: '?query='+q
      })

    }
  getAlbums(id,token){

    let url = "https://api.spotify.com/v1/artists/"+id+"/albums";

    let albumsData = [];

    fetch(url, { 
          method: 'get', 
          headers: new Headers({
              'Authorization': 'Bearer '+token, 
          }) 
      })
      .then(response => response.json())
      .then(data => this.setState({data : data}));

      
  }
  showSearch(e){
    if(this.state.dropClass === 'not-show'){
      this.setState({'dropClass':'show'});
    }else{
      this.setState({'dropClass':'not-show'});
    }
  }
  render(){
    let data = this.state.data;
    var albums = [];

    if(data){
      albums = data.items;
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
                      <h5>{this.state.genres}</h5>
                    </div>
                    
                  </header>

                  <article> 

                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={{ pathname: '/callback', hash: '#access_token='+this.props.token}}>Home</Link></li>
                        <li className="breadcrumb-item"><Link to={{ pathname: '/search', search: '?query='+this.state.query }}>Search</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{this.state.name}</li>
                      </ol>
                    </nav>

                    {albums.map((item,index)=>
                                  <Album
                                    name={item.name}
                                    logo={item.images[0] ? item.images[0].url : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}
                                    release_date={item.release_date}
                                    key={item.id}
                                    id={item.id}
                                    token={this.props.token}
                                    artist={this.state.name}

                                    a_id={this.state.id}
                                    a_logo={this.state.logo}
                                    a_genres={this.state.genres}

                                    query={this.state.query}
                                  />
                              )
                    }
                    
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

export default connect(mapStateToProps)(ArtistView);