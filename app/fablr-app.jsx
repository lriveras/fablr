import React from 'react';
import ReactDOM from 'react-dom';
import Home from './features/home/Home.jsx';
import FablrAppBar from './features/fablr-app-bar/FablrAppBar.jsx';
import reducers from './reducers.js';
import initialState from './initial-state.js';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Router, Route, Link, browserHistory  } from 'react-router'

window.fbAsyncInit = function () {
    FB.init({
        appId: '1816468645258885',
        xfbml: true,
        version: 'v2.8'
    });
    load();
};

let load = ()=>{
    const store = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    ReactDOM.render(
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={FablrAppBar}>
                    <Route path="hello" component={Home}>

                    </Route>
                </Route>
            </Router>
        </Provider>,
        document.getElementById('fablr-app')
    );
}