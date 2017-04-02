import React from 'react';
import ReactDOM from 'react-dom';
import {SelectAndEnter} from './SelectAndEnter';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <ScopeDisplay 
      rcusItem={
          [
              {
                  process:"process",
                  risk:"risk",
                  processStep:0,
                  riskStep:0,
                  controls:"controls",
                  workpaper:0,
                  MRMVResponsbility:"responsibility",
                  explanation:"",
                  testWork:0,
                  submitted:true
              }
          ]
      }
      rawTestSelection={[{index:0, description:"test"}]}
      handleTestSubmit={()=>{}}
      
    />
  </MuiThemeProvider>, div);
});
