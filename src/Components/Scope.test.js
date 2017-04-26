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
        mrmvPlanning={[{
            process:"process",
            risk:"risk",
            processStep:0,
            riskStep:0,
            controls:"Controls",
            workpaper:0,
            MRMVResponsibility:"responsibility",
            explanation:"explanation",
            submitted:false
        }]}
        rawTestSelection={[{
            index:0,
            description:"test"
        }]}
        handleTestSubmit={()=>{}}
        policyGroups={["group"]}
    />
    </MuiThemeProvider>, div);
});