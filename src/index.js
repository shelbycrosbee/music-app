import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {save, load} from 'redux-localstorage-simple';
import {BrowserRouter} from 'react-router-dom';

const createStoreWithMiddleware = applyMiddleware(thunk, save())(createStore);

const store = createStoreWithMiddleware(rootReducer, load())


ReactDOM.render(<Provider store={store}><BrowserRouter><App /> </BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
