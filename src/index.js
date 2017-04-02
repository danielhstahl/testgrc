import React from 'react';
import ReactDOM from 'react-dom';
import SelectAppStep from './Containers/SelectAppStep';
import workflowApp from './Reducers/ReduxReducers';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css';


let store = createStore(workflowApp)
ReactDOM.render(
  <Provider store={store}>
    <SelectAppStep />
  </Provider>,
  document.getElementById('root')
);
