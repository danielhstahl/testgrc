import React from 'react';
import ReactDOM from 'react-dom';
import MaterialView from './MaterialView';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders Login without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <MaterialView 
        headerChild={<div></div>}
        contentChild={<div></div>}
    />
    </MuiThemeProvider>, div);
});