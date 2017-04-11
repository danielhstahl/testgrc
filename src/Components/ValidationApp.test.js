import React from 'react';
import ReactDOM from 'react-dom';
import ValidationApp from './ValidationApp';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import workflowApp from '../Reducers/ReduxReducers';
let store = createStore(workflowApp)
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
it('renders ValidationApp without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><MuiThemeProvider>
    <Router>
    <ValidationApp match={{params:"hello", url:"url"}} loadInit={()=>{}} loadOnValidationChange={()=>{}} history={{push:()=>{}}}/>
   </Router>
    </MuiThemeProvider></Provider>, div);
});
