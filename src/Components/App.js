import React from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import workflowTheme from '../workflowTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RouterHolderContainer from '../Containers/RouterHolderContainer'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const App =() => 
<MuiThemeProvider className= "app" muiTheme={getMuiTheme(workflowTheme)}>
    <RouterHolderContainer/>
</MuiThemeProvider>

export default App;
