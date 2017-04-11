import React from 'react';
import ReactDOM from 'react-dom';
import SubmitButtonProgressE, {SubmitButtonProgress} from './SubmitButtonProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders SubmitButtonProgress with error without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <SubmitButtonProgress 
      handleSubmit={()=>{}}  
      err="error"
      success=""
      waitingForResponse={false}    
    />
  </MuiThemeProvider>, div);
});

it('renders SubmitButtonProgress with success without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <SubmitButtonProgress 
      handleSubmit={()=>{}}  
      err=""
      success="success"
      waitingForResponse={false}    
    />
  </MuiThemeProvider>, div);
});

it('renders SubmitButtonProgress with waitingForResponse without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <SubmitButtonProgress 
      handleSubmit={()=>{}}  
      err=""
      success=""
      waitingForResponse={true}    
    />
  </MuiThemeProvider>, div);
});