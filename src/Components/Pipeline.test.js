import React from 'react';
import ReactDOM from 'react-dom';
import Pipeline from './Pipeline';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders pipeline without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <Pipeline 
        loadInit={(groups)=>{}} 
        pipeline={[{type:"Hello", description:"World"}]}
        policyGroups={["hello"]}
        associates={[{cn:"myname", id:"myid"}]}/>
    </MuiThemeProvider>, div);
});