import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import LandingPageAnalystContainer from '../Containers/LandingPageAnalystContainer'
import LoginContainer from '../Containers/LoginContainer'
import ValidationAppContainer from '../Containers/ValidationAppContainer'



const landingPage={
  MRMVAnalyst:LandingPageAnalystContainer
}
const RouterHolder=({userObj, arrowColor})=>{
    const ValidationCurried=({step, match})=><ValidationAppContainer step={step} match={match} arrowColor={arrowColor}/>
    const {user}=userObj
    return(
    <Router>
      {user?
        <div>
          <Route exact path="/" component={landingPage[user.userType]}/>
          <Route path={`/validation/:validationId`} component={ValidationCurried}/>
        </div>:<LoginContainer/>
      }
    </Router>)
}
export default RouterHolder