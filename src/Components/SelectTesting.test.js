import React from 'react';
import ReactDOM from 'react-dom';
import {SelectTesting} from './SelectTesting';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <ScopeDisplay 
      handleSubmit={()=>{}}
      isSubmitted={true}
      children={<p></p>}
      notAllowedToSubmit={true}
      
    />
  </MuiThemeProvider>, div);
});
