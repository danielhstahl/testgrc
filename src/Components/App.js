import React from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Container, Row, Col} from 'react-grid-system';


import LandingPageAnalystContainer from '../Containers/LandingPageAnalystContainer'
import ValidationAppContainer from '../Containers/ValidationAppContainer'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();



const url="http://localhost:3001";

const arrowColor=lightBaseTheme.palette.primary1Color;
const ValidationCurried=({step, match})=><ValidationAppContainer step={step} match={match} arrowColor={arrowColor}/>

const App =({getRawAssociates, getRawSkills, getRawRCUS, getRawTestSelection, getRawTodos, getRawActivities}) => {
  getRawAssociates();
  getRawSkills();
  getRawRCUS();
  getRawTestSelection();
  getRawTodos();
  getRawActivities();
  return (
   
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
         <Router>
          <div>
            <Route exact path="/" component={LandingPageAnalystContainer}/>
            <Route path={`/validation/:validationId`} component={ValidationCurried}/>
          </div>
        </Router>
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
