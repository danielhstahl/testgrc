import React from 'react';
import ReactDOM from 'react-dom';
import AssociateFAB from './AssociateFAB';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
it('renders AssociateFAB without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><MuiThemeProvider>
    <AssociateFAB />
    </MuiThemeProvider></Router>, div);
});