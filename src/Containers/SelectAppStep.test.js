import React from 'react';
import ReactDOM from 'react-dom';
import SelectAppStep from './SelectAppStep';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import workflowApp from '../Reducers/ReduxReducers';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
let store = createStore(workflowApp)

it('renders SelectAppStep without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><SelectAppStep 
    
  /></Provider>, div);
});