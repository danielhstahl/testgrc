import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './Containers/AppContainer';
import workflowApp from './Reducers/ReduxReducers';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css';


let store = createStore(workflowApp)
ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
