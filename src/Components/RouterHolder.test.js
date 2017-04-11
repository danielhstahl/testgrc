import React from 'react';
import ReactDOM from 'react-dom';
import RouterHolder from './RouterHolder';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders RouterHolder when isLoading without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <RouterHolder userObj={{user:"hello"}} isLoading={true}/>
    </MuiThemeProvider>, div);
});

it('renders RouterHolder when loaded without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <RouterHolder userObj={{user:"hello"}} isLoading={false}/>
    </MuiThemeProvider>, div);
});

it('renders RouterHolder when no user without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <RouterHolder userObj={{err:"hello"}} isLoading={false}/>
    </MuiThemeProvider>, div);
});