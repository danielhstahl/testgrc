import React from 'react';
import ReactDOM from 'react-dom';
import SubmitButtonProgress from './SubmitButtonProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders SubmitButtonProgress without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <SubmitButtonProgress 
      handleSubmit={()=>{}}      
    />
  </MuiThemeProvider>, div);
});
