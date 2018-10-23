import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeView from './homeView/homeView';
//import AboutView from './aboutView/aboutView';
import LoginView from './loginView/loginView';
import SearchView from './searchView/searchView'

const getRoutes = function() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={LoginView} />
                <Route path="/callback" component={HomeView} />
                <Route path="/search" component={SearchView} />
            </Switch>
        </div>
    )
};

export default getRoutes;
