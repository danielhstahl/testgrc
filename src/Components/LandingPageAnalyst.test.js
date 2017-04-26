import React from 'react';
import ReactDOM from 'react-dom';
import LandingPageAnalyst from './LandingPageAnalyst';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
it('renders LandingPageAnalyst without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><MuiThemeProvider>
    <LandingPageAnalyst activities={[
        {
            type:"type1",
            description:"desc1",
            timeline:[{
                actualDate:"date1",
                dueDate:"date1",
                descriptoin:"something"               
                
            }]
        }
    ]}/>
    </MuiThemeProvider></Router>, div);
});