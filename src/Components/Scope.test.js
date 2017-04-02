import React from 'react';
import ReactDOM from 'react-dom';
import Scope from './Scope';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders Scope without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <Scope 
        rawRCUS={[{
            process:"process",
            risk:"risk",
            processStep:0,
            riskStep:0,
            controls:"Controls",
            workpaper:0,
            MRMVResponsibility:"responsibility"
        }]}
        plans={[{
            processStep:0,
            riskStep:0,
            explanation:"",
            testWork:0
        }]}
        rawTestSelection={[{
            index:0,
            description:"test"
        }]}
        handleTestSubmit={()=>{}}
    />
    </MuiThemeProvider>, div);
});