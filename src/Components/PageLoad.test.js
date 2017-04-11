import React from 'react';
import ReactDOM from 'react-dom';
import PageLoad from './PageLoad';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders PageLoad without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <PageLoad/>
    </MuiThemeProvider>, div);
});