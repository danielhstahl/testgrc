import React from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RouterHolderContainer from '../Containers/RouterHolderContainer'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const arrowColor=lightBaseTheme.palette.primary1Color;
const App =() => {
  return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
         <RouterHolderContainer arrowColor={arrowColor}/>
      </MuiThemeProvider>
    
  );
}

export default App;
