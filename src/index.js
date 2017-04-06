import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './Containers/AppContainer';
import workflowApp from './Reducers/ReduxReducers';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css';
import {setLogIn} from './Actions/AuthenticationActions'
import {checkLogin} from './localStorageHelper'

let store = createStore(workflowApp)
checkLogin(store, setLogIn)

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
