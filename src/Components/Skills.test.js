import React from 'react';
import ReactDOM from 'react-dom';
import {Skills} from './Skills';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider><Skills url="etc" /></MuiThemeProvider>, div);
});