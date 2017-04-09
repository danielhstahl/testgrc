import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import workflowApp from './Reducers/ReduxReducers';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css';
import {attemptLogin, setLogOut} from './Actions/AuthenticationActions'
import {checkLogin} from './localStorageHelper'

let store = createStore(workflowApp)

checkLogin(store, attemptLogin, setLogOut)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
