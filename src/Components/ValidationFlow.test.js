import React from 'react';
import ReactDOM from 'react-dom';
import {ValidationFlow, ValidationWork} from './ValidationFlow';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders ValidationWork without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <ValidationWork 
      step={0}
      nodeArray={[<p></p>]}      
    />
  </MuiThemeProvider>, div);
});

it('renders ValidationFlow without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <ValidationFlow 
      step={0}
      contents={[{text:"text", title:"title"}]} 
      handleStepChange={()=>{}}     
    />
  </MuiThemeProvider>, div);
});