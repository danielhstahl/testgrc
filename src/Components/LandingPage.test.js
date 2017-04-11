import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './LandingPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders LandingPage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <LandingPage user={{userType:"", cn:"Test User"}} />
    </MuiThemeProvider>, div);
});