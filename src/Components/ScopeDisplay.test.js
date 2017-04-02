import React from 'react';
import ReactDOM from 'react-dom';
import ScopeDisplay from './ScopeDisplay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders ScopeDisplay without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <ScopeDisplay 
      mrmvPlanning={
          [
              {
                  process:"process",
                  risk:"risk",
                  processStep:0,
                  riskStep:0,
                  controls:"controls",
                  workpaper:0,
                  MRMVResponsibility:"responsibility",
                  explanation:"",
                  testWork:0,
                  submitted:true
              }
          ]
      }
    />
  </MuiThemeProvider>, div);
});
