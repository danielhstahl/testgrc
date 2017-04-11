import React from 'react';
import ReactDOM from 'react-dom';
import LandingPageAnalyst from './LandingPageAnalyst';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders LandingPageAnalyst without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <LandingPageAnalyst list={[
        {
            type:"type1",
            description:"desc1"
        }
    ]} />
    </MuiThemeProvider>, div);
});