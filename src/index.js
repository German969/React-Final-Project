import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import getRoutes from './routes/';
import store from './store.js';
import { Provider } from 'react-redux';

ReactDOM.render(
	<Provider store={store}>
    	<BrowserRouter>
        	{getRoutes()}
    	</BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
