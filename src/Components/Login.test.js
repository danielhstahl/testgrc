import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders Login without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <Login list={[
        {
            type:"type1",
            description:"desc1"
        }
    ]} />
    </MuiThemeProvider>, div);
});