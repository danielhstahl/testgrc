import React from 'react';
import ReactDOM from 'react-dom';
import AssociateFAB from './AssociateFAB';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders AssociateFAB without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <AssociateFAB />
    </MuiThemeProvider>, div);
});