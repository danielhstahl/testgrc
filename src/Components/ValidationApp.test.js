import React from 'react';
import ReactDOM from 'react-dom';
import ValidationApp from './ValidationApp';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders ValidationApp without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <ValidationApp/>
  </MuiThemeProvider>, div);
});
