import React from 'react';
import ReactDOM from 'react-dom';
import MaterialView from './MaterialView';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
it('renders MaterialView without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><MuiThemeProvider>
    <MaterialView 
        headerChild={<div></div>}
        contentChild={<div></div>}
    />
    </MuiThemeProvider></Router>, div);
});