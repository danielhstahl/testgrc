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
const App =({getRawAssociates, getRawSkills, getRawRCUS, getRawTestSelection, getRawTodos, getRawActivities}) => {
  getRawAssociates();
  getRawSkills();
  getRawRCUS();
  getRawTestSelection();
  getRawTodos();
  getRawActivities();
  return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
         <RouterHolderContainer arrowColor={arrowColor}/>
      </MuiThemeProvider>
    
  );
}
App.propTypes={
    getRawAssociates:React.PropTypes.func.isRequired,
    getRawSkills:React.PropTypes.func.isRequired,
    getRawRCUS:React.PropTypes.func.isRequired,
    getRawTestSelection:React.PropTypes.func.isRequired,
}
export default App;
