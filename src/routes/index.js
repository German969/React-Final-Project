import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeView from './homeView/homeView';
//import AboutView from './aboutView/aboutView';
import LoginView from './loginView/loginView';
import SearchView from './searchView/searchView';
import ArtistView from './artistView/artistView';
import AlbumView from './albumView/albumView';

const getRoutes = function() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={LoginView} />
                <Route path="/callback" component={HomeView} />
                <Route path="/search" component={SearchView} />
                <Route path="/artist" component={ArtistView} />
                <Route path="/album" component={AlbumView} />
            </Switch>
        </div>
    )
};

export default getRoutes;
